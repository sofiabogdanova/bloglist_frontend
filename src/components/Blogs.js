import React from 'react'
import { connect } from 'react-redux'
import { notify } from '../reducers/notificationReducer'
import Blog from './Blog'
import { removeBlog, updateBlog } from '../reducers/blogReducer'

const Blogs = (props) => {
  return (
    <div>
      {props.blogs.map(blog =>
        <Blog key={blog.id} blog={blog} removeBlog={props.removeBlog} updateBlog={props.updateBlog} />
      )}
    </div>
  )
}

const mapStateToProps = (state) => {
  let unsortedBlogs = state.blogs
  const blogs = unsortedBlogs.sort(function (a, b) {
    return b.likes - a.likes
  })

  return {
    blogs: blogs
  }
}

const mapDispatchToProps = {
  notify,
  updateBlog,
  removeBlog
}

//export default Blogs
const ConnectedBlogs = connect(mapStateToProps, mapDispatchToProps)(Blogs)
export default ConnectedBlogs