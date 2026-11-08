/**
 * Utility to detect whether the application is running inside
 * an installed native app (Android APK / WebView) or standalone PWA.
 */
export function isRunningInApp(): boolean {
  if (typeof window === 'undefined') return false;

  // 1. Explicit query parameters from native wrapper or shortcut
  try {
    const searchParams = new URLSearchParams(window.location.search);
    if (
      searchParams.get('app') === '1' ||
      searchParams.get('mode') === 'app' ||
      searchParams.has('inapp')
    ) {
      return true;
    }
  } catch {}

  // 2. Standalone PWA display mode
  try {
    if (window.matchMedia && window.matchMedia('(display-mode: standalone)').matches) {
      return true;
    }
    if ((window.navigator as unknown as { standalone?: boolean }).standalone === true) {
      return true;
    }
  } catch {}

  // 3. Android WebView detection (User-Agent indicators)
  try {
    const ua = window.navigator.userAgent || '';
    // Custom app token
    if (/MasarikApp/i.test(ua)) return true;
    // Android WebView token: "; wv"
    if (/;\s*wv\b/i.test(ua)) return true;
    // Android Version/X.X Chrome/X.X
    if (/Android.*Version\/[0-9.]+\s+Chrome\//i.test(ua)) return true;
  } catch {}

  return false;
}
