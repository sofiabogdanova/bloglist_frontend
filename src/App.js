import React, { useEffect } from 'react'
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import Notification from './components/notification'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUsers } from './reducers/usersReducer'
import Blogs from './components/Blogs'
import UserForm from './components/UserForm'
import Users from './components/Users'
import User from './components/User'
import DetailedBlog from './components/DetailedBlog'

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
    <div className="container">
      <Router>
        <div>
          <Link style={padding} to="/">home</Link>
          <Link style={padding} to="/blogs">blogs</Link>
          <Link style={padding} to="/users">users</Link>
        </div>

        <h2>blogs</h2>
        <Notification/>
        <UserForm/>
        <br/>

        <Switch>
          <Route path="/blogs/:id">
            <DetailedBlog/>
          </Route>
          <Route path="/blogs">
            <Blogs/>
          </Route>
          <Route path="/users/:id">
            <User/>
          </Route>
          <Route path="/users">
            <Users/>
          </Route>
          <Route path="/">
          </Route>
        </Switch>

      </Router></div>
  )
}

export default App