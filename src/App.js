import React, {useEffect, useRef, useState} from 'react'
import Notification from './components/notification'
import BlogForm from './components/createBlog'
import Toggleable from './components/Toggleable'
import blogService from './services/blogs'
import loginService from './services/login'
import {notify} from "./reducers/notificationReducer";
import {useDispatch} from "react-redux";
import {createBlog, initializeBlogs} from "./reducers/blogReducer";
import Blogs from "./components/Blogs";

const App = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(initializeBlogs())
    }, [dispatch])
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)

    const blogFormRef = useRef()

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
            dispatch(notify(`A new blog was not created`, true, 5000))
        }
    }


    const loginForm = () => (
        <form onSubmit={handleLogin}>
            <div>
                username
                <input id="username"
                       type="text"
                       value={username}
                       name="Username"
                       onChange={({target}) => setUsername(target.value)}
                />
            </div>
            <div>
                password
                <input id="password"
                       type="password"
                       value={password}
                       name="Password"
                       onChange={({target}) => setPassword(target.value)}
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
            <Notification/>
            <Blogs/>
            {user === null ? loginForm() :
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

export default App