import React from 'react'
import { useSelector } from 'react-redux'

const BlogDetails = ({ blog, removeBlog, likeBlog }) => {
  const user = {
    username: '',
    token: ''
  }

  useSelector((reducer) => {
    user.username = reducer.user.username
    user.token = reducer.user.token
  })

  const confirmDeletion = async () => {
    if (window.confirm(`Remove blog "${blog.title}"?`)) {
      await removeBlog(blog.id)
    }
  }

  const like = () => {
    likeBlog()
  }

  const showRemoveButton = () => {
    //JSON.parse(localStorage.getItem('loggedBlogListUser'))
    return user.username === blog.user.username
  }

  const removeButtonStyle = {
    backgroundColor: '#008CBA',
    color: 'white'
  }

  return (
    <div>
      <div className="blogUrl">
        {blog.url}
      </div>
      <div className="blogLikes">
        {blog.likes}
        <button onClick={like}>like</button>
      </div>
      {
        showRemoveButton() &&
        <button style={removeButtonStyle} onClick={confirmDeletion} variant="primary">remove</button>
      }
    </div>
  )
}

export default BlogDetails
