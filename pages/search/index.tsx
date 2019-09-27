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
import React from 'react';

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
  const [scrolling, setScrolling] = useState(false);
  const [mapReady, setMapReady] = useState(false);
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
              }, 100);
            }}
          >
            <div
              css={styles.itemsInner}
              className={scrolling ? 'scrolling' : ''}
            >
              {properties.map(item => {
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
              })}
            </div>
          </div>
        </section>

        <section css={styles.map}>
          {process.browser && (
            <GoogleMapReact
              bootstrapURLKeys={{ key: process.env.GOOGLE_MAPS_API_KEY || '' }}
              defaultCenter={DEFAULT_CENTER}
              defaultZoom={DEFAULT_ZOOM}
              zoom={mapZoom}
              onTilesLoaded={() => {
                setMapReady(true);
              }}
            >
              {mapReady &&
                properties.map((item, index) => (
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
          )}
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
  `,

  items: css`
    height: 100%;
    width: 100%;
    overflow: auto;
  `,

  itemsInner: css`
    &.scrolling {
      pointer-events: none;
    }
  `,

  map: css`
    flex-grow: 1;
  `,
};

export default Page;
