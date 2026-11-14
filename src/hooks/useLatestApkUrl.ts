import { useState, useEffect, type MouseEvent } from 'react';

const REPO_OWNER = 'masarik-tourism';
const REPO_NAME = 'masarik-tourism.github.io';
export const FALLBACK_PAGES_APK_URL = `https://github.com/${REPO_OWNER}/${REPO_NAME}/releases/latest/download/Masarik-Tourism.apk`;
export const FAST_CDN_APK_URL = FALLBACK_PAGES_APK_URL;

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

  const targetUrl = apkDownloadUrl || FALLBACK_PAGES_APK_URL;

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
    downloadUrl: FALLBACK_PAGES_APK_URL,
    version: 'v1.0.0',
    sizeLabel: null,
    isLoading: true,
  });

  useEffect(() => {
    let isMounted = true;

    const fetchLatestReleaseMetadata = async () => {
      const requestInit: RequestInit = {
        cache: 'no-store',
        headers: {
          Accept: 'application/vnd.github.v3+json',
          'If-Modified-Since': 'Thu, 01 Jan 1970 00:00:00 GMT',
        },
      };

      const timestamp = Date.now();
      const [releaseResult, commitResult] = await Promise.allSettled([
        fetch(
          `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/releases/latest?t=${timestamp}`,
          requestInit
        ),
        fetch(
          `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/commits/apk-cdn?t=${timestamp}`,
          requestInit
        ),
      ]);

      let tagName = 'v1.0.0';
      let sizeLabel: string | null = null;
      let resolvedDownloadUrl = FALLBACK_PAGES_APK_URL;

      try {
        if (releaseResult.status === 'fulfilled' && releaseResult.value.ok) {
          const data = await releaseResult.value.json();
          const apkAsset = data.assets?.find(
            (asset: { name?: string; browser_download_url?: string; size?: number }) =>
              asset.name?.toLowerCase().endsWith('.apk')
          );

          if (typeof data.tag_name === 'string' && data.tag_name.trim()) {
            tagName = data.tag_name.trim();
          }

          if (typeof apkAsset?.size === 'number' && apkAsset.size > 0) {
            sizeLabel = `${(apkAsset.size / (1024 * 1024)).toFixed(1)} MB`;
          }
        }
      } catch {
        // Keep default metadata on JSON parse error
      }

      try {
        if (commitResult.status === 'fulfilled' && commitResult.value.ok) {
          const commitData = await commitResult.value.json();
          const sha = typeof commitData.sha === 'string' ? commitData.sha.trim() : '';
          // Pin to exact immutable apk-cdn commit SHA so jsDelivr never serves a stale APK
          if (/^[a-f0-9]{40}$/i.test(sha)) {
            resolvedDownloadUrl = `https://cdn.jsdelivr.net/gh/${REPO_OWNER}/${REPO_NAME}@${sha}/downloads/Masarik-Tourism.apk`;
          }
        }
      } catch {
        // Keep GitHub Pages fallback URL if commit lookup fails
      }

      if (isMounted) {
        setInfo({
          downloadUrl: resolvedDownloadUrl,
          version: tagName,
          sizeLabel,
          isLoading: false,
        });
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
