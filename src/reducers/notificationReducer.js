import { timeoutCollection } from 'time-events-manager/src/timeout/timeout-decorator'

const initialNotification = { message: '', isError: false }

const notificationReducer = (state = initialNotification, action) => {
  switch (action.type) {
  case 'NOTIFY': {
    const notification = action.data

    return notification
  }

  case 'REMOVE_NOTIFICATION': {
    return { message: '', isError: false }
  }

  default:
    return state
  }
}

export const notify = (message, isError, showTime) => {
  return async dispatch => {
    timeoutCollection.removeAll()
    setTimeout(() => {
      dispatch(removeNotification())
    }, showTime)
    dispatch({
      type: 'NOTIFY',
      data: {
        message, isError
      }
    })
  }

}

export const removeNotification = () => {
  return {
    type: 'REMOVE_NOTIFICATION'
  }
}

export default notificationReducer