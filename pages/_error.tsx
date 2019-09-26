import App from 'next/error';
import React from 'react';
import { ErrorPage } from '../components/ErrorPage';

class MyError extends App {
  render() {
    return <ErrorPage statusCode={this.props.statusCode} />;
  }
}

export default MyError;
