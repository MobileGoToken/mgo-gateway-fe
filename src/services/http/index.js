// @flow

import { API_URL } from 'src/constants';

import http from './http';

http.setConfig({
  baseURL: API_URL,
});

export default http;
