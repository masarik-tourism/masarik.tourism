import { useState, useEffect } from 'react';

const REPO_OWNER = 'masarik-tourism';
const REPO_NAME = 'masarik.tourism';
const DEFAULT_LATEST_DOWNLOAD_URL = `https://github.com/${REPO_OWNER}/${REPO_NAME}/releases/latest/download/Masarik-Tourism.apk`;

export const useLatestApkUrl = (): string => {
  const [downloadUrl, setDownloadUrl] = useState<string>(DEFAULT_LATEST_DOWNLOAD_URL);

  useEffect(() => {
    let isMounted = true;

    const fetchLatestReleaseAsset = async () => {
      try {
        const response = await fetch(
          `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/releases/latest`,
          {
            headers: {
              Accept: 'application/vnd.github.v3+json',
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          // Find the APK file in the release assets
          const apkAsset = data.assets?.find(
            (asset: { name?: string; browser_download_url?: string }) =>
              asset.name?.toLowerCase().endsWith('.apk')
          );

          if (apkAsset?.browser_download_url && isMounted) {
            setDownloadUrl(apkAsset.browser_download_url);
          }
        }
      } catch {
        // In case of network error or GitHub API rate-limiting, keep DEFAULT_LATEST_DOWNLOAD_URL
        // which GitHub permanently redirects (HTTP 302) to the latest release APK automatically
      }
    };

    fetchLatestReleaseAsset();

    return () => {
      isMounted = false;
    };
  }, []);

  return downloadUrl;
};
