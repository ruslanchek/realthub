/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { Card, Button, Form, Input, Row } from '../ui/module';
import { useState } from 'react';
import { ApiAuth, IApiAuthLoginModel } from '../apis/ApiAuth';

export const Login = () => {
  const [formLoading, setFormLoading] = useState(false);
  const submitForm = async (model: IApiAuthLoginModel) => {
    setFormLoading(true);
    await ApiAuth.login(model);
    setFormLoading(false);
  };

  return (
    <Card>
      Login
      <div css={styles.root}>
        <Form<IApiAuthLoginModel> onSubmit={submitForm}>
          <Row>
            <Input placeholder="Email" name="email" />
          </Row>
          <Row>
            <Input placeholder="Password" name="password" />
          </Row>
          <Button color="default" type="submit" loading={formLoading}>
            Login
          </Button>
        </Form>
      </div>
    </Card>
  );
};

const styles = {
  root: css`
    min-width: 300px;
  `,
};
