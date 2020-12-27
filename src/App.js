import React, { useEffect } from 'react'
import Notification from './components/notification'
import { useDispatch } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import Blogs from './components/Blogs'
import User from './components/User'

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  return (
    <div>
      <h2>blogs</h2>
      <Notification/>
      <Blogs/>
      <User/>

    </div>
  )
}

export default App