import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'
import BlogDetails from './BlogDetails'
import BlogForm from './createBlog'

const testUser = {
    username: "sonya",
    id: "1234567891"
}
localStorage.setItem('loggedBlogListUser', JSON.stringify(testUser))

test('only shows author and title if view button is not clicked', () => {
    //arrange
    const blog = {
        title: 'Blog Title',
        author: 'Blog author',
        url: 'Blog url',
        user: testUser
    }

    //act
    const component = render(
        <Blog blog={blog} />
    )
    const divBlogUrl = component.container.querySelector('.blogUrl')
    const divBlogLikes = component.container.querySelector('.blogLikes')

    //assert
    expect(component.container).toHaveTextContent(
        'Blog Title'
    )
    expect(component.container).toHaveTextContent(
        'Blog author'
    )
    expect(divBlogUrl).toBeNull()
    expect(divBlogLikes).toBeNull()
})

test('shows url and likes if view button is clicked', () => {
    //arrange
    const blog = {
        title: 'Blog Title',
        author: 'Blog author',
        url: 'Blog url',
        likes: 123456789,
        user: testUser
    }

    //act
    const component = render(
        <Blog blog={blog} />
    )
    const button = component.getByText('view')
    fireEvent.click(button)
    const divBlogUrl = component.container.querySelector('.blogUrl')
    const divBlogLikes = component.container.querySelector('.blogLikes')

    //assert
    expect(divBlogUrl).toBeDefined()
    expect(divBlogLikes).toBeDefined()
    expect(component.container).toHaveTextContent(
        'Blog url'
    )
    expect(component.container).toHaveTextContent(
        '123456789'
    )
})

test('if like button is clicked twice, the event handler is called twice', () => {
    //arrange
    const blog = {
        title: 'Blog Title',
        author: 'Blog author',
        url: 'Blog url',
        likes: 123456789,
        user: testUser
    }
    const mockHandler = jest.fn()

    //act
    const component = render(
        <BlogDetails blog={blog} likeBlog={mockHandler}/>
    )

    const likeButton = component.getByText('like')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)

    expect(mockHandler.mock.calls).toHaveLength(2)
})