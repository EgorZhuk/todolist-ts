import {AppRootStateType} from 'app/store';

export const selectGetCaptchaUrl = (state: AppRootStateType) => state.security.captchaUrl
