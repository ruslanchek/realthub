import Head from 'next/head';
import { useEffect } from 'react';
import { initGA, logPageView } from '../common/analytics';
import { CONFIG } from '../common/constants';

interface IProps {
  title?: string;
  description?: string;
}

export const PageHead: React.FC<IProps> = ({
  title = CONFIG.DEFAULT_TITLE,
  description = CONFIG.DEFAULT_DESCRIPTION,
}) => {
  useEffect(() => {
    initGA();
    logPageView();
  }, []);

  useEffect(() => {
    document.title = title;
  }, [title]);

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <link rel="manifest" href="/static/manifest.json" />
      <meta name="apple-mobile-web-app-title" content={CONFIG.DEFAULT_TITLE} />
      <meta name="application-name" content={CONFIG.DEFAULT_TITLE} />
      <meta name="msapplication-TileColor" content="#2b5797" />
      <meta name="theme-color" content="#ffffff" />
      <link
        href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,600&display=swap"
        rel="stylesheet"
      />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/static/icons/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/static/icons/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/static/icons/favicon-16x16.png"
      />
      <link
        rel="mask-icon"
        href="/static/icons/safari-pinned-tab.svg"
        color="#0286ff"
      />
      <link
        rel="shortcut icon"
        type="image/png"
        href="/static/icons/favicon.ico"
      />
      <link
        rel="icon"
        type="image/png"
        href="/static/icons/android-chrome-192x192.png"
        sizes="192x192"
      />
      <link
        rel="icon"
        type="image/png"
        href="/static/icons/android-chrome-512x512.png"
        sizes="512x512"
      />
    </Head>
  );
};

export default Head;
