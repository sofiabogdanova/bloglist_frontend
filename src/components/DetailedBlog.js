import React, { useState } from 'react'
import { connect } from 'react-redux'
import { useParams } from 'react-router-dom'

import { notify } from '../reducers/notificationReducer'
import { removeBlog, updateBlog } from '../reducers/blogReducer'

const DetailedBlog = (props) => {
  const [comment, setComment] = useState('')

  const id = useParams().id
  const blog = props.blogs.filter(b => b.id === id)[0]
  const user = props.user
  if (!blog || !user) {
    return null
  }

  const handleCommentChange = (event) => {
    setComment(event.target.value)
  }

  const like = () => {
    const newLikes = blog.likes + 1
    const likedBlog = { ...blog, likes: newLikes }
    props.updateBlog(id, likedBlog)
  }

  const addComment = () => {
    const newComments = [...blog.comments, comment]
    const commentedBlog = { ...blog, comments: newComments }
    props.updateBlog(id, commentedBlog)
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
      <h2>comments</h2>
      <form onSubmit={addComment}>
        <div>
          <input value={comment} onChange={handleCommentChange} id='comment'/>
        </div>

        <button type="submit">comment</button>
      </form>
      <ul>
        {blog.comments.map(comment =>
          <li key={Math.random()}>
            {comment}
          </li>)}
      </ul>
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