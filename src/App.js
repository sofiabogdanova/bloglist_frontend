import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/notification'
import BlogForm from './components/createBlog'
import Toggleable from './components/Toggleable'
import blogService from './services/blogs'
import loginService from './services/login'
import {notify} from "./reducers/notificationReducer";
import {useDispatch} from "react-redux";

const App = (props) => {
  const dispatch = useDispatch()
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  // const [errorMessage, setErrorMessage] = useState(null)
  // const [successMessage, setSuccessMessage] = useState(null)
  const [user, setUser] = useState(null)

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs => {
      const sortedBlogs = blogs.sort((blog1, blog2) => blog2.likes - blog1.likes)
      setBlogs(sortedBlogs)
    })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogListUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogListUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      dispatch(notify('Wrong username or password', true, 5000))
      //setErrorMessage('Wrong username or password')
      setTimeout(() => {
        //setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = async (event) => {
    window.localStorage.removeItem('loggedBlogListUser')
  }

  const createBlog = async (blogObject) => {
    try {
      const newBlog = {
        title: blogObject.title,
        author: blogObject.author,
        url: blogObject.url
      }
      const blog = await blogService.create(newBlog)
      const newBlogs = [...blogs, newBlog]
      setBlogs(newBlogs)
      blogFormRef.current.toggleVisibility()
      //setSuccessMessage(`A new blog ${blog.title} by ${blog.author} added`)
      dispatch(notify(`A new blog ${blog.title} by ${blog.author} added`,false, 5000))
      setTimeout(() => {
        //setSuccessMessage(null)
      }, 5000)
    } catch (exception) {
      //setErrorMessage('Error while creating blog')
      setTimeout(() => {
        //setErrorMessage(null)
      }, 5000)
    }
  }

  const removeBlog = async (id) => {
    await blogService.remove(id)
    const updatedBlogs = blogs.filter(b => b.id!==id)
    setBlogs(updatedBlogs)
  }

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

  const loggedInForm = () => (
    <form onSubmit={handleLogout}>
      <div>
        <p>{user.name} logged-in</p>
      </div>
      <button type="submit">logout</button>
    </form>
  )

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} removeBlog={removeBlog}/>
      )}
      {user === null ? loginForm() :
        <div>
          {loggedInForm()}
          <Toggleable buttonLabel="new blog" ref={blogFormRef}>
            <BlogForm
              createBlog={createBlog}
            />
          </Toggleable>
        </div>
      }

    </div>
  )
}

export default App