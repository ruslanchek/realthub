import { Store } from 'react-stores';

interface IStoreState {
  ready: boolean;
}

export const commonStore = new Store<IStoreState>({
  ready: false,
});
