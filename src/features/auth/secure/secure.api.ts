import {instance} from 'common/api';


export const secureApi = {
  getCaptchaUrl() {
    return instance.get('security/get-captcha-url')
  }
}