import axios from 'axios';

const token = process.env.REACT_APP_BRAWL_STARS_API_KEY;

axios.defaults.headers.common = {
  Accept: 'application/json',
  Authorization: `Bearer ${token}`
};
export default axios;
