import React, {useState} from 'react'

const BlogForm = ({createBlog}) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const handleTitleChange = (event) => {
        setTitle(event.target.value)
    }

    const handleUrlChange = (event) => {
        setUrl(event.target.value)
    }

    const handleAuthorChange = (event) => {
        setAuthor(event.target.value)
    }

    const createNewBlog = (event) => {
        event.preventDefault() //remove for reloading

        const newBlog = {
            title: title,
            author: author,
            url: url
        }
        createBlog(newBlog)
    }
    return (
        <form onSubmit={createNewBlog}>
            <h2>create new</h2>
            <div>
                title: <input value={title} onChange={handleTitleChange} id='title'/>
            </div>

            <div>
                author: <input value={author} onChange={handleAuthorChange} id='author'/>
            </div>

            <div>
                url: <input value={url} onChange={handleUrlChange} id='url'/>
            </div>

            <button type="submit">save</button>
        </form>
    )
}

export default BlogForm