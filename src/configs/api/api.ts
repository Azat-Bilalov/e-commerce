import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://kts-store-api.glitch.me/api/',
});

export default instance;
