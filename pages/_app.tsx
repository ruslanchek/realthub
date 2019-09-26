import React from 'react';
import App from 'next/app';
import { authStore } from '../stores/authStore';
import { commonStore } from '../stores/commonStore';
import { ApiAuth } from '../apis/ApiAuth';

class MyApp extends App {
  async componentDidMount() {
    if (!authStore.state.me) {
      await ApiAuth.getMe();
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
