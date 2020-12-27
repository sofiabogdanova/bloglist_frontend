import blogService from '../services/blogs'
import loginService from '../services/login'
import { notify } from './notificationReducer'

const initialState = {
  token: '',
  username: ''
}

export const login = (username, password) => {
  return async dispatch => {
    try {
      const user = await loginService.login({
        username, password,
      })

      blogService.setToken(user.token)
      dispatch({
        type: 'LOGIN',
        data: user
      })
    } catch {
      dispatch(notify('Wrong username or password', true, 5000))
      setTimeout(() => {
      }, 5000)
    }

  }

}

export const logout = () => {
  return dispatch => {
    dispatch({
      type: 'LOGOUT'
    })
  }
}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'LOGIN': {
    const token = action.data.token
    const username = action.data.username
    return {
      token: token,
      username: username
    }
  }

  case 'LOGOUT': {
    return {
      token: '',
      username: ''
    }
  }

  default:
    return state
  }
}


export default userReducer