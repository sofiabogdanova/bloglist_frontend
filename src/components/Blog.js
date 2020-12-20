import React, { useState } from 'react'
import BlogDetails from './BlogDetails'

const Blog = ({ blog, removeBlog, updateBlog }) => {
  const [detailsVisible, setDetailsVisible] = useState(false)

  const likeBlog = async (event) => {
    const newLikes = blog.likes+=1
    let likedBlog = {
      user: blog.user,
      likes: newLikes,
      author: blog.author,
      title: blog.title,
      url: blog.url
    }
    updateBlog(blog.id, likedBlog)
  }

  const toggleVisibility = (event) => {
    setDetailsVisible(!detailsVisible)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle} className="blog">
      <div id="div1">
        {blog.title} {blog.author}
        <button onClick={toggleVisibility} className='viewHideBtn'> {detailsVisible ? 'hide' : 'view'}</button>
        {detailsVisible && <BlogDetails blog={blog} removeBlog={removeBlog} likeBlog={likeBlog}/>}
      </div>
    </div>
  )
}

export default Blog
