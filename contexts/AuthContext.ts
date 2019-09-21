import React from 'react';
import { IMe } from '../apis/authApi';

interface IAuthContext {
  me: IMe | undefined;
}

export const AuthContext = React.createContext<IAuthContext>({
  me: undefined,
});
