import blogService from '../services/blogs'
import loginService from '../services/login'
import { notify } from './notificationReducer'

const initialState = {
  token: '',
  username: '',
  id: ''
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
    return {
      token: action.data.token,
      username: action.data.username,
      id: action.data.id
    }
  }

  case 'LOGOUT': {
    return {
      token: '',
      username: '',
      id: ''
    }
  }

  default:
    return state
  }
}


export default userReducer