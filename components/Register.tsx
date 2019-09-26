/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { Button, Form, Input, Row } from '../ui/module';
import { useState } from 'react';
import { ApiAuth, IApiAuthRegisterModel } from '../apis/ApiAuth';

export const Register = () => {
  const [formLoading, setFormLoading] = useState(false);
  const submitForm = async (model: IApiAuthRegisterModel) => {
    setFormLoading(true);
    await ApiAuth.register(model);
    setFormLoading(false);
  };

  return (
    <div css={styles.root}>
      <Form<IApiAuthRegisterModel> onSubmit={submitForm}>
        <Row>
          <Input placeholder="Email" name="email" />
        </Row>
        <Row>
          <Input placeholder="Password" name="password" />
        </Row>
        <Button color="default" type="submit" loading={formLoading}>
          Register
        </Button>
      </Form>
    </div>
  );
};

const styles = {
  root: css`
    min-width: 300px;
  `,
};
