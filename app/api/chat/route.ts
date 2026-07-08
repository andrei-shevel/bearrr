import { ChatAnthropic } from '@langchain/anthropic';
import { ChatGroq } from '@langchain/groq';
import { AIMessage, HumanMessage, SystemMessage } from '@langchain/core/messages';

import { CHAT_SYSTEM_PROMPT } from '@/lib/chat';

type ChatMessage = {
  role: 'user' | 'assistant';
  content: string;
};

const MAX_MESSAGES = 20;
const MAX_MESSAGE_LENGTH = 1000;
const HISTORY_WINDOW = 10;

const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_REQUESTS = 10;
const DAILY_GLOBAL_CAP = 500;

const requestsByIp = new Map<string, number[]>();
let dailyCount = 0;
let dailyCountDate = '';

function isRateLimited(ip: string) {
  const now = Date.now();

  const today = new Date().toISOString().slice(0, 10);
  if (today !== dailyCountDate) {
    dailyCountDate = today;
    dailyCount = 0;
  }
  if (dailyCount >= DAILY_GLOBAL_CAP) {
    return true;
  }

  const recent = (requestsByIp.get(ip) ?? []).filter((time) => now - time < RATE_LIMIT_WINDOW_MS);
  if (recent.length >= RATE_LIMIT_MAX_REQUESTS) {
    requestsByIp.set(ip, recent);
    return true;
  }

  recent.push(now);
  requestsByIp.set(ip, recent);
  if (requestsByIp.size > 10_000) {
    requestsByIp.clear();
  }
  dailyCount += 1;
  return false;
}

function parseMessages(body: unknown): ChatMessage[] | null {
  if (typeof body !== 'object' || body === null || !('messages' in body)) return null;

  const { messages } = body as { messages: unknown };
  if (!Array.isArray(messages) || messages.length === 0 || messages.length > MAX_MESSAGES) return null;

  const valid = messages.every(
    (message) =>
      typeof message === 'object' &&
      message !== null &&
      (message.role === 'user' || message.role === 'assistant') &&
      typeof message.content === 'string' &&
      message.content.length > 0 &&
      message.content.length <= MAX_MESSAGE_LENGTH
  );
  if (!valid) return null;

  const parsed = messages as ChatMessage[];
  if (parsed[parsed.length - 1].role !== 'user') return null;

  return parsed;
}

// Provider is env-driven: Claude when ANTHROPIC_API_KEY is set (takes priority),
// Groq's free tier when only GROQ_API_KEY is set.
function createModel() {
  if (process.env.ANTHROPIC_API_KEY) {
    return new ChatAnthropic({ model: 'claude-haiku-4-5', maxTokens: 1024 });
  }
  if (process.env.GROQ_API_KEY) {
    return new ChatGroq({ model: 'llama-3.3-70b-versatile', maxTokens: 1024 });
  }
  return null;
}

const model = createModel();

export async function POST(request: Request) {
  if (!model) {
    return Response.json({ error: 'Chat is not available right now.' }, { status: 503 });
  }

  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';
  if (isRateLimited(ip)) {
    return Response.json({ error: 'Too many messages. Please try again in a minute.' }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: 'Invalid request.' }, { status: 400 });
  }

  const messages = parseMessages(body);
  if (!messages) {
    return Response.json({ error: 'Invalid request.' }, { status: 400 });
  }

  const history = messages
    .slice(-HISTORY_WINDOW)
    .map((message) => (message.role === 'user' ? new HumanMessage(message.content) : new AIMessage(message.content)));

  try {
    const stream = await model.stream([new SystemMessage(CHAT_SYSTEM_PROMPT), ...history]);
    const encoder = new TextEncoder();

    const readable = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of stream) {
            const text = typeof chunk.content === 'string' ? chunk.content : chunk.text;
            if (text) {
              controller.enqueue(encoder.encode(text));
            }
          }
          controller.close();
        } catch (error) {
          console.error('Chat stream error:', error);
          controller.error(error);
        }
      },
    });

    return new Response(readable, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-store',
        'X-Accel-Buffering': 'no',
      },
    });
  } catch (error) {
    console.error('Chat request error:', error);
    return Response.json({ error: 'Something went wrong. Please try again.' }, { status: 500 });
  }
}
