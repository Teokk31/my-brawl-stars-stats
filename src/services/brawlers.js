import axios from './helper';

export const getBrawlers = () => {
  return axios.get(`v1/brawlers/`);
};

export const getBrawler = brawlerId => {
  return axios.get(`v1/brawlers/${brawlerId}`);
};
