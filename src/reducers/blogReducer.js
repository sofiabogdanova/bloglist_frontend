import blogService from '../services/blogs'

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs,
    })
  }
}

export const createBlog = (blog) => {
  return async dispatch => {
    const newBlog = await blogService.create(blog)
    dispatch({
      type: 'CREATE',
      data: newBlog,
    })
  }
}

export const updateBlog = (id, blog) => {
  return async dispatch => {
    const updatedBlog = await blogService.update(id, blog)
    dispatch({
      type: 'UPDATE',
      data: updatedBlog,
    })
  }
}

export const removeBlog = (id) => {
  return async dispatch => {
    await blogService.remove(id)
    dispatch({
      type: 'DELETE',
      data: id,
    })
  }
}

export const reducer = (state = [], action) => {
  switch (action.type) {
  case 'UPDATE': {
    const id = action.data.id
    const updatedBlog = action.data
    return state.map(blog =>
      blog.id !== id ? blog : updatedBlog
    )
  }

  case 'DELETE': {
    const id = action.data
    return state.filter(blog => blog.id!==id)
  }

  case 'CREATE': {
    return [...state, action.data]
  }

  case 'INIT_BLOGS': {
    return action.data
  }

  default:
    return state
  }
}

export default reducer