/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { useState, useRef, useEffect } from 'react';
import { NextPage } from 'next';
import GoogleMapReact from 'google-map-react';
import { PageWrapper } from '../../components/PageWrapper';
import { Header } from '../../components/Header';
import { PageHead } from '../../components/PageHead';
import { PropertyCard } from '../../components/PropertyCard';
import { IApiPropertyItem, ApiProperty } from '../../apis/ApiProperty';
import { MapMarker } from '../../components/MapMarker';
import { VirtualList } from '../../ui/module';
import { UI_SIZES } from '../../common/constants';

interface IProps {
  properties: IApiPropertyItem[];
}

const DEFAULT_CENTER = {
  lat: 59.95,
  lng: 30.33,
};

const DEFAULT_ZOOM = 2;

const Page: NextPage<IProps> = ({ properties }) => {
  const [focusedProperty, setFocusedProperty] = useState<
    IApiPropertyItem | undefined
  >(undefined);
  const [mapZoom] = useState(DEFAULT_ZOOM);

  return (
    <PageWrapper>
      <PageHead />
      <Header theme="inner" />

      <main css={styles.root}>
        <section css={styles.search}>
          <VirtualList<IApiPropertyItem>
            dataList={properties}
            height={840}
            width={'100%'}
            itemHeight={UI_SIZES.LIST_CARD_SIZE + 15}
            renderRow={item => {
              return (
                <PropertyCard
                  focused={Boolean(
                    focusedProperty && focusedProperty.id === item.id,
                  )}
                  onFocus={() => {
                    setFocusedProperty(item);
                  }}
                  onBlur={() => {
                    setFocusedProperty(undefined);
                  }}
                  key={item.id}
                  property={item}
                />
              );
            }}
          />
        </section>

        <section css={styles.map}>
          <GoogleMapReact
            bootstrapURLKeys={{ key: process.env.GOOGLE_MAPS_API_KEY || '' }}
            defaultCenter={DEFAULT_CENTER}
            defaultZoom={DEFAULT_ZOOM}
            zoom={mapZoom}
          >
            {properties.map((item, index) => (
              <MapMarker
                focused={Boolean(
                  focusedProperty && focusedProperty.id === item.id,
                )}
                key={item.id}
                property={item}
                onFocus={() => {
                  setFocusedProperty(item);
                }}
                onBlur={() => {
                  setFocusedProperty(undefined);
                }}
                {...item.geo}
              />
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
    height: calc(100vh - 50px);
    background-color: rgb(var(--ELEMENT_BG_ACCENT));

    &.scrolling {
      .scrolling-item {
        pointer-events: none;
      }
    }
  `,

  map: css`
    flex-grow: 1;
  `,
};

export default Page;
