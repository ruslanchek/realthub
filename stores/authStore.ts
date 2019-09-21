import { Store } from 'react-stores';
import { IMe } from '../apis/authApi';

interface IStoreState {
  me: IMe | undefined;
  authModal: boolean;
}

export const authStore = new Store<IStoreState>({
  me: undefined,
  authModal: false,
});
