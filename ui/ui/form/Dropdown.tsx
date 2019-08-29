/** @jsx jsx */
import { jsx, css, ClassNames } from '@emotion/core';
import React, { ChangeEvent } from 'react';
import { CSSTransition } from 'react-transition-group';
import { ActivityIndicator } from '../loading/ActivityIndicator';
import { FormContext, IFormContext } from './Form';
import { Icon, EIconName } from '../icons/icons';
import { InputErrors } from './InputErrors';
import { FormValidatorSelected } from './validators/FormValidator';
import { getCssVariableNumber } from '../../common/utils';
import { VirtualList } from '../list/VirtualList';

const MAX_ITEMS_DEFAULT = 7;
const ANIMATION_TIME = 300;
const FAST_SEARCH_TIMEOUT = 1000;

type TSize = 'small' | 'large' | undefined;

interface IProps<T> {
  items: IDropdownItem<T>[];
  value: string | undefined;
  name: string;
  onSelect: (item: IDropdownItem<T> | undefined) => void;
  renderItemPreContent?: (item: IDropdownItem<T>) => React.ReactNode;
  renderItemPostContent?: (item: IDropdownItem<T>) => React.ReactNode;
  renderItemContent?: (item: IDropdownItem<T>) => React.ReactNode;
  validator?: FormValidatorSelected;
  tabIndex?: number;
  placeholder?: string;
  size?: TSize;
  search?: boolean;
  maxItems?: number;
  loading?: boolean;
  loadingPlaceholder?: string;
  searchPlaceholder?: string;
}

interface IState<T> {
  mappedItems: Map<string, IDropdownItemIndexed<T>>;
  isOpened: boolean;
  isFocused: boolean;
  showErrors: boolean;
  isAnimating: boolean;
  currentItem: IDropdownItemIndexed<T> | undefined;
  highlightedItem: IDropdownItemIndexed<T> | undefined;
  currentScrollingIndex: number | undefined;
  fastSearchValue: string;
  searchValue: string;
  searchInteraction: boolean;
  rowHeightCalculated: number;
}

interface IDropdownItemIndexed<T> extends IDropdownItem<T> {
  index: number;
}

export interface IDropdownItem<T = any> {
  title: string;
  value: string;
  disabled?: boolean;
  data: T;
}

export class Dropdown<T = any> extends React.Component<IProps<T>, IState<T>> {
  static defaultProps = {
    size: 'large',
    maxItems: MAX_ITEMS_DEFAULT,
  };

  state: IState<T> = {
    mappedItems: this.mapItems(this.props.items),
    currentItem: undefined,
    isOpened: false,
    isFocused: false,
    showErrors: false,
    highlightedItem: undefined,
    currentScrollingIndex: undefined,
    fastSearchValue: '',
    searchValue: '',
    searchInteraction: false,
    isAnimating: false,
    rowHeightCalculated: 0,
  };

  formContext: IFormContext | null = null;
  isMouseDown: boolean = false;
  root: HTMLDivElement | null = null;
  dropdownRoot: HTMLDivElement | null = null;
  search: HTMLInputElement | null = null;
  fastSearchTimeout: NodeJS.Timeout | null = null;

  getSizeVarName = (size: TSize): string => {
    switch (size) {
      case 'small': {
        return '--INPUT_HEIGHT_SMALL';
      }

      case 'large':
      default: {
        return '--INPUT_HEIGHT_LARGE';
      }
    }
  };

  get placeholder() {
    return <div css={styles.placeholder}>{this.props.placeholder}</div>;
  }

  get loading() {
    return (
      <div css={styles.placeholder}>
        <div css={styles.loading}>
          <ActivityIndicator size="small" color={'rgb(var(--TEXT_FADED))'} />
        </div>
        {this.props.loadingPlaceholder}
      </div>
    );
  }

  get current() {
    const { currentItem, isOpened, isFocused } = this.state;
    const { loading, name } = this.props;
    const sizeVarName = this.getSizeVarName(this.props.size);
    let errors = [];

    if (this.formContext) {
      errors = this.formContext.getFieldErrors(name);
    }

    return (
      <div
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        onMouseDown={this.mouseDownHandler}
        css={[
          styles.currentRoot,
          css`
            height: var(${sizeVarName});
          `,
        ]}
        className={`${isOpened ? 'opened' : ''} ${isFocused ? 'focused' : ''} ${
          errors.length > 0 ? 'error' : ''
        }`}
      >
        {loading
          ? this.loading
          : currentItem
          ? this.renderItem(currentItem)
          : this.placeholder}
        <Icon
          css={styles.arrow}
          className={isOpened ? 'active' : ''}
          name={EIconName.Arrow}
          width="12px"
          height="12px"
          color={'rgb(var(--TEXT_FADED))'}
        />
      </div>
    );
  }

  get maxItems(): number {
    const itemsCount = this.state.mappedItems.size;
    let { maxItems } = this.props;

    if (maxItems) {
      if (itemsCount < maxItems) {
        maxItems = itemsCount;
      }
    } else {
      maxItems = MAX_ITEMS_DEFAULT;
    }

    return maxItems;
  }

  get dropdown() {
    const {
      mappedItems,
      currentItem,
      isOpened,
      highlightedItem,
      currentScrollingIndex,
      searchValue,
      rowHeightCalculated,
    } = this.state;
    const { search, searchPlaceholder } = this.props;
    const itemsArray = Array.from(mappedItems.values());
    const maxItems = this.maxItems;

    let highlightedItemIndex: number | undefined;
    let currentItemIndex: number | undefined;

    if (currentItem) {
      currentItemIndex = currentItem.index;
    }

    if (highlightedItem) {
      highlightedItemIndex = highlightedItem.index;
    }

    const height = maxItems * rowHeightCalculated;

    return (
      <div
        ref={ref => (this.dropdownRoot = ref)}
        css={styles.dropdownRoot}
        onMouseDown={this.dropdownRootMouseDownHandler}
        onMouseUp={this.dropdownRootMouseUpHandler}
      >
        <ClassNames>
          {({ css }) => (
            <CSSTransition
              unmountOnExit
              appear
              in={isOpened}
              timeout={ANIMATION_TIME}
              classNames={{
                enter: css(animations.enter),
                enterActive: css(animations.enterActive),
                exit: css(animations.exit),
                exitActive: css(animations.exitActive),
              }}
              onEnter={() => {
                this.setState({
                  isAnimating: true,
                });
              }}
              onEntered={() => {
                this.setState({
                  isAnimating: false,
                });
              }}
              onExit={() => {
                this.setState({
                  isAnimating: true,
                });
              }}
              onExited={() => {
                this.setState({
                  currentScrollingIndex: currentItemIndex,
                  highlightedItem: undefined,
                  isAnimating: false,
                });
              }}
            >
              <div css={styles.dropdownItems}>
                {search && (
                  <div css={styles.searchContainer}>
                    <input
                      ref={ref => (this.search = ref)}
                      css={styles.search}
                      tabIndex={-1}
                      contentEditable
                      placeholder={searchPlaceholder}
                      value={searchValue}
                      onChange={this.handleSearchChange}
                    />
                    <i
                      css={styles.searchClear}
                      className={searchValue ? 'active' : ''}
                      onClick={() => {
                        this.setState({
                          searchValue: '',
                        });
                      }}
                    >
                      <Icon
                        name={EIconName.Cross}
                        width="12px"
                        height="12px"
                        color={'rgb(var(--TEXT_FADED))'}
                      />
                    </i>
                  </div>
                )}

                <VirtualList<IDropdownItemIndexed<T>>
                  dataList={itemsArray}
                  height={height}
                  width="100%"
                  scrollToIndex={currentScrollingIndex}
                  itemHeight={rowHeightCalculated}
                  renderRow={(index, itemData) => {
                    return (
                      <div
                        css={styles.itemRow}
                        className={
                          (currentItemIndex === index ? 'selected' : '') +
                          (highlightedItemIndex === index ? ' highlighted' : '')
                        }
                        onClick={() => {
                          if (!itemData.disabled) {
                            this.close(false);
                            this.handleChange(itemData);
                          }
                        }}
                        key={index}
                      >
                        {this.renderItem(itemData)}
                      </div>
                    );
                  }}
                />
              </div>
            </CSSTransition>
          )}
        </ClassNames>
      </div>
    );
  }

  renderItemPreContent(item: IDropdownItemIndexed<T>) {
    if (this.props.renderItemPreContent) {
      return this.props.renderItemPreContent(item);
    } else {
      return null;
    }
  }

  renderItemPostContent(item: IDropdownItemIndexed<T>) {
    if (this.props.renderItemPostContent) {
      return this.props.renderItemPostContent(item);
    } else {
      return null;
    }
  }

  renderItem(item: IDropdownItemIndexed<T>) {
    const content = this.props.renderItemContent ? (
      this.props.renderItemContent(item)
    ) : (
      <div css={styles.itemContent}>{item.title}</div>
    );

    const rowHeight = getCssVariableNumber(
      // @todo: OPTIMIZE!!!
      this.getSizeVarName(this.props.size),
    );

    return (
      <div
        css={[
          styles.item,
          item.disabled ? styles.itemDisabled : null,
          css`
            height: ${rowHeight}px;
          `,
        ]}
      >
        {this.renderItemPreContent(item)}
        {content}
        {this.renderItemPostContent(item)}
      </div>
    );
  }

  render() {
    const { name, tabIndex } = this.props;
    const { showErrors } = this.state;

    return (
      <FormContext.Consumer>
        {(context: IFormContext) => {
          if (!this.formContext) {
            this.formContext = context;
          }

          const errors = context.getFieldErrors(name);

          return (
            <div
              ref={ref => (this.root = ref)}
              id={name}
              css={styles.root}
              tabIndex={tabIndex || 0}
              onFocus={this.handleFocus}
              onBlur={this.handleBlur}
              onKeyDown={this.handleKeydown}
              onKeyPress={this.handleKeyPress}
            >
              {errors.length > 0 && (
                <InputErrors
                  show={showErrors}
                  errors={errors}
                  onDissmiss={() => {
                    context.clearFieldValidation(name);
                  }}
                />
              )}

              {this.current}
              {this.dropdown}
            </div>
          );
        }}
      </FormContext.Consumer>
    );
  }

  deleteFastSearchSymbol() {
    if (this.fastSearchTimeout) {
      clearTimeout(this.fastSearchTimeout);
    }

    this.setState({
      fastSearchValue: this.state.fastSearchValue.substr(
        0,
        this.state.fastSearchValue.length - 2,
      ),
    });

    this.fastSearchTimeout = setTimeout(() => {
      this.setState({
        fastSearchValue: '',
      });
    }, FAST_SEARCH_TIMEOUT);
  }

  addFastSearchSymbol(symbol: string, select: boolean) {
    if (this.fastSearchTimeout) {
      clearTimeout(this.fastSearchTimeout);
    }

    const fastSearchValue = `${this.state.fastSearchValue}${symbol}`.trim();

    if (!fastSearchValue) {
      return;
    }

    this.fastSearchTimeout = setTimeout(() => {
      this.setState({
        fastSearchValue: '',
      });
    }, FAST_SEARCH_TIMEOUT);

    this.setState(
      {
        fastSearchValue,
      },
      () => {
        const { fastSearchValue } = this.state;
        let foundItem = this.searchItem(fastSearchValue);

        if (foundItem) {
          this.handleHighlight(foundItem);

          this.setState({
            currentScrollingIndex: foundItem.index,
          });

          if (select) {
            this.handleChange(foundItem);
          }
        }
      },
    );
  }

  searchItem(value: string): IDropdownItemIndexed<T> | undefined {
    let foundItem: IDropdownItemIndexed<T> | undefined;

    this.state.mappedItems.forEach(item => {
      if (
        item.title.substr(0, value.length).toLowerCase() === value.toLowerCase()
      ) {
        if (!foundItem) {
          foundItem = item;
        }
      }
    });

    return foundItem;
  }

  setContextValue() {
    if (this.formContext) {
      let value: string | undefined = undefined;

      if (this.state.currentItem) {
        value = this.state.currentItem.value;
      }

      this.formContext.setModelFieldValue(
        this.props.name,
        value,
        this.state.currentItem,
      );
    }
  }

  handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    this.setState({
      searchValue: value,
    });

    let foundItem = this.searchItem(value);

    if (foundItem) {
      this.handleHighlight(foundItem);
      this.setState({
        currentScrollingIndex: foundItem.index,
      });
    }
  };

  handleHighlight = (highlightedItem: IDropdownItemIndexed<T> | undefined) => {
    this.setState({
      highlightedItem,
    });
  };

  handleKeyPress = (event: React.KeyboardEvent) => {
    if (!this.state.isFocused) {
      return;
    }

    if (this.props.search && this.state.isOpened) {
    } else {
      const charTyped = String.fromCharCode(event.which);

      if (charTyped && this.state.isOpened) {
        this.addFastSearchSymbol(charTyped, false);
      } else if (charTyped && !this.state.isOpened) {
        this.addFastSearchSymbol(charTyped, true);
      }
    }
  };

  handleKeydown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const {
      isOpened,
      currentItem,
      highlightedItem,
      mappedItems,
      searchValue,
    } = this.state;
    const interactableItem = highlightedItem || currentItem;

    switch (event.keyCode) {
      // Space
      case 32: {
        if (searchValue) {
          return false;
        }

        if (!isOpened) {
          this.open();
          this.handleHighlight(
            currentItem || mappedItems.values().next().value,
          );
        } else {
          this.close(true);
        }

        break;
      }

      // Up
      case 38: {
        if (isOpened && interactableItem) {
          this.handleHighlight(this.getPrevItem(interactableItem));
          event.stopPropagation();
          event.preventDefault();

          if (interactableItem.index - 1 >= 0) {
            this.setState({
              currentScrollingIndex: interactableItem.index - 1,
            });
          }
        } else {
          this.open();
          this.handleHighlight(
            currentItem || mappedItems.values().next().value,
          );
        }

        break;
      }

      // Down
      case 40: {
        if (isOpened && interactableItem) {
          this.handleHighlight(this.getNextItem(interactableItem));
          event.stopPropagation();
          event.preventDefault();

          if (interactableItem.index + 1 < this.state.mappedItems.size) {
            this.setState({
              currentScrollingIndex: interactableItem.index + 1,
            });
          }
        } else {
          this.open();
          this.handleHighlight(
            currentItem || mappedItems.values().next().value,
          );
        }

        break;
      }

      // Backspace
      case 8: {
        if (searchValue) {
          return false;
        }

        this.deleteFastSearchSymbol();
        break;
      }

      // Enter
      case 13: {
        if (isOpened) {
          if (highlightedItem) {
            if (highlightedItem.disabled) {
              return;
            }

            this.handleChange(highlightedItem);
          }

          this.close(true);
        } else {
          // TODO: Mybe this is not correct
          this.open();
          this.handleHighlight(
            currentItem || mappedItems.values().next().value,
          );
        }

        break;
      }
    }
  };

  handleMouseEnter = () => {
    this.setState({
      showErrors: true,
    });
  };

  handleMouseLeave = () => {
    this.setState({
      showErrors: false,
    });
  };

  handleFocus = () => {
    this.setState({
      isFocused: true,
    });

    if (this.formContext) {
      this.formContext.clearFieldValidation(this.props.name);
    }
  };

  handleBlur = () => {
    this.setState({
      isFocused: false,
    });

    if (this.isMouseDown) {
      return;
    }

    this.close(false);
  };

  handleOutsideClick = () => {
    if (this.isMouseDown) {
      return;
    }

    this.close(false);
  };

  open = () => {
    if (this.props.loading) {
      return;
    }

    this.setState({
      isOpened: true,
    });

    if (this.dropdownRoot) {
      this.dropdownRoot.focus();
    }

    document.addEventListener('mousedown', this.handleOutsideClick, false);
  };

  close = (isFocused: boolean) => {
    this.setState({
      isOpened: false,
      isAnimating: true,
      isFocused,
      searchValue: '',
    });
    if (isFocused && this.root) {
      this.root.focus();
    }
    document.removeEventListener('mousedown', this.handleOutsideClick, false);
  };

  mouseDownHandler = (event: React.MouseEvent<HTMLDivElement>) => {
    if (this.state.isOpened) {
      this.close(false);
    } else {
      if (this.props.loading) {
        event.preventDefault();
        event.stopPropagation();
        return;
      }

      this.open();
    }
  };

  dropdownRootMouseDownHandler = () => {
    this.isMouseDown = true;
  };

  dropdownRootMouseUpHandler = () => {
    this.isMouseDown = false;
  };

  componentDidMount() {
    const currentItem = this.getItemByValue(this.props.value);

    this.setState(
      {
        currentItem,
        rowHeightCalculated: this.root ? this.root.clientHeight : 0,
      },
      () => {
        this.setContextValue();
      },
    );

    if (currentItem) {
      this.setState({
        currentScrollingIndex: currentItem.index,
      });
    }

    if (this.formContext && this.props.validator) {
      this.formContext.setModelFieldValidator(this.props.name, [
        this.props.validator,
      ]);
    }
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleOutsideClick, false);

    if (this.fastSearchTimeout) {
      clearTimeout(this.fastSearchTimeout);
    }
  }

  componentDidUpdate(prevProps: IProps<T>) {
    if (
      prevProps.items !== this.props.items ||
      prevProps.value !== this.props.value
    ) {
      this.setState(
        {
          mappedItems: this.mapItems(this.props.items),
        },
        () => {
          if (this.props.value !== prevProps.value) {
            const currentItem = this.getItemByValue(this.props.value);

            this.setState(
              {
                currentItem,
              },
              () => {
                this.setContextValue();
              },
            );

            if (
              !this.state.isOpened &&
              !this.state.isAnimating &&
              currentItem
            ) {
              this.setState({
                currentScrollingIndex: currentItem.index,
              });
            }
          }
        },
      );
    }
  }

  getItemByValue(
    value: string | undefined,
  ): IDropdownItemIndexed<T> | undefined {
    if (value !== undefined) {
      return this.state.mappedItems.get(value);
    } else {
      return undefined;
    }
  }

  handleChange(item: IDropdownItemIndexed<T>) {
    if (item.disabled) {
      return;
    }

    this.setState(
      {
        currentItem: item,
      },
      () => {
        this.setContextValue();
      },
    );

    this.props.onSelect(item ? item : undefined);
  }

  getPrevItem(item: IDropdownItemIndexed<T>): IDropdownItemIndexed<T> {
    const itemsArray = Array.from(this.state.mappedItems.values());
    const nextItem = itemsArray[item.index - 1];

    if (nextItem) {
      return nextItem;
    }

    return item;
  }

  getNextItem(item: IDropdownItemIndexed<T>): IDropdownItemIndexed<T> {
    const itemsArray = Array.from(this.state.mappedItems.values());
    const nextItem = itemsArray[item.index + 1];

    if (nextItem) {
      return nextItem;
    }

    return item;
  }

  mapItems(items: IDropdownItem<T>[]): Map<string, IDropdownItemIndexed<T>> {
    const map = new Map<string, IDropdownItemIndexed<T>>();

    items.forEach((item, index) => {
      map.set(item.value, {
        ...item,
        index,
      });
    });

    return map;
  }
}

const styles = {
  root: css`
    display: flex;
    flex-grow: 1;
    position: relative;
    outline: none;
    user-select: none;
  `,

  arrow: css`
    position: absolute;
    right: var(--INPUT_SIDE_PADDING);
    top: calc(50% - 5px);
    pointer-events: none;
    transform: rotateX(0);
    transition: transform ${ANIMATION_TIME}ms;

    &.active {
      transform: rotateX(180deg);
    }
  `,

  search: css`
    padding: 8px var(--INPUT_SIDE_PADDING);
    flex-grow: 1;
    font-family: var(--FONT_FAMILY);
    font-size: 14px;
    color: rgb(var(--TEXT_ACCENT));
    border: none;
    background-color: transparent;
    outline: none;
    -webkit-appearance: none;
    box-sizing: border-box;
    display: flex;
  `,

  searchContainer: css`
    display: flex;
    border-bottom: 1px solid rgb(var(--INPUT_BORDER_ACCENT));
    background-color: rgb(var(--INPUT_BG));
    align-items: center;
  `,

  searchClear: css`
    width: 23px;
    height: 20px;
    flex-shrink: 0;
    margin-right: 0;
    transform-origin: 25%;
    transition: transform 0.2s, opacity 0.2s;
    opacity: 0;
    transform: scale(0);
    cursor: pointer;
    justify-content: center;
    align-items: center;

    &.active {
      opacity: 0.75;
      transform: scale(1);

      &:hover {
        opacity: 1;
      }
    }
  `,

  itemRow: css`
    &.selected {
      background-color: rgb(var(--INPUT_BG_ACTIVE));
    }

    &:hover,
    &.highlighted {
      background-color: rgb(var(--INPUT_BG_ACCENT));
    }
  `,

  item: css`
    flex-grow: 1;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 0 var(--INPUT_SIDE_PADDING);
    color: rgb(var(--TEXT_ACCENT));
    cursor: pointer;
    width: 100%;
    max-width: 100%;
    box-sizing: border-box;
  `,

  itemDisabled: css`
    opacity: 0.33;
    pointer-events: none;
  `,

  loading: css`
    flex-grow: 0;
    flex-shrink: 0;
    margin-right: 8px;
  `,

  placeholder: css`
    flex-shrink: 1;
    justify-content: flex-start;
    align-items: center;
    margin: 0 var(--INPUT_SIDE_PADDING);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    display: flex;
    color: rgb(var(--TEXT_FADED));
  `,

  itemContent: css`
    display: block;
    flex-grow: 1;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  `,

  dropdownRoot: css`
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    z-index: 100;
  `,

  dropdownItems: css`
    background-color: rgb(var(--INPUT_BG));
    border: 1px solid rgb(var(--INPUT_BORDER_ACCENT));
    box-sizing: border-box;
    border-top: none;
    box-shadow: var(--ELEVATION_SHADOW_3);
    border-radius: 0 0 var(--BORDER_RADIUS_SMALL) var(--BORDER_RADIUS_SMALL);
    overflow: hidden;
    outline: none;
  `,

  currentRoot: css`
    display: flex;
    flex-grow: 1;
    padding-right: 24px;
    flex: auto;
    align-items: center;
    background-color: rgb(var(--INPUT_BG));
    border: 1px solid rgb(var(--ELEMENT_BORDER));
    border-radius: var(--BORDER_RADIUS_SMALL);
    box-sizing: border-box;
    width: 100%;
    cursor: pointer;
    transition: border-color 0.2s, border-radius ${ANIMATION_TIME}ms;

    &:hover {
      border-color: rgb(var(--INPUT_BORDER_ACCENT));
    }

    &.focused {
      border-color: rgb(var(--INPUT_BORDER_ACTIVE));
    }

    &.opened {
      border-color: rgb(var(--INPUT_BORDER_ACCENT));
      border-radius: var(--BORDER_RADIUS_SMALL) var(--BORDER_RADIUS_SMALL) 0 0;
    }

    &.error {
      border-color: rgb(var(--INPUT_BORDER_ERROR));
    }
  `,
};

const animations = {
  enter: css`
    opacity: 0;
  `,
  enterActive: css`
    opacity: 1;
    transition-duration: ${ANIMATION_TIME}ms;
  `,
  exit: css`
    opacity: 1;
  `,
  exitActive: css`
    opacity: 0;
    transition-duration: ${ANIMATION_TIME}ms;
  `,
};
