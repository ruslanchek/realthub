import axios from 'axios';

const REGISTER_URL = `${process.env.API_URL}/auth/register`;

export interface IRegisterFormModel {
  email: string;
  password: string;
}

export const authRegister = async (model: IRegisterFormModel) => {
  const result = await axios.post(REGISTER_URL, model);

  console.log(result);
};
