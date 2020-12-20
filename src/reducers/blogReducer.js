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
        const blogs = await blogService.create(blog)
        dispatch({
            type: 'CREATE',
            data: blogs,
        })
    }
}

export const reducer = (state = [], action) => {
    switch (action.type) {
        // case 'VOTE': {
        //     const id = action.data
        //     const anecdoteToChange = state.find(a => a.id === id)
        //     const votedAnecdote = {
        //         ...anecdoteToChange,
        //         votes: anecdoteToChange.votes+1
        //     }
        //     return state.map(anecdote =>
        //         anecdote.id !== id ? anecdote : votedAnecdote
        //     )
        // }

        case 'CREATE': {
            return [...state, action.data]
        }

        case 'INIT_BLOGS':{
            return action.data
        }

        default: return state
    }
}

export default reducer