/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { NextPage } from 'next';
import { Wrapper } from '../../components/Wrapper';
import { Header } from '../../components/Header';
import fetch from 'isomorphic-unfetch';
import { IApiResponse, IProperty } from '../../meta/interfaces';
import { PageHead } from '../../components/Head';
import GoogleMapReact from 'google-map-react';
import { PropertyCard } from '../../components/PropertyCard';

const Marker = (props: any) => <div css={styles.marker}>{props.text}</div>;

interface IProps {
  response: IApiResponse<IProperty[]>;
}

const MAP_SETTINGS = {
  center: {
    lat: 59.95,
    lng: 30.33,
  },
  zoom: 11,
};

const Page: NextPage<IProps> = ({ response }) => (
  <Wrapper>
    <PageHead />
    <Header theme="inner" />

    <main css={styles.root}>
      <section css={styles.search}>
        <div css={styles.items}>
          {response.data &&
            response.data.map(item => (
              <PropertyCard key={item.id} property={item} />
            ))}
        </div>
      </section>

      <section css={styles.map}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.GOOGLE_MAPS_API_KEY || '' }}
          defaultCenter={MAP_SETTINGS.center}
          defaultZoom={MAP_SETTINGS.zoom}
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
    width: 340px;
    max-width: 340px;
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
