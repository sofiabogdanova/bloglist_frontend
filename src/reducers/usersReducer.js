import userService from '../services/users'

export const initializeUsers = () => {
  return async dispatch => {
    const allUsers = await userService.getAll()
    dispatch({
      type: 'INIT_USERS',
      data: allUsers
    })
  }
}

const usersReducer = (state = [], action) => {
  switch (action.type) {
  case 'INIT_USERS': {
    const allUsers = action.data
    return allUsers
  }

  default:
    return state
  }
}


export default usersReducer