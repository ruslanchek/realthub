/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { useState, useRef, useEffect } from 'react';
import { NextPage } from 'next';
import { PageWrapper } from '../../components/PageWrapper';
import { Header } from '../../components/Header';
import { PageHead } from '../../components/PageHead';
import GoogleMapReact from 'google-map-react';
import { PropertyCard, EViewSize } from '../../components/PropertyCard';
import { IApiPropertyItem, ApiProperty } from '../../apis/ApiProperty';

const Marker = (props: any) => <div css={styles.marker}>{props.text}</div>;

interface IProps {
  properties: IApiPropertyItem[];
}

const DEFAULT_CENTER = {
  lat: 59.95,
  lng: 30.33,
};

const DEFAULT_ZOOM = 2;

const Page: NextPage<IProps> = ({ properties }) => {
  const [mapCenter, setMapCenter] = useState(DEFAULT_CENTER);
  const [mapZoom] = useState(DEFAULT_ZOOM);
  const [scrolling, setScrolling] = useState(false);
  const scrollingTimeout = useRef<any>();

  useEffect(() => {
    return () => {
      clearTimeout(scrollingTimeout.current);
    };
  }, []);

  return (
    <PageWrapper>
      <PageHead />
      <Header theme="inner" />

      <main css={styles.root}>
        <section css={styles.search}>
          <div
            css={styles.items}
            onScroll={() => {
              clearTimeout(scrollingTimeout.current);
              setScrolling(true);
              scrollingTimeout.current = setTimeout(() => {
                setScrolling(false);
              }, 50);
            }}
          >
            <div className={scrolling ? 'scrolling' : ''}>
              {properties.map(item => (
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
            {properties.map((item, index) => (
              <Marker key={item.id} text={index} {...item.geo} />
            ))}
          </GoogleMapReact>
        </section>
      </main>
    </PageWrapper>
  );
};

Page.getInitialProps = async ctx => {
  const result = await ApiProperty.getPropertyList(ctx);
  return { properties: result.data || [] };
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

    .scrolling {
      pointer-events: none;
    }
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
