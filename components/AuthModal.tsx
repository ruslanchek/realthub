/** @jsx jsx */
import { jsx } from '@emotion/core';
import { ModalContainer, Modal, Tabs, TabsContent, Card } from '../ui/module';
import { CONFIG } from '../common/constants';
import { Register } from './Register';
import { Login } from './Login';
import { authStore } from '../stores/authStore';
import { useStore } from 'react-stores';

interface IProps {}

const ModalContent = () => {
  return (
    <Card>
      <Tabs
        tabs={[
          {
            title: 'Register',
          },
          {
            title: 'Login',
          },
        ]}
      >
        <TabsContent
          content={[
            {
              component: <Register />,
            },
            {
              component: <Login />,
            },
          ]}
        />
      </Tabs>
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
