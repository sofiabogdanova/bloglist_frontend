import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

const User = () => {
  const id = useParams().id
  const user = useSelector((reducer) => {
    return reducer.users.filter(u => u.id === id)[0]
  })
  if (!user) {
    return null
  }

  return (
    <div>
      <h1>
        {user.username}
      </h1>
      <h2>
        added blogs:
      </h2>
      <ul>
        {user.blogs.map(blog =>
          <li key={blog.id}>
            {blog.title}
          </li>
        )}
      </ul>
    </div>
  )
}
export default User