import Link from 'next/link';
import Image from 'next/image';

import { getApps } from '@/lib/apps';

import './AppList.css';

export function AppList() {
  const apps = getApps();

  return (
    <ul className="apps-list">
      {apps.map((app) => (
        <li key={app.slug} className="app-item">
          <Link href={app.detailsUrl ?? `/apps/${app.slug}`} className="app-item-link">
            <Image className="app-item-icon" src={app.icon} alt={`${app.name} app icon`} width={72} height={72} />
            <div className="app-item-body">
              <div className="app-item-header">
                <h2 className="app-item-title">{app.name}</h2>
                <span className="app-item-meta">
                  {app.platform} · {app.price}
                </span>
              </div>
              <p className="app-item-desc">{app.summary}</p>
            </div>
            <span className="app-item-arrow" aria-hidden="true">
              →
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
