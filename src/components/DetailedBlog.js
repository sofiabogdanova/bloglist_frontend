import React from 'react'
import { connect } from 'react-redux'
import { useParams } from 'react-router-dom'

import { notify } from '../reducers/notificationReducer'
import { removeBlog, updateBlog } from '../reducers/blogReducer'

const DetailedBlog = (props) => {
  const id = useParams().id
  const blog = props.blogs.filter(b => b.id === id)[0]
  const user = props.user
  if (!blog || !user) {
    return null
  }

  const like = () => {
    const newLikes = blog.likes + 1
    const likedBlog = { ...blog, likes: newLikes }
    props.updateBlog(id, likedBlog)
  }

  const confirmDeletion = async () => {
    if (window.confirm(`Remove blog "${blog.title}"?`)) {
      await props.removeBlog(blog.id)
    }
  }

  const showRemoveButton = () => {
    //JSON.parse(localStorage.getItem('loggedBlogListUser'))
    return user.id === blog.user.username
  }

  const removeButtonStyle = {
    backgroundColor: '#008CBA',
    color: 'white'
  }

  return (
    <div>
      <h1>{blog.title}</h1>
      <div className="blogUrl">
        {blog.url}
      </div>
      <div className="blogLikes">
        {blog.likes}
        <button onClick={like}>like</button>
      </div>
      <div>
        added by {blog.author}
      </div>
      <br/>
      {
        showRemoveButton() &&
        <button style={removeButtonStyle} onClick={confirmDeletion} variant="primary">remove</button>
      }
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs,
    user: state.user
  }
}

const mapDispatchToProps = {
  notify,
  updateBlog,
  removeBlog
}

//export default Blogs
const ConnectedDetailedBlog = connect(mapStateToProps, mapDispatchToProps)(DetailedBlog)
export default ConnectedDetailedBlog