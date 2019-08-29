import React, { FormEvent } from 'react';
import { FormValidator } from './validators/FormValidator';

interface IProps<T, D> {
  onChange?: (model: T, modelData: D) => void;
  onSubmit?: (
    model: T,
    modelData: D,
    errors: { [key: string]: string[] },
    isValid: boolean | undefined,
  ) => void;
}

interface IState {
  model: Map<string, string | undefined>;
  data: Map<string, any>;
  errors: Map<string, string[]>;
  validators: Map<string, FormValidator[]>;
  isValid: boolean | undefined;
}

export interface IFormContext {
  setModelFieldValue: (
    name: string,
    value: string | undefined,
    dataValue: any,
  ) => void;

  setModelFieldValidator: (
    name: string,
    inputValidators: FormValidator[],
  ) => void;

  clearFieldValidation: (name: string) => void;

  getFieldErrors: (name: string) => string[];
}

export const FormContext = React.createContext<IFormContext>({
  setModelFieldValue: () => {},
  setModelFieldValidator: () => {},
  clearFieldValidation: () => {},
  getFieldErrors: () => [],
});

export class Form<T = any, D = any> extends React.Component<
  IProps<T, D>,
  IState
> {
  state = {
    model: new Map<string, string | undefined>(),
    data: new Map<string, any>(),
    errors: new Map<string, string[]>(),
    validators: new Map<string, FormValidator[]>(),
    isValid: undefined,
  };

  setModelFieldValue = (
    name: string,
    value: string | undefined,
    dataValue: any,
  ) => {
    const { model, data } = this.state;

    model.set(name, value);
    data.set(name, dataValue);

    this.setState(
      {
        model,
        data,
      },
      () => {
        if (this.props.onChange) {
          this.props.onChange(
            (this.mapToObject<T>(model) as unknown) as T,
            (this.mapToObject<D>(data) as unknown) as D,
          );
        }
      },
    );
  };

  mapToObject<T>(map: Map<any, any>): { [key: string]: T } {
    const object: { [key: string]: T } = {};

    map.forEach((value, key) => {
      object[key] = value;
    });

    return object;
  }

  handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const isValid = await this.validate();

    if (this.props.onSubmit) {
      this.props.onSubmit(
        (this.mapToObject<T>(this.state.model) as unknown) as T,
        (this.mapToObject<D>(this.state.data) as unknown) as D,
        (this.mapToObject<{ [key: string]: string[] }>(
          this.state.errors,
        ) as unknown) as {
          [key: string]: string[];
        },
        isValid,
      );
    }
  };

  setModelFieldValidator = (name: string, inputValidators: FormValidator[]) => {
    inputValidators.forEach(validator => {
      validator.modelGetter = () => {
        return this.mapToObject(this.state.model);
      };
    });

    this.state.validators.set(name, inputValidators);
  };

  clearFieldValidation = (name: string) => {
    const validators = this.state.validators.get(name);

    if (validators) {
      validators.forEach(validator => {
        validator.clear();
      });
    }

    this.state.errors.set(name, []);

    this.setState({
      validators: this.state.validators,
      errors: this.state.errors,
    });
  };

  getFieldErrors = (name: string) => {
    const errors = this.state.errors.get(name);

    if (errors) {
      return errors;
    } else {
      return [];
    }
  };

  validate(): Promise<boolean> {
    return new Promise(resolve => {
      let errors = new Map<string, string[]>();
      let isValid: boolean = true;

      this.state.validators.forEach((validators, fieldName) => {
        validators.forEach(validator => {
          const result = validator.validate(this.state.model.get(fieldName));
          const currentErrors = errors.get(fieldName);
          const error = result.isValid ? null : result.errorText;

          if (error) {
            isValid = false;

            if (currentErrors) {
              errors.set(fieldName, currentErrors.concat([error]));
            } else {
              errors.set(fieldName, [error]);
            }
          }
        });
      });

      this.setState(
        {
          errors,
          isValid,
        },
        () => {
          resolve(isValid);
        },
      );
    });
  }

  render() {
    return (
      <FormContext.Provider
        value={{
          setModelFieldValue: this.setModelFieldValue,
          setModelFieldValidator: this.setModelFieldValidator,
          clearFieldValidation: this.clearFieldValidation,
          getFieldErrors: this.getFieldErrors,
        }}
      >
        <form onSubmit={this.handleSubmit}>{this.props.children}</form>
      </FormContext.Provider>
    );
  }
}
