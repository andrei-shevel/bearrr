'use client';

import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { tz } from '@date-fns/tz';

const TIME_ZONE = 'Europe/Warsaw';
const TIME_FORMAT = 'HH:mm zzz';

function formatNow(date: Date) {
  return format(date, TIME_FORMAT, { in: tz(TIME_ZONE) });
}

type LocalTimeProps = {
  className?: string;
};

export function LocalTime({ className }: LocalTimeProps) {
  const [time, setTime] = useState<string>(formatNow(new Date()));

  useEffect(() => {
    const update = () => setTime(formatNow(new Date()));

    const now = new Date();
    const msUntilNextMinute = (60 - now.getSeconds()) * 1000 - now.getMilliseconds();

    let intervalId: ReturnType<typeof setInterval> | undefined;
    const timeoutId = setTimeout(() => {
      update();
      intervalId = setInterval(update, 60_000);
    }, msUntilNextMinute);

    return () => {
      clearTimeout(timeoutId);
      clearInterval(intervalId);
    };
  }, []);

  return (
    <time className={className} dateTime={time} suppressHydrationWarning aria-label="Current local time in Warsaw">
      {time}
    </time>
  );
}
