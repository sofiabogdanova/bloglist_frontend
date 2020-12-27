import React, { useRef, useState } from 'react'
import { notify } from '../reducers/notificationReducer'
import { connect, useDispatch, useSelector } from 'react-redux'
import BlogForm from './createBlog'
import Toggleable from './Toggleable'
import { createBlog } from '../reducers/blogReducer'
import { login, logout } from '../reducers/userReducer'

const User = (props) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  const user = {
    username: props.username,
    token: props.token
  }

  useSelector((reducer) => {
    user.username = reducer.user.username
    user.token = reducer.user.token
  })

  const loggedIn = user.username !== '' && user.token !== ''

  const handleLogin = async (event) => {
    event.preventDefault()
    props.login(username, password)
    setUsername(user.username)
    setPassword('')
    // try {
    //
    // } catch {
    //   dispatch(notify('Wrong username or password', true, 5000))
    //   setTimeout(() => {
    //   }, 5000)
    // }
  }

  const handleLogout = async () => {
    props.logout()
  }

  const blogFormRef = useRef()
  const addBlog = async (blogObject) => {
    try {
      const newBlog = {
        title: blogObject.title,
        author: blogObject.author,
        url: blogObject.url
      }
      dispatch(createBlog(newBlog))
      blogFormRef.current.toggleVisibility()
      dispatch(notify(`A new blog ${newBlog.title} by ${newBlog.author} added`, false, 5000))
    } catch (exception) {
      dispatch(notify('A new blog was not created', true, 5000))
    }
  }

  const loggedInForm = () => (
    <form onSubmit={handleLogout}>
      <div>
        <p>{user.username} logged-in</p>
      </div>
      <button type="submit">logout</button>
    </form>
  )

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input id="username"
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input id="password"
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit" id="login">login</button>
    </form>
  )

  return (
    <div>
      {!loggedIn && loginForm()}
      {loggedIn &&
      <div>
        {loggedInForm()}
        <Toggleable buttonLabel="new blog" ref={blogFormRef}>
          <BlogForm addBlog={addBlog}/>
        </Toggleable>
      </div>
      }

    </div>
  )
}

const mapStateToProps = (state) => {
  let user = state.user
  return user
}

const mapDispatchToProps = {
  login,
  logout
}

const ConnectedUser = connect(mapStateToProps, mapDispatchToProps)(User)
export default ConnectedUser
//export default User