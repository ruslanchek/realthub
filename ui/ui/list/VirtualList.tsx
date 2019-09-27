/** @jsx jsx */
import { jsx } from '@emotion/core';
import React, { CSSProperties, memo } from 'react';
import { FixedSizeList, Align } from 'react-window';
import memoize from 'memoize-one';
import { CustomScrollbars } from '../scrollbars/CustomScrollbars';

interface IProps<TItemData> {
  dataList: TItemData[];
  height: number;
  width: string;
  itemHeight: number;
  renderRow: TRenderRowFunction<TItemData>;
  scrollToIndex?: number;
  onScroll?: () => void;
}

type TRenderRowFunction<TItemData> = (
  itemData: TItemData,
  index: number,
) => React.ReactNode;

interface IListRowDataProps<TItemData> {
  dataList: TItemData[];
  renderRow: (itemData: TItemData, index: number) => React.ReactNode;
}

interface IListRowProps<TItemData> {
  data: IListRowDataProps<TItemData>;
  index: number;
  style: CSSProperties;
}

const CustomScrollbarsVirtualList = React.forwardRef((props, ref) => (
  <CustomScrollbars {...props} forwardedRef={ref} />
));

export class VirtualList<TItemData = any> extends React.Component<
  IProps<TItemData>
> {
  listRef: FixedSizeList | null = null;

  createItemData = memoize(
    (dataList: TItemData[], renderRow: TRenderRowFunction<TItemData>) => ({
      dataList,
      renderRow,
    }),
  );

  Row = memo((props: IListRowProps<TItemData>) => {
    return (
      <div style={props.style} key={props.index}>
        {props.data.renderRow(props.data.dataList[props.index], props.index)}
      </div>
    );
  });

  componentDidMount() {
    this.scrollTo(this.props.scrollToIndex, 'center');
  }

  componentDidUpdate(prevProps: IProps<TItemData>) {
    if (prevProps.scrollToIndex !== this.props.scrollToIndex) {
      this.scrollTo(this.props.scrollToIndex, 'smart');
    }
  }

  scrollTo(scrollToIndex: number | undefined, method: Align) {
    if (this.listRef && scrollToIndex && scrollToIndex >= 0) {
      this.listRef.scrollToItem(scrollToIndex, method);
    }
  }

  onScroll = () => {
    if (this.props.onScroll) {
      this.props.onScroll();
    }
  };

  render() {
    const { height, width, itemHeight, dataList, renderRow } = this.props;

    return (
      <FixedSizeList
        height={height}
        itemData={this.createItemData(dataList, renderRow)}
        onScroll={this.onScroll}
        itemCount={dataList.length}
        itemSize={itemHeight}
        ref={ref => (this.listRef = ref)}
        width={width}
        outerElementType={CustomScrollbarsVirtualList}
      >
        {this.Row}
      </FixedSizeList>
    );
  }
}
