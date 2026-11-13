import { useState, useEffect, type MouseEvent } from 'react';

const REPO_OWNER = 'masarik-tourism';
const REPO_NAME = 'masarik.tourism';
export const FAST_CDN_APK_URL = `https://${REPO_OWNER}.github.io/${REPO_NAME}/downloads/Masarik-Tourism.apk`;

export interface LatestApkInfo {
  downloadUrl: string;
  version: string;
  sizeLabel: string | null;
  isLoading: boolean;
}

/**
 * Handles APK download clicks across both Android WebView (via AndroidBridge)
 * and standard mobile/desktop browsers.
 */
export function handleApkDownload(
  apkDownloadUrl: string,
  event?: MouseEvent<HTMLElement>
): void {
  if (event) {
    event.preventDefault();
  }

  const targetUrl = apkDownloadUrl || FAST_CDN_APK_URL;

  if (typeof window !== 'undefined' && window.AndroidBridge?.openExternalUrl) {
    window.AndroidBridge.openExternalUrl(targetUrl);
    return;
  }

  if (typeof window !== 'undefined') {
    window.location.href = targetUrl;
  }
}

export const useLatestApkInfo = (): LatestApkInfo => {
  const [info, setInfo] = useState<LatestApkInfo>({
    downloadUrl: FAST_CDN_APK_URL,
    version: 'v1.0.1',
    sizeLabel: null,
    isLoading: true,
  });

  useEffect(() => {
    let isMounted = true;

    const fetchLatestReleaseMetadata = async () => {
      try {
        const response = await fetch(
          `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/releases/latest?t=${Date.now()}`,
          {
            cache: 'no-store',
            headers: {
              Accept: 'application/vnd.github.v3+json',
              'If-Modified-Since': 'Thu, 01 Jan 1970 00:00:00 GMT',
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          const apkAsset = data.assets?.find(
            (asset: { name?: string; browser_download_url?: string; size?: number }) =>
              asset.name?.toLowerCase().endsWith('.apk')
          );

          const tagName =
            typeof data.tag_name === 'string' && data.tag_name.trim()
              ? data.tag_name.trim()
              : 'v1.0.1';

          const sizeLabel =
            typeof apkAsset?.size === 'number' && apkAsset.size > 0
              ? `${(apkAsset.size / (1024 * 1024)).toFixed(1)} MB`
              : null;

          // Use Fastly GitHub Pages CDN URL with version query parameter for maximum speed in Egypt
          const cdnUrlWithVersion = `${FAST_CDN_APK_URL}?v=${encodeURIComponent(tagName)}`;

          if (isMounted) {
            setInfo({
              downloadUrl: cdnUrlWithVersion,
              version: tagName,
              sizeLabel,
              isLoading: false,
            });
            return;
          }
        }
      } catch {
        // Keep fast CDN fallback URL on network error
      }

      if (isMounted) {
        setInfo((prev) => ({ ...prev, isLoading: false }));
      }
    };

    fetchLatestReleaseMetadata();

    return () => {
      isMounted = false;
    };
  }, []);

  return info;
};

export const useLatestApkUrl = (): string => {
  const { downloadUrl } = useLatestApkInfo();
  return downloadUrl;
};
