import axios from 'axios';
import { LOGIN_USER, REGISTER_USER, AUTH_USER } from './types';

export function loginUser(dataToSubmit) {
  const request = axios
    .post('/api/users/login', dataToSubmit)
    .then((response) => response.data); // 백엔드에서 넘어온 값 // { loginSuccess: true, userId: user._id }

  // action을 처리 후 reducer로 넘겨준다. {type, response}
  return {
    type: LOGIN_USER,
    payload: request,
  };
}

export function registerUser(dataToSubmit) {
  const request = axios
    .post('/api/users/register', dataToSubmit)
    .then((response) => response.data); // 백엔드에서 넘어온 값 // { loginSuccess: true, userId: user._id }

  // action을 처리 후 reducer로 넘겨준다. {type, response}
  return {
    type: REGISTER_USER,
    payload: request,
  };
}

export function auth() {
  const request = axios
    .get('/api/users/auth')
    .then((response) => response.data);

  // action을 처리 후 reducer로 넘겨준다. {type, response}
  return {
    type: AUTH_USER,
    payload: request,
  };
}
