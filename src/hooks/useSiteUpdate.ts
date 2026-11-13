import { useState, useEffect, useCallback, useRef } from 'react';

const CURRENT_BUILD_VERSION =
  typeof __APP_BUILD_VERSION__ !== 'undefined' ? __APP_BUILD_VERSION__ : '';

async function clearAllBrowserCaches() {
  if ('caches' in window) {
    try {
      const names = await caches.keys();
      await Promise.all(names.map((name) => caches.delete(name)));
    } catch {
      // Ignore cache clear failures
    }
  }
}

export function useSiteUpdate() {
  const [hasUpdate, setHasUpdate] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const waitingWorkerRef = useRef<ServiceWorker | null>(null);

  const checkForSiteVersionChange = useCallback(async () => {
    try {
      const response = await fetch(`./version.json?t=${Date.now()}`, {
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          Pragma: 'no-cache',
        },
      });
      if (!response.ok) return;
      const data: { version?: string } = await response.json();
      if (
        data?.version &&
        data.version !== '1.0.0-dev' &&
        CURRENT_BUILD_VERSION &&
        data.version !== CURRENT_BUILD_VERSION
      ) {
        await clearAllBrowserCaches();
        setHasUpdate(true);
      }
    } catch {
      // Offline or blocked — ignore quietly
    }
  }, []);

  useEffect(() => {
    let registrationRef: ServiceWorkerRegistration | null = null;
    let refreshing = false;

    const handleControllerChange = () => {
      if (refreshing) return;
      refreshing = true;
      window.location.reload();
    };

    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.addEventListener('controllerchange', handleControllerChange);

      navigator.serviceWorker
        .register('./sw.js', { updateViaCache: 'none' })
        .then((registration) => {
          registrationRef = registration;

          if (registration.waiting) {
            waitingWorkerRef.current = registration.waiting;
            clearAllBrowserCaches();
            setHasUpdate(true);
          }

          registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing;
            if (!newWorker) return;

            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                waitingWorkerRef.current = newWorker;
                clearAllBrowserCaches();
                setHasUpdate(true);
              }
            });
          });

          // Trigger background SW check
          registration.update().catch(() => {});
        })
        .catch(() => {});
    }

    // Initial version.json check + periodic checks + tab focus checks
    checkForSiteVersionChange();

    const intervalId = window.setInterval(() => {
      checkForSiteVersionChange();
      registrationRef?.update().catch(() => {});
    }, 3 * 60 * 1000);

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        checkForSiteVersionChange();
        registrationRef?.update().catch(() => {});
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.clearInterval(intervalId);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.removeEventListener('controllerchange', handleControllerChange);
      }
    };
  }, [checkForSiteVersionChange]);

  const applyUpdate = useCallback(async () => {
    if (isUpdating) return;
    setIsUpdating(true);

    await clearAllBrowserCaches();

    if (waitingWorkerRef.current) {
      waitingWorkerRef.current.postMessage({ type: 'CLEAR_ALL_CACHES' });
      waitingWorkerRef.current.postMessage({ type: 'SKIP_WAITING' });
    } else if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
      navigator.serviceWorker.controller.postMessage({ type: 'CLEAR_ALL_CACHES' });
    }

    setTimeout(() => {
      try {
        const url = new URL(window.location.href);
        url.searchParams.set('v', Date.now().toString());
        window.location.replace(url.toString());
      } catch {
        window.location.reload();
      }
    }, 350);
  }, [isUpdating]);

  return {
    hasUpdate,
    isUpdating,
    applyUpdate,
    dismissUpdate: () => setHasUpdate(false),
  };
}
