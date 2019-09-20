import { Store } from 'react-stores';
import { IMe } from '../meta/interfaces';

interface IAuthStore {
  authorized: boolean;
  authModal: boolean;
  me: IMe | null;
}

export const authStore = new Store<IAuthStore>({
  authorized: false,
  authModal: false,
  me: null,
});
