import React from 'react';
import App from 'next/app';
import { IMe, getMe } from '../apis/authApi';
import { AuthContext } from '../contexts/AuthContext';

interface IProps {
  me: IMe | undefined;
}

class MyApp extends App<IProps> {
  static async getInitialProps({ Component, ctx }: any) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps, me: await getMe(ctx) };
  }

  render() {
    const { Component, pageProps, me } = this.props;

    return (
      <AuthContext.Provider
        value={{
          me,
        }}
      >
        <Component {...pageProps} />
      </AuthContext.Provider>
    );
  }
}

export default MyApp;
