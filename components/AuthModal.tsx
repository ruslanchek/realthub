/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import {
  ModalContainer,
  Modal,
  Card,
  Button,
  Form,
  Input,
  Row,
} from '../ui/module';
import { useState } from 'react';
import { CONFIG } from '../config';
import { authStore } from '../stores/authStore';
import { useStore } from 'react-stores';
import { authRegister, IRegisterFormModel } from '../managers/authManager';

interface IProps {}

export const AuthModal: React.FC<IProps> = () => {
  const [formLoading, setFormLoading] = useState(false);
  const authStoreState = useStore(authStore, {
    deps: ['authModal'],
  });

  const submitForm = async (model: IRegisterFormModel) => {
    setFormLoading(true);
    await authRegister(model);
    setFormLoading(false);
  };

  return (
    <ModalContainer rootContainerSelector={`#${CONFIG.MODALS_PORTAL_ROOT_ID}`}>
      {authStoreState.authModal && (
        <Modal
          showOverlay
          closeByOutsideClick
          closeByEscapeKey
          onWillOpen={() => {}}
          onDidOpen={() => {}}
          onWillClose={() => {}}
          onDidClose={() => {
            authStore.setState({
              authModal: false,
            });
          }}
        >
          <Card>
            <div css={styles.a}></div>
            <Form<IRegisterFormModel> onSubmit={submitForm}>
              <Row>{formLoading && <Input name="email" />}</Row>
              <Row>
                <Input name="password" />
              </Row>
              <Button color="default" type="submit" loading={formLoading}>
                Send
              </Button>
            </Form>
          </Card>
        </Modal>
      )}
    </ModalContainer>
  );
};

const styles = {
  a: css``,
};
