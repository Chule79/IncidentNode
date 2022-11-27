import axios from 'axios';

import authHeader from './auth-header';
import authHeader from './auth.service';

const API_URL = 'https://incidentnode-back.onrender.com/api/v1/users';

export const getDepartments = () => {
  return axios.get(API_URL, authHeader)
}