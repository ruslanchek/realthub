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
			<link rel="shortcut icon" type="image/png" href="/static/favicon.ico" />
			<link
				rel="icon"
				type="image/png"
				href="/static/icon-512x512.png"
				sizes="512x512"
			/>
		</Head>
	);
};

export default Head;
