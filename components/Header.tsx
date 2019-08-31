/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import Link from 'next/link';
import { PATHS } from '../common/constants';
import { Button } from '../ui/ui/form/Button';

interface IProps {
  theme: 'main' | 'inner';
}

export const Header: React.FC<IProps> = ({ theme }) => {
  return (
    <header css={[styles.root, styles.rootTheme[theme]]}>
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

        <Link href={`/test`} as={`/test`}>
          <a>Blog</a>
        </Link>
      </nav>

      <div css={styles.user}>
        <Button type="button" color="white" size="small">
          Sign In
        </Button>
      </div>
    </header>
  );
};

const styles = {
  root: css`
    display: flex;
    align-items: center;
  `,

  rootTheme: {
    main: css`
      height: 100px;
      padding: 0 40px;
    `,

    inner: css`
      padding: 0 20px;
      height: 65px;
      background: rgb(var(--TEXT_ACTIVE));
    `,
  },

  user: css`
    flex-grow: 1;
    display: flex;
    align-items: center;
    justify-content: flex-end;
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
      width: 190px;
      height: 35px;
      top: -6px;
    `,

    inner: css`
      background-image: url('/static/assets/logo-w.png');
      width: 141px;
      height: 26px;
      top: -4px;
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
