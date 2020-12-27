import React, { useEffect } from 'react'
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import Notification from './components/notification'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUsers } from './reducers/usersReducer'
import Blogs from './components/Blogs'
import UserForm from './components/UserForm'
import Users from './components/Users'

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
  }, [dispatch])

  const padding = {
    padding: 5
  }
  return (
    <Router>
      <div>
        <Link style={padding} to="/">home</Link>
        <Link style={padding} to="/blogs">blogs</Link>
        <Link style={padding} to="/users">users</Link>
      </div>

      <h2>blogs</h2>
      <Notification/>
      <UserForm/>

      <Switch>
        <Route path="/blogs">
          <Blogs />
        </Route>
        <Route path="/users">
          <Users />
        </Route>
        <Route path="/">
          <Blogs />
        </Route>
      </Switch>

    </Router>
  )
}

export default App