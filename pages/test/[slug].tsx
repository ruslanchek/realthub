/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import GoogleMapReact from 'google-map-react';
import getConfig from 'next/config';
import { Wrapper } from '../../components/Wrapper';
import { Nav } from '../../components/Nav';

const Post = () => {
	// const router = useRouter();
	// const { slug } = router.query;
	const { publicRuntimeConfig } = getConfig();

	const params = {
		center: {
			lat: 59.95,
			lng: 30.33,
		},
		zoom: 11,
	};

	return (
		<Wrapper>
			<Nav />
			{publicRuntimeConfig.GOOGLE_MAPS_API_KEY}
			<div css={styles.map}>
				{process.env.GOOGLE_MAPS_API_KEY}
				<GoogleMapReact
					bootstrapURLKeys={{
						key: publicRuntimeConfig.GOOGLE_MAPS_API_KEY,
					}}
					defaultCenter={params.center}
					defaultZoom={params.zoom}
					yesIWantToUseGoogleMapApiInternals
					onGoogleApiLoaded={() => {}}
				/>
			</div>
		</Wrapper>
	);
};

export default Post;

const styles = {
	map: css`
		width: 400px;
		height: 400px;
	`,
};
