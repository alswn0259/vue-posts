import axios from 'axios';

function create(baseURL, options) {
  const instance = axios.create(Object.assign({ baseURL }, options));
  return instance;
}

export const posts = create(`${import.meta.env.VITE_APP_API_URL}posts/`);
// development : http://localhost:3000/posts/
// production : http://localhost:3001/posts/

// console.log('MODE: ', import.meta.env.MODE);
// console.log('BASE_URL: ', import.meta.env.BASE_URL);
// console.log('PROD: ', import.meta.env.PROD);
// console.log('DEV: ', import.meta.env.DEV);
// console.log('SSR: ', import.meta.env.SSR);
// console.log('VITE_APP_API_URL: ', import.meta.env.VITE_APP_API_URL);

