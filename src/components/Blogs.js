import React from 'react'
//import {useDispatch, useSelector} from 'react-redux'
import { connect } from 'react-redux'
import {notify} from "../reducers/notificationReducer";
import Blog from "./Blog";
import blogService from "../services/blogs";

const Blogs = (props) => {
    const removeBlog = async (id) => {
        await blogService.remove(id)
        //const updatedBlogs = blogs.filter(b => b.id!==id)
        //setBlogs(updatedBlogs)
    }

    return (
        <div>
            {props.blogs.map(blog =>
                    <Blog key={blog.id} blog={blog} removeBlog={removeBlog} />
                // <Blog
                //     key={anecdote.id}
                //     anecdote={anecdote}
                //     // handleVote={() => vote(anecdote)}
                //     handleVote={() => {
                //         props.voteForAnecdote(anecdote.id)
                //         props.notify(`you voted ${anecdote.content}`, 5000)
                //     }}
                // />
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
    //voteForAnecdote,
    notify,

}

//export default Blogs
const ConnectedBlogs = connect(mapStateToProps, mapDispatchToProps)(Blogs)
export default ConnectedBlogs