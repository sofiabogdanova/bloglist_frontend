import React from 'react'
import { useSelector } from 'react-redux'

import '../index.css'
import { Alert } from 'react-bootstrap'

const Notification = () => {
  const notification = useSelector((reducer) => {
    return reducer.notification
  })
  const message = notification.message
  let className = notification.isError ? 'danger' : 'success'
  return (
    <div>
      {message && <Alert variant={className}>
        {message}
      </Alert>}
    </div>

  )
}

export default Notification