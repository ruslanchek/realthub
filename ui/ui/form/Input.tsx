/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import React, { ChangeEvent } from 'react';
import { FormContext, IFormContext } from './Form';
import { FormValidator } from './validators/FormValidator';
import { InputErrors } from './InputErrors';

interface IProps {
  name: string;
  value?: string;
  pattern?: string;
  placeholder?: string;
  readOnly?: boolean;
  disabled?: boolean;
  size?: 'small' | 'large';
  type?: 'password' | 'text';
  tabIndex?: number;
  autoComplete?: string;
  prefix?: string | React.ReactNode;
  suffix?: string | React.ReactNode;
  validators?: FormValidator[];
  onChange?: (value: string) => void;
}

interface IState {
  currentValue: string;
  showErrors: boolean;
}

export class Input extends React.Component<IProps, IState> {
  state = {
    currentValue: this.props.value || '',
    showErrors: false,
  };

  formContext: IFormContext | null = null;

  componentDidMount() {
    this.setValue(this.props.value || '');

    if (this.formContext) {
      this.formContext.setModelFieldValidator(
        this.props.name,
        this.props.validators || [],
      );
    }
  }

  componentDidUpdate(prevProps: IProps) {
    if (prevProps.value !== this.props.value) {
      this.setValue(this.props.value || '');
    }
  }

  setValue(value: string) {
    this.setState({
      currentValue: value,
    });

    if (this.formContext) {
      this.formContext.setModelFieldValue(this.props.name, value, value);
    }

    if (this.props.onChange) {
      this.props.onChange(value);
    }
  }

  render() {
    const {
      name,
      placeholder,
      size,
      type,
      readOnly,
      disabled,
      autoComplete,
      prefix,
      suffix,
      tabIndex,
      pattern,
    } = this.props;
    const { currentValue, showErrors } = this.state;

    return (
      <FormContext.Consumer>
        {context => {
          if (!this.formContext) {
            this.formContext = context;
          }

          const errors = context.getFieldErrors(this.props.name);

          return (
            <div css={styles.root}>
              {prefix && (
                <div css={[styles.prefix, styles.sizes[size || 'large']]}>
                  {prefix}
                </div>
              )}

              {errors.length > 0 && (
                <InputErrors
                  show={showErrors}
                  errors={errors}
                  onDissmiss={() => {
                    context.clearFieldValidation(this.props.name);
                  }}
                />
              )}

              <input
                pattern={pattern}
                readOnly={readOnly}
                disabled={disabled}
                placeholder={placeholder}
                onFocus={this.handleFocus}
                onMouseEnter={this.handleMouseEnter}
                onMouseLeave={this.handleMouseLeave}
                name={name}
                tabIndex={tabIndex}
                id={name}
                type={type}
                value={currentValue}
                autoComplete={autoComplete}
                className={errors.length > 0 ? 'error' : ''}
                css={[
                  styles.input,
                  styles.sizes[size || 'large'],
                  prefix ? styles.inputPrefix : null,
                  suffix ? styles.inputSuffix : null,
                  prefix && suffix ? styles.inputPrefixSuffix : null,
                ]}
                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                  console.log(pattern, event.target.validity.valid);

                  if (pattern && !event.target.validity.valid) {
                    return;
                  }

                  this.setValue(event.target.value);
                }}
              />

              {suffix && (
                <div css={[styles.suffix, styles.sizes[size || 'large']]}>
                  {suffix}
                </div>
              )}
            </div>
          );
        }}
      </FormContext.Consumer>
    );
  }

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
    if (this.formContext) {
      this.formContext.clearFieldValidation(this.props.name);
    }
  };
}

const styles = {
  root: css`
    width: 100%;
    position: relative;
    display: flex;
  `,

  prefix: css`
    border: 1px solid rgb(var(--INPUT_BORDER));
    border-right: none;
    box-sizing: border-box;
    padding: 0 var(--INPUT_SIDE_PADDING);
    background-color: rgb(var(--ELEMENT_BG_ACCENT));
    justify-content: center;
    align-items: center;
    display: flex;
    border-radius: var(--BORDER_RADIUS_SMALL) 0 0 var(--BORDER_RADIUS_SMALL);
    white-space: nowrap;
  `,

  suffix: css`
    border: 1px solid rgb(var(--INPUT_BORDER));
    border-left: none;
    box-sizing: border-box;
    padding: 0 var(--INPUT_SIDE_PADDING);
    background-color: rgb(var(--ELEMENT_BG_ACCENT));
    justify-content: center;
    align-items: center;
    display: flex;
    border-radius: 0 var(--BORDER_RADIUS_SMALL) var(--BORDER_RADIUS_SMALL) 0;
    white-space: nowrap;
  `,

  input: css`
    width: 100%;
    outline: none;
    -webkit-appearance: none;
    border: 1px solid rgb(var(--INPUT_BORDER));
    background-color: rgb(var(--INPUT_BG));
    border-radius: var(--BORDER_RADIUS_SMALL);
    color: rgb(var(--TEXT_ACCENT));
    font-family: var(--FONT_FAMILY);
    padding: 0 var(--INPUT_SIDE_PADDING);
    box-sizing: border-box;
    font-size: var(--FONT_SIZE_BASE);
    text-overflow: ellipsis;
    transition: border-color 0.2s;
    box-shadow: none; /* firefox fix for error highlighting */

    &:hover {
      border-color: rgb(var(--INPUT_BORDER_ACCENT));
    }

    &:focus {
      border-color: rgb(var(--INPUT_BORDER_ACTIVE));
    }

    &.error {
      border-color: rgb(var(--INPUT_BORDER_ERROR));
    }

    &:disabled {
      color: rgb(var(--TEXT));
      opacity: 0.5;
      pointer-events: none;
    }
  `,

  inputPrefix: css`
    border-radius: 0 var(--BORDER_RADIUS_SMALL) var(--BORDER_RADIUS_SMALL) 0;
  `,

  inputSuffix: css`
    border-radius: var(--BORDER_RADIUS_SMALL) 0 0 var(--BORDER_RADIUS_SMALL);
  `,

  inputPrefixSuffix: css`
    border-radius: 0;
  `,

  sizes: {
    small: css`
      height: var(--INPUT_HEIGHT_SMALL);
    `,

    large: css`
      height: var(--INPUT_HEIGHT_LARGE);
    `,
  },
};
