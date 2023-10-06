import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:9000/api/',
  // baseURL: 'https://e-commerce.cry1s.ru/api/',
  /** Не обрабатываем ошибки */
  validateStatus: () => true,
});

export default instance;
