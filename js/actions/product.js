import axios from 'axios';
import { API_URL } from '../config';
import { GETALLPRODUCT } from './type';

export const getAllProduct = token => dispatch => {
  return axios
    .get(`${API_URL}products/user-product`, {
      headers: { 'x-access-token': token }
    })
    .then(response => {
      console.log(response.data);
      dispatch({ type: GETALLPRODUCT, payload: response.data });
      return { data: response.data, resp: true };
    })
    .catch(err => {
      console.log(err);
      return { resp: false };
    });
};
