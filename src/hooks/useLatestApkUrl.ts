import { useState, useEffect } from 'react';

const REPO_OWNER = 'masarik-tourism';
const REPO_NAME = 'masarik.tourism';
const DEFAULT_LATEST_DOWNLOAD_URL = `https://github.com/${REPO_OWNER}/${REPO_NAME}/releases/latest/download/Masarik-Tourism.apk`;

export interface LatestApkInfo {
  downloadUrl: string;
  version: string;
  sizeLabel: string | null;
  isLoading: boolean;
}

export const useLatestApkInfo = (): LatestApkInfo => {
  const [info, setInfo] = useState<LatestApkInfo>({
    downloadUrl: DEFAULT_LATEST_DOWNLOAD_URL,
    version: 'v1.0.0',
    sizeLabel: null,
    isLoading: true,
  });

  useEffect(() => {
    let isMounted = true;

    const fetchLatestReleaseAsset = async () => {
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

          const tagName = typeof data.tag_name === 'string' && data.tag_name.trim()
            ? data.tag_name.trim()
            : 'أحدث إصدار';

          const sizeLabel =
            typeof apkAsset?.size === 'number' && apkAsset.size > 0
              ? `${(apkAsset.size / (1024 * 1024)).toFixed(1)} MB`
              : null;

          if (isMounted) {
            setInfo({
              downloadUrl: apkAsset?.browser_download_url || DEFAULT_LATEST_DOWNLOAD_URL,
              version: tagName,
              sizeLabel,
              isLoading: false,
            });
            return;
          }
        }
      } catch {
        // Keep permanent latest release redirect URL on network failure
      }

      if (isMounted) {
        setInfo((prev) => ({ ...prev, isLoading: false }));
      }
    };

    fetchLatestReleaseAsset();

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
