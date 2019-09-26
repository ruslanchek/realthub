import { Store } from 'react-stores';
import { IApiAuthMe } from '../apis/ApiAuth';

interface IStoreState {
  me: IApiAuthMe | undefined;
  authModal: boolean;
}

export const authStore = new Store<IStoreState>({
  me: undefined,
  authModal: false,
});
