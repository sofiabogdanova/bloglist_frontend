import React from 'react'
import {useSelector, useDispatch} from 'react-redux'

import '../index.css'

const Notification = () => {
  const notification = useSelector((reducer) => {
    return reducer.notification
  })
  const message = notification.message
  let className = notification.isError ? 'error' : 'success'
  return (
      <div>
        {message && <div className={className}>
          {message}
        </div>}
      </div>

  )
}

export default Notification