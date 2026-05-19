import { useState, useEffect } from 'react';

type Route = {
  path: string;
  params: Record<string, string>;
};

function parsePath(hash: string): Route {
  const fullPath = hash.replace('#', '') || '/';
  const [path, queryString] = fullPath.split('?');
  const params: Record<string, string> = {};
  if (queryString) {
    queryString.split('&').forEach((pair) => {
      const [key, value] = pair.split('=');
      if (key) params[decodeURIComponent(key)] = decodeURIComponent(value || '');
    });
  }
  return { path, params };
}

export function navigate(path: string) {
  window.location.hash = path;
}

export function useRouter() {
  const [route, setRoute] = useState<Route>(() => parsePath(window.location.hash));

  useEffect(() => {
    const handler = () => {
      const newRoute = parsePath(window.location.hash);
      setRoute(newRoute);
    };
    window.addEventListener('hashchange', handler);
    handler();
    return () => window.removeEventListener('hashchange', handler);
  }, []);

  return route;
}

export function Link({ to, children, className, onClick }: { to: string; children: React.ReactNode; className?: string; onClick?: () => void }) {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onClick) onClick();
    navigate(to);
  };
  return (
    <a href={`#${to}`} className={className} onClick={handleClick}>
      {children}
    </a>
  );
}
