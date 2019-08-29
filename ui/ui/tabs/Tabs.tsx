/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import React from 'react';

interface ITab {
  title: string | React.ReactNode;
}

interface IProps {
  tabs: ITab[];
  renderTabsWrapper?: (
    children: React.ReactNode,
    currentTabIndex: number,
  ) => void;
  autoSize?: boolean;
  startIndex?: number;
  size?: 'small' | 'large';
}

interface IState {
  currentIndex: number;
}

export interface ITabsContext {
  setCurrentTabsIndex: (index: number) => void;
  currentIndex: number;
}

export const TabsContext = React.createContext<ITabsContext>({
  setCurrentTabsIndex: () => {},
  currentIndex: 0,
});

export class Tabs extends React.Component<IProps, IState> {
  state = {
    currentIndex: this.props.startIndex || 0,
  };

  setCurrentTabsIndex = (currentIndex: number) => {
    this.setState({
      currentIndex,
    });
  };

  render() {
    const { tabs, autoSize, renderTabsWrapper } = this.props;
    const { currentIndex } = this.state;
    const tabsElements = tabs.map((tab, i) => (
      <div
        className={currentIndex === i ? 'selected' : ''}
        onClick={this.setCurrentTabsIndex.bind(this, i)}
        css={[styles.tab, autoSize ? styles.autoSizeTab : null]}
        key={i}
      >
        {tab.title}
      </div>
    ));

    return (
      <TabsContext.Provider
        value={{
          setCurrentTabsIndex: this.setCurrentTabsIndex,
          currentIndex,
        }}
      >
        {renderTabsWrapper ? (
          renderTabsWrapper(tabsElements, currentIndex)
        ) : (
          <div css={styles.tabsRoot}>{tabsElements}</div>
        )}

        {this.props.children}
      </TabsContext.Provider>
    );
  }
}

const styles = {
  tabsRoot: css`
    display: flex;
    width: 100%;
    justify-content: stretch;
  `,

  tab: css`
    cursor: pointer;
    height: var(--INPUT_HEIGHT_LARGE);
    display: flex;
    justify-content: center;
    align-items: center;
    flex-grow: 1;
    flex-shrink: 1;
    background-color: rgb(var(--INPUT_BG));
    border: 1px solid rgb(var(--INPUT_BORDER_ACTIVE));
    border-right: none;
    box-sizing: border-box;
    flex-basis: 0;
    transition: background-color 0.2s;

    &:first-of-type {
      border-radius: var(--BORDER_RADIUS_SMALL) 0 0 var(--BORDER_RADIUS_SMALL);
    }

    &:last-of-type {
      border-radius: 0 var(--BORDER_RADIUS_SMALL) var(--BORDER_RADIUS_SMALL) 0;
      border-right: 1px solid rgb(var(--INPUT_BORDER_ACTIVE));
    }

    &.selected {
      background-color: rgba(var(--INPUT_BORDER_ACTIVE), 0.1);
    }
  `,

  autoSizeTab: css`
    flex-basis: auto;
  `,
};
