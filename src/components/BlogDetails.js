import React, { useState } from 'react'
import blogService from '../services/blogs'
import 'jest-localstorage-mock'

const BlogDetails = ({ blog, removeBlog }) => {
  const [likes, setLikes] = useState(blog.likes)

  const like = async (event) => {
    const newLikes = likes + 1
    setLikes(newLikes)
    let likedBlog = {
      user: blog.user,
      likes: newLikes,
      author: blog.author,
      title: blog.title,
      url: blog.url
    }
    blogService.update(blog.id, likedBlog)
  }

  const confirmDeletion = async () => {
    if (window.confirm(`Remove blog "${blog.title}"?`)) {
      await removeBlog(blog.id)
    }
  }

  const showRemoveButton = () => {
    const items = { ...localStorage };
    const user = JSON.parse(localStorage.getItem('loggedBlogListUser'))
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
