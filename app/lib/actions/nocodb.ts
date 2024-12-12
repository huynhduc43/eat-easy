import axios from 'axios';

const NC_BASE_URL = process.env.NC_BASE_URL;
const NC_API_TOKEN = process.env.NC_API_TOKEN;

export const USERS_TABLE_ID = process.env.NC_USERS_TABLE_ID;

const nocodb = axios.create({
  baseURL: NC_BASE_URL,
  headers: {
    'xc-token': NC_API_TOKEN,
  },
});

export default nocodb;
