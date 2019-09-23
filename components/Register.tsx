/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { Card, Button, Form, Input, Row } from '../ui/module';
import { useState } from 'react';
import { IRegisterFormModel, authRegister } from '../apis/authApi';

export const Register = () => {
  const [formLoading, setFormLoading] = useState(false);
  const submitForm = async (model: IRegisterFormModel) => {
    setFormLoading(true);
    await authRegister(model);
    setFormLoading(false);
  };

  return (
    <Card>
      Register
      <div css={styles.root}>
        <Form<IRegisterFormModel> onSubmit={submitForm}>
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
    </Card>
  );
};

const styles = {
  root: css`
    min-width: 300px;
  `,
};
