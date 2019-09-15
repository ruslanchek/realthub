import { Store } from 'react-stores';

interface IAuthStore {
  authorized: boolean;
  authModal: boolean;
}

export const authStore = new Store<IAuthStore>({
  authorized: false,
  authModal: false,
});
