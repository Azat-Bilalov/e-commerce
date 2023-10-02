import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:9000/api/',
  /** Не обрабатываем ошибки */
  validateStatus: () => true,
});

export default instance;
