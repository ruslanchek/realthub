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
    <header css={[styles.root, styles.theme[theme]]}>
      <Link href={PATHS.HOME}>
        <a href={PATHS.HOME} css={styles.logo}>
          Realthub
        </a>
      </Link>

      <nav css={styles.nav}>
        <Link href={`/test`} as={`/test`}>
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
        <Button type="button" color="default" size="small">
          Sign In
        </Button>
      </div>
    </header>
  );
};

const styles = {
  root: css`
    padding: 40px;
    display: flex;
    align-items: center;
  `,

  theme: {
    main: css`
      padding: 40px;
    `,

    inner: css`
      padding: 30px 40px;
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
    background-image: url('/static/assets/logo.png');
    background-size: contain;
    background-repeat: no-repeat;
    width: 190px;
    height: 35px;
    display: block;
    margin-right: 40px;
    top: -6px;
    position: relative;
  `,

  nav: css`
    display: flex;
    align-items: center;

    > a {
      margin-right: 30px;
    }
  `,
};
