/** @jsx jsx */
import { jsx } from '@emotion/core';
import React from 'react';
import { TabsContext } from './Tabs';

interface ITabContent {
  component: string | React.ReactNode;
}

interface IProps {
  content: ITabContent[];
}

export class TabsContent extends React.Component<IProps, {}> {
  render() {
    const { content } = this.props;

    return (
      <TabsContext.Consumer>
        {({ currentIndex }) => {
          return (
            <React.Fragment>
              {content && content[currentIndex]
                ? content[currentIndex].component
                : null}
            </React.Fragment>
          );
        }}
      </TabsContext.Consumer>
    );
  }
}
