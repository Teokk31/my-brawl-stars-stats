import axios from './helper';

export const getPlayer = playerTag => {
  return axios.get(`v1/players/%23${playerTag}`);
};

export const getBattleLog = playerTag => {
  return axios.get(`v1/players/%23${playerTag}/battlelog`);
};
