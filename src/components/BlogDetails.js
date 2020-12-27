import React, { useState } from 'react'
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

  const [likes, setLikes] = useState(blog.likes)

  const confirmDeletion = async () => {
    if (window.confirm(`Remove blog "${blog.title}"?`)) {
      await removeBlog(blog.id)
    }
  }

  const like = () => {
    likeBlog()
    const newLikes = likes + 1
    setLikes(newLikes)
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
        {likes}
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
