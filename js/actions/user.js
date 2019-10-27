import axios from 'axios';
import { API_URL } from '../config';
import { USER_SIGN, DELETE_USER, USER_SIGNOUT, GETALL_USER } from './type';
export const signout = () => dispatch => {
  dispatch({ type: USER_SIGNOUT });
};
export const signin = data => dispatch => {
  console.log(data);
  return axios
    .post(`${API_URL}users/login`, {
      email: data.email,
      password: data.password
    })
    .then(response => {
      console.log(response);
      dispatch({ type: USER_SIGN, payload: response.data });
      return { resp: true, data: response.data.data };
    })
    .catch(err => {
      console.log(err);
      return { resp: false };
    });
};
export const addNewUser = data => dispatch => {
  console.log(data);
  return axios
    .post(
      `${API_URL}users/add-user`,
      {
        email: data.email,
        password: data.password
      },
      { headers: { 'x-access-token': data.token } }
    )
    .then(response => {
      console.log(response);
      return { resp: true };
    })
    .catch(err => {
      console.log(err);
      return { resp: false };
    });
};
export const getAllUser = data => dispatch => {
  return axios
    .get(`${API_URL}users/`, { headers: { 'x-access-token': data.data } })
    .then(response => {
      console.log(response);
      dispatch({ type: GETALL_USER, payload: response.data });
      return { resp: true };
    })
    .catch(err => {
      console.log(err);
      return { resp: false };
    });
};
export const deleteUser = data => dispatch => {
  console.log(data);
  return axios
    .delete(`${API_URL}users/delete-user/${data.id}`, {
      headers: { 'x-access-token': data.token }
    })
    .then(response => {
      console.log(response);
      dispatch({ type: DELETE_USER });
      return { resp: true };
    })
    .catch(err => {
      console.log(err);
      return { resp: false };
    });
};
export const updateUser = data => dispatch => {
  console.log('masuk sunu data');
  console.log(data);
  return axios
    .put(
      `${API_URL}users/update-user/${data.id}`,
      {
        name: data.name,
        password: data.password
      },
      {
        headers: { 'x-access-token': data.token }
      }
    )
    .then(response => {
      console.log(response);
      dispatch({ type: USER_SIGN, payload: response.data });
      return { resp: true };
    })
    .catch(err => {
      console.log(err);
      return { resp: false };
    });
};
