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
import { IRegisterFormModel, authRegister } from '../apis/authApi';
import { authStore } from '../stores/authStore';
import { useStore } from 'react-stores';

interface IProps {}

const ModalContent = () => {
  const [formLoading, setFormLoading] = useState(false);
  const submitForm = async (model: IRegisterFormModel) => {
    setFormLoading(true);
    await authRegister(model);
    setFormLoading(false);
  };

  return (
    <Card>
      <div css={styles.root}>
        <Form<IRegisterFormModel> onSubmit={submitForm}>
          <Row>
            <Input placeholder="Email" name="email" />
          </Row>
          <Row>
            <Input placeholder="Password" name="password" />
          </Row>
          <Button color="default" type="submit" loading={formLoading}>
            Send
          </Button>
        </Form>
      </div>
    </Card>
  );
};

export const AuthModal: React.FC<IProps> = () => {
  const authStoreState = useStore(authStore);

  return (
    <ModalContainer rootContainerSelector={`#${CONFIG.MODALS_PORTAL_ROOT_ID}`}>
      {authStoreState.authModal && (
        <Modal
          showOverlay
          closeByOutsideClick
          closeByEscapeKey
          onWillOpen={() => {}}
          onDidOpen={() => {}}
          onWillClose={() => {
            authStore.setState({
              authModal: false,
            });
          }}
          onDidClose={() => {}}
        >
          <ModalContent />
        </Modal>
      )}
    </ModalContainer>
  );
};

const styles = {
  root: css`
    min-width: 300px;
  `,
};
