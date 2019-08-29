/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import React, { ChangeEvent } from 'react';
import { Label } from '../typographics/Label';
import { Icon, EIconName } from '../icons/icons';
import { FormContext, IFormContext } from './Form';
import { InputErrors } from './InputErrors';
import { FormValidatorChecked } from './validators/FormValidator';

interface IProps {
  name: string;
  label: string | React.ReactNode;
  value: boolean;
  tabIndex?: number;
  type?: 'checkbox' | 'toggler';
  validator?: FormValidatorChecked;
  disabled?: boolean;
  activeColor?: string;
  inactiveColor?: string;
  onChange?: (value: boolean) => void;
}

interface IState {
  currentValue: boolean;
  isFocusMarked: boolean;
  showErrors: boolean;
}

export class Checkbox extends React.Component<IProps, IState> {
  static defaultProps = {
    type: 'checkbox',
    validator: null,
    tabIndex: 1,
    disabled: false,
    onChange: () => {},
  };

  state: IState = {
    currentValue: false,
    isFocusMarked: false,
    showErrors: false,
  };

  formContext: IFormContext | null = null;
  input: HTMLInputElement | null = null;

  componentDidMount() {
    this.setValue(this.props.value);

    if (this.formContext && this.props.validator) {
      this.formContext.setModelFieldValidator(this.props.name, [
        this.props.validator,
      ]);
    }
  }

  componentDidUpdate(prevProps: IProps) {
    if (prevProps.value !== this.props.value) {
      this.setValue(this.props.value);
    }
  }

  setValue(value: boolean) {
    this.setState({
      currentValue: value,
    });

    if (this.formContext) {
      this.formContext.setModelFieldValue(
        this.props.name,
        value.toString(),
        value,
      );
    }
  }

  render() {
    const { currentValue, isFocusMarked, showErrors } = this.state;
    const { label, type, tabIndex, disabled } = this.props;

    return (
      <FormContext.Consumer>
        {context => {
          if (!this.formContext) {
            this.formContext = context;
          }

          const errors = context.getFieldErrors(this.props.name);

          return (
            <div css={styles.root}>
              {errors.length > 0 && (
                <InputErrors
                  offsetLeft={type === 'checkbox' ? -9.5 : 0}
                  show={showErrors}
                  errors={errors}
                  onDissmiss={() => {
                    context.clearFieldValidation(this.props.name);
                  }}
                />
              )}

              <Label css={styles.label}>
                <span
                  onMouseEnter={this.handleMouseEnter}
                  onMouseLeave={this.handleMouseLeave}
                  css={styles.types[type || 'checkbox']}
                  className={`${currentValue ? 'active' : ''} ${
                    isFocusMarked ? 'focused' : ''
                  } ${errors.length > 0 ? 'error' : ''} ${
                    disabled ? 'disabled' : ''
                  }`}
                >
                  <i>
                    <Icon
                      name={EIconName.Success}
                      width="11px"
                      height="11px"
                      color={'rgb(var(--BUTTON_TEXT))'}
                    />
                  </i>
                </span>
                <input
                  disabled={disabled}
                  tabIndex={tabIndex}
                  ref={ref => (this.input = ref)}
                  onKeyUp={this.handleKeyUp}
                  checked={currentValue}
                  onChange={this.handleChange}
                  onFocus={this.hadleFocus}
                  onBlur={this.handleBlur}
                  css={styles.input}
                  type="checkbox"
                />
                {label}
              </Label>
            </div>
          );
        }}
      </FormContext.Consumer>
    );
  }

  handleKeyUp = () => {
    this.setState({
      isFocusMarked: true,
    });
  };

  handleBlur = () => {
    this.setState({
      isFocusMarked: false,
    });
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

  hadleFocus = () => {
    if (this.formContext) {
      this.formContext.clearFieldValidation(this.props.name);
    }
  };

  handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setValue(event.target.checked);

    if (this.formContext) {
      this.formContext.clearFieldValidation(this.props.name);
    }

    if (this.props.onChange) {
      this.props.onChange(event.target.checked);
    }
  };
}

const styles = {
  root: css`
    position: relative;
    display: flex;
  `,

  input: css`
    opacity: 0;
    z-index: -1;
    line-height: 0;
    display: inline;
    position: absolute;
  `,

  label: css`
    margin-bottom: 0;
    display: inline-flex;
    align-items: center;
  `,

  types: {
    checkbox: css`
      width: 17px;
      min-width: 17px;
      height: 17px;
      min-height: 17px;
      flex-shrink: 0;
      border-radius: var(--BORDER_RADIUS_TINY);
      background-color: rgb(var(--INPUT_BG));
      border: 1px solid rgb(var(--ELEMENT_BORDER));
      box-sizing: border-box;
      top: -1px;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: border-color 0.2s, box-shadow 0.2s;
      margin-right: 1.25ex;
      cursor: pointer;
      position: relative;
      box-shadow: 0 0 0 0 rgba(var(--BUTTON_DEFAULT), 0),
        0 0 10px rgba(var(--INPUT_BORDER_ACCENT), 0);

      > i {
        position: relative;
        top: 2px;
        transition: opacity 0.2s, transform 0.2s;
        transform: scale(0);
        opacity: 0;
      }

      &:hover {
        border-color: rgb(var(--INPUT_BORDER_ACCENT));
      }

      &.active {
        > i {
          transform: scale(1);
          opacity: 1;
        }

        background-color: rgb(var(--INPUT_BORDER_ACTIVE));
        border-color: rgb(var(--INPUT_BORDER_ACTIVE));
        box-shadow: 0 0 0 0 rgba(var(--BUTTON_DEFAULT), 0),
          0 0 10px rgba(var(--INPUT_BORDER_ACTIVE), 0.5);

        &:hover {
          border-color: rgb(var(--INPUT_BORDER_ACTIVE));
        }
      }

      &.focused {
        box-shadow: 0 0 0 3px rgba(var(--BUTTON_DEFAULT), 0.33);

        &.active {
          box-shadow: 0 0 0 3px rgba(var(--BUTTON_DEFAULT), 0.33),
            0 0 10px rgba(var(--INPUT_BORDER_ACTIVE), 0.5);
        }
      }

      &.error {
        border-color: rgb(var(--INPUT_BORDER_ERROR));
      }

      &.disabled {
        opacity: 0.5;
        cursor: default;
        border-color: rgb(var(--ELEMENT_BORDER));
      }
    `,

    toggler: css`
      width: 46px;
      min-width: 46px;
      height: 23px;
      min-height: 23px;
      flex-shrink: 0;
      border-radius: 20px;
      margin-right: 10px;
      border: 1px solid rgb(var(--ELEMENT_BORDER));
      background-color: rgb(var(--INPUT_BG));
      position: relative;
      box-sizing: border-box;
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: border-color 0.2s, box-shadow 0.2s;

      &:before {
        content: '';
        transition: transform 0.2s, background-color 0.2s, box-shadow 0.2s;
        width: 17px;
        height: 17px;
        display: block;
        border-radius: 100%;
        top: 2px;
        left: 2px;
        transform: translateX(0);
        box-shadow: 0 0 10px rgba(var(--INPUT_BORDER_ACCENT), 0);
        background-color: rgb(var(--ELEMENT_BORDER));
        position: absolute;
      }

      > i {
        display: none;
      }

      &.focused {
        box-shadow: 0 0 0 3px rgba(var(--BUTTON_DEFAULT), 0.33);

        &.active {
          box-shadow: 0 0 0 3px rgba(var(--BUTTON_DEFAULT), 0.33);
        }
      }

      &:hover {
        border-color: rgb(var(--INPUT_BORDER_ACCENT));

        &:before {
          background-color: rgb(var(--INPUT_BORDER_ACCENT));
        }
      }

      &.active {
        &:before {
          transform: translateX(23px);
          background-color: rgb(var(--INPUT_BORDER_ACTIVE));
          box-shadow: 0 0 10px rgba(var(--INPUT_BORDER_ACTIVE), 0.5);
        }
      }

      &.error {
        border-color: rgb(var(--INPUT_BORDER_ERROR));
      }

      &.disabled {
        opacity: 0.5;
        cursor: default;
        pointer-events: none;
      }
    `,
  },
};
