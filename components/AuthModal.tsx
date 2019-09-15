import { ModalContainer, Modal, Card, Button, Form, Input } from '../ui/module';
import { CONFIG } from '../config';
import { authStore } from '../stores/authStore';
import { useStore } from 'react-stores';
import { authRegister, IRegisterFormModel } from '../managers/authManager';

interface IProps {}

export const AuthModal: React.FC<IProps> = () => {
  const authStoreState = useStore(authStore, {
    deps: ['authModal'],
  });

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
            <Form<IRegisterFormModel> onSubmit={authRegister}>
              <Input name="email" />
              <Input name="password" />
              <Button color="default" type="submit">
                Send
              </Button>
            </Form>
          </Card>
        </Modal>
      )}
    </ModalContainer>
  );
};
