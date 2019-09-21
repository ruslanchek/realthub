import React from 'react';
import App from 'next/app';
import { authStore } from '../stores/authStore';
import { commonStore } from '../stores/commonStore';
import { getMe } from '../apis/authApi';

class MyApp extends App {
  async componentDidMount() {
    if (!authStore.state.me) {
      await getMe();
    }

    commonStore.setState({
      ready: true,
    });
  }

  render() {
    const { Component, pageProps } = this.props;
    return <Component {...pageProps} />;
  }
}

export default MyApp;
