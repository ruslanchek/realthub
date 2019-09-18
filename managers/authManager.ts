import axios from 'axios';

const REGISTER_URL = `${process.env.API_URL}/auth/register`;

export interface IRegisterFormModel {
  email: string;
  password: string;
}

export const authRegister = async (model: IRegisterFormModel) => {
  try {
    const response = await axios.post(REGISTER_URL, model);

    console.log(response);
  } catch (e) {
    console.log(e.response);
  }
};