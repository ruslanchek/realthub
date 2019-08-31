/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { useState } from 'react';
import { NextPage } from 'next';
import { Wrapper } from '../../components/Wrapper';
import { Header } from '../../components/Header';
import fetch from 'isomorphic-unfetch';
import { IApiResponse, IProperty } from '../../meta/interfaces';
import { PageHead } from '../../components/Head';
import GoogleMapReact from 'google-map-react';
import { PropertyCard, EViewSize } from '../../components/PropertyCard';

const Marker = (props: any) => <div css={styles.marker}>{props.text}</div>;

interface IProps {
  response: IApiResponse<IProperty[]>;
}

const DEFAULT_CENTER = {
  lat: 59.95,
  lng: 30.33,
};

const DEFAULT_ZOOM = 2;

const Page: NextPage<IProps> = ({ response }) => {
  const [mapCenter, setMapCenter] = useState(DEFAULT_CENTER);
  const [mapZoom] = useState(DEFAULT_ZOOM);

  return (
    <Wrapper>
      <PageHead />
      <Header theme="inner" />

      <main css={styles.root}>
        <section css={styles.search}>
          <div css={styles.items}>
            {response.data &&
              response.data.map(item => (
                <PropertyCard
                  onPoint={() => {
                    setMapCenter(item.geo);
                  }}
                  viewSize={EViewSize.Small}
                  key={item.id}
                  property={item}
                />
              ))}
          </div>
        </section>

        <section css={styles.map}>
          <GoogleMapReact
            bootstrapURLKeys={{ key: process.env.GOOGLE_MAPS_API_KEY || '' }}
            defaultCenter={DEFAULT_CENTER}
            defaultZoom={DEFAULT_ZOOM}
            center={mapCenter}
            zoom={mapZoom}
          >
            {response.data &&
              response.data.map((item, index) => (
                <Marker key={item.id} text={index} {...item.geo} />
              ))}
          </GoogleMapReact>
        </section>
      </main>
    </Wrapper>
  );
};

Page.getInitialProps = async () => {
  const response = await fetch(`${process.env.API_URL}/property`);
  return { response: await response.json() };
};

const styles = {
  root: css`
    flex-grow: 1;
    display: flex;
  `,

  search: css`
    width: 600px;
    min-width: 600px;
    height: calc(100vh - 70px);
  `,

  items: css`
    flex-grow: 1;
    height: 100%;
    overflow: auto;
  `,

  map: css`
    flex-grow: 1;
  `,

  marker: css`
    background: rgb(var(--TEXT_ACCENT));
    width: 20px;
    height: 20px;
    border-radius: 100%;
    border: 2px solid #fff;
    box-sizing: border-box;
    color: #fff;
    text-align: center;
    line-height: 20px;
  `,
};

export default Page;
