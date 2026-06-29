import './AppStoreBadge.css';

type AppStoreBadgeProps = {
  url?: string;
  large?: boolean;
};

const AppleLogo = () => (
  <svg viewBox="0 0 384 512" width="22" height="22" fill="currentColor" aria-hidden="true">
    <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C61.5 141.2 0 184.1 0 271.4c0 25.8 4.7 52.5 14.2 80 12.6 36.1 58 124.6 105.3 123.2 24.7-.6 42.2-17.6 74.4-17.6 31.2 0 47.4 17.6 74.9 17.6 47.7-.7 88.8-81.2 100.8-117.4-64-30.2-60.9-88.5-60.9-90.5zM256.4 84.5c30.1-35.7 27.4-68.2 26.5-79.9-25.6 1.5-55.2 17.4-72.1 37-18.6 21-29.5 47-27.2 78.2 27.7 2.1 53-12.1 72.8-35.3z" />
  </svg>
);

export function AppStoreBadge({ url, large = false }: AppStoreBadgeProps) {
  const className = `appstore-badge${large ? ' appstore-badge-large' : ''}`;

  if (!url) {
    return (
      <span className={`${className} appstore-badge-soon`} aria-disabled="true">
        <AppleLogo />
        <span className="appstore-badge-text">
          <span className="appstore-badge-line1">Coming soon to the</span>
          <span className="appstore-badge-line2">App Store</span>
        </span>
      </span>
    );
  }

  return (
    <a className={className} href={url} target="_blank" rel="noopener noreferrer">
      <AppleLogo />
      <span className="appstore-badge-text">
        <span className="appstore-badge-line1">Download on the</span>
        <span className="appstore-badge-line2">App Store</span>
      </span>
    </a>
  );
}
