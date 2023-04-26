import {createAppAsyncThunk} from 'common/utils';
import {createSlice} from '@reduxjs/toolkit';
import {secureApi} from 'features/auth/secure/secure.api';

const initialState = {
  captchaUrl: null as string | null
}
 type SecureInitialStateType = typeof initialState

const getCaptchaUrl = createAppAsyncThunk<SecureInitialStateType>(
  'security/captcha',
  async ()=>{
    const res = await secureApi.getCaptchaUrl()

    return {captchaUrl: res.data.url}
  }
)


const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetCaptcha: state => {
      state.captchaUrl = null
    }
  },
  extraReducers: builder => {
    builder
      .addCase(getCaptchaUrl.fulfilled, (state, action)=>{
        state.captchaUrl = action.payload.captchaUrl
      })

  }
})

export const securityReducer = slice.reducer
export const securityActions = slice.actions
export const securityThunks = {getCaptchaUrl}