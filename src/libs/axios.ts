import Axios from "axios";

const postToken =
  "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJpbnRlcm5hbCIsImxvZ2luVXNlciI6InN5c3RlbSIsImFwaVVzZXJSb2xlIjoiaW50ZXJuYWwiLCJleHAiOjE2ODgzNzk3MDEsImlhdCI6MTY4ODI5MzMwMX0.EFl1yo8RZlnf6MezMJgChCVHUpwY4WO47xBk6aj7SKh9IUeMuVcKZZQVcf5fn_H3gSGRYAWHW-l3fC4xpCpmQA";
const axios = Axios.create({
  baseURL: process.env.REACT_APP_BACKEND_BASE_URL,
  headers: {
    Authorization: `Bearer ${postToken}`,
  },
});

export default axios;
