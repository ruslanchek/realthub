import Head from 'next/head';

interface IProps {
	title?: string;
	description?: string;
}

const DEFAULT_TITLE = 'xxx';
const DEFAULT_DESCRIPTION = 'sss';

export const PageHead: React.FC<IProps> = ({
	title = DEFAULT_TITLE,
	description = DEFAULT_DESCRIPTION,
}) => {
	return (
		<Head>
			<title>{title}</title>
			<meta name="description" content={description} />
			<meta name="viewport" content="initial-scale=1.0, width=device-width" />
			<link rel="manifest" href="/static/manifest.json" />

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
			<meta name="apple-mobile-web-app-title" content="Realthub" />
			<meta name="application-name" content="Realthub" />
			<meta name="msapplication-TileColor" content="#2b5797" />
			<meta name="theme-color" content="#ffffff" />

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