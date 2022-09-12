import {create} from 'apisauce';
import {ApiSauceJson, ApiSauceJsonMulitpart} from './Config';
const ApiSauce = create(ApiSauceJson);
const ApiSauceMultiPart = create(ApiSauceJsonMulitpart);

export const request = (path, json) => {
  return new Promise((resolve, reject) => {
    ApiSauce.post(path, json).then(response => {
      if (response.ok) {
        resolve(response.data);
      } else {
        resolve({status: false, data: response.data, error: response?.problem});
      }
    });
  });
};
export const requestGet = (path, json) => {
  return new Promise((resolve, reject) => {
    ApiSauce.get(path, json).then(response => {
      if (response.ok) {
        resolve(response.data);
      } else {
        console.log(JSON.stringify(response, null, 2));
        resolve({status: false, error: response?.problem});
      }
    });
  });
};
export const requestMultipart = (path, form) => {
  return new Promise((resolve, reject) => {
    ApiSauceMultiPart.post(path, form).then(response => {
      if (response.ok) {
        resolve(response.data);
      } else {
        console.log(JSON.stringify(response, null, 2));
        resolve({status: false, error: response?.problem});
      }
    });
  });
};

export const _SetAuthToken = token => {
  ApiSauce.setHeader('Authorization', `Bearer ${token}`);
  ApiSauceMultiPart.setHeader('Authorization', `Bearer ${token}`);
};
export const _RemoveAuthToken = () => {
  ApiSauce.deleteHeader('Authorization');
  ApiSauceMultiPart.deleteHeader('Authorization');
};
