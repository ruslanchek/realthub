import { Store } from 'react-stores';
import { IMe } from '../apis/authApi';

interface IStoreState {
  me: IMe | undefined;
}

export const authStore = new Store<IStoreState>({
  me: undefined,
});
