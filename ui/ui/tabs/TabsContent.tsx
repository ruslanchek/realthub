/** @jsx jsx */
import { jsx } from '@emotion/core';
import React, { useContext } from 'react';
import { TabsContext } from './Tabs';

interface ITabContent {
  component: string | React.ReactNode;
}

interface IProps {
  content: ITabContent[];
}

export const TabsContent: React.FC<IProps> = props => {
  const { content } = props;
  const { currentIndex } = useContext(TabsContext);

  return (
    <React.Fragment>
      {content && content[currentIndex]
        ? content[currentIndex].component
        : null}
    </React.Fragment>
  );
};
