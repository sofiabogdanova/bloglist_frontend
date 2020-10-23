import React, { useState } from 'react'
import BlogDetails from './BlogDetails'

const Blog = ({ blog, removeBlog }) => {
  const [detailsVisible, setDetailsVisible] = useState(false)

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
    <div  style={blogStyle}>
      <div>
        {blog.title} {blog.author}
        <button onClick={toggleVisibility}> {detailsVisible ? 'hide' : 'view'}</button>
        {detailsVisible && <BlogDetails blog={blog} removeBlog={removeBlog}/>}
      </div>
    </div>
  )
}

export default Blog
