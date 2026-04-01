// src/config/api.js
const MOCK_URL = "https://bf3a92df-dc7a-441c-80dc-11ae4bb35595.mock.pstmn.io";
const DEV_URL = "http://@Ip:3000"; // error 
const PROD_URL = "https://api.myapp.com";

const ENV = "dev"; // "mock" | "dev" | "prod"

const URLS = {
  mock: MOCK_URL,
  dev: DEV_URL,
  prod: PROD_URL,
};

export const API_BASE_URL = URLS[ENV];