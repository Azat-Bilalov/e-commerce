import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://kts-store-api.glitch.me/api/',
  /** Не обрабатываем ошибки */
  validateStatus: () => true,
});

export default instance;
