/** @jsx jsx */
import React from 'react';
import { jsx, css } from '@emotion/core';
import Link from 'next/link';
import { PATHS } from '../common/constants';
import { Button } from '../ui/ui/form/Button';
import { AuthModal } from './AuthModal';
import { useStore } from 'react-stores';
import { authStore } from '../stores/authStore';
import { commonStore } from '../stores/commonStore';

interface IProps {
  theme: 'main' | 'inner';
}

export const Header: React.FC<IProps> = ({ theme }) => {
  const authStoreState = useStore(authStore);
  const commonStoreState = useStore(commonStore);

  return (
    <header css={[styles.root, styles.rootTheme[theme]]}>
      <AuthModal />

      <Link href={PATHS.HOME}>
        <a href={PATHS.HOME} css={[styles.logo, styles.logoTheme[theme]]}>
          Realthub
        </a>
      </Link>

      <nav css={[styles.nav, styles.navTheme[theme]]}>
        <Link href={`/search`} as={`/search`}>
          <a>Search</a>
        </Link>

        <Link href={`/search`} as={`/search`}>
          <a>Loved properties</a>
        </Link>

        <Link href={`/test`} as={`/test`}>
          <a>Moving center</a>
        </Link>

        <Link href={`/test`} as={`/test`}>
          <a>List a Property</a>
        </Link>

        <Link href={`/me`} as={`/me`}>
          <a>Me</a>
        </Link>
      </nav>

      {commonStoreState.ready && (
        <div css={[styles.user, styles.navTheme[theme]]}>
          {authStoreState.me ? (
            <Link href={PATHS.ME} as={PATHS.ME}>
              <a>{authStoreState.me.email}</a>
            </Link>
          ) : (
            <Button
              type="button"
              color="white"
              size="small"
              strokeOnly
              onClick={() => {
                authStore.setState({
                  authModal: true,
                });
              }}
            >
              Sign In
            </Button>
          )}
        </div>
      )}
    </header>
  );
};

const styles = {
  root: css`
    display: flex;
    align-items: center;
    position: fixed;
    top: 20px;
    left: 20px;
    right: 20px;
    z-index: 10;
    padding: 0 15px;
    height: 50px;
    border-radius: var(--BORDER_RADIUS_LARGE);
  `,

  rootTheme: {
    main: css`
      background-color: rgb(var(--WHITE));
      box-shadow: var(--ELEVATION_SHADOW_2);
    `,

    inner: css`
      background-color: rgb(var(--TEXT_ACTIVE));
      box-shadow: 0 4px 12px hsla(var(--TEXT_ACTIVE_HSL_DARKEN), 0.2);
    `,
  },

  user: css`
    flex-grow: 1;
    display: flex;
    align-items: center;
    justify-content: flex-end;

    > a,
    > a:link {
      white-space: nowrap;
    }
  `,

  logo: css`
    text-indent: -10000px;
    background-size: contain;
    background-repeat: no-repeat;
    flex-shrink: 0;
    display: block;
    margin-right: 40px;
    top: -6px;
    position: relative;
  `,

  logoTheme: {
    main: css`
      background-image: url('/static/assets/logo.png');
      width: 120px;
      height: 22px;
      top: -3px;
    `,

    inner: css`
      background-image: url('/static/assets/logo-w.png');
      width: 120px;
      height: 22px;
      top: -3px;
    `,
  },

  nav: css`
    display: flex;
    align-items: center;

    > a,
    > a:link {
      margin-right: 30px;
      white-space: nowrap;
    }
  `,

  navTheme: {
    main: css`
      > a,
      > a:link {
        color: rgb(var(--TEXT_ACTIVE)) !important;

        &:hover {
          opacity: 0.7;
        }
      }
    `,

    inner: css`
      > a,
      > a:link {
        color: rgb(var(--BUTTON_TEXT)) !important;

        &:hover {
          opacity: 0.7;
        }
      }
    `,
  },
};
