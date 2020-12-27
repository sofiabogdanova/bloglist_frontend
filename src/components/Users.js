import React from 'react'
import { initializeUsers } from '../reducers/usersReducer'
import { connect } from 'react-redux'

const Users = (props) => {
  return (
    <div>
      <h1>Users</h1>
      <table>
        <tr>
          <th></th>
          <th>blogs created</th>
        </tr>
        {props.users.map(u =>
          <tr key={u.id}>
            <td>{u.username}</td>
            <td>{u.blogs.length}</td>
          </tr>
        )}
      </table>
    </div>
  )
}


const mapStateToProps = (state) => {
  return {
    users: state.users
  }
}

const mapDispatchToProps = {
  initializeUsers
}

const ConnectedUsers = connect(mapStateToProps, mapDispatchToProps)(Users)
export default ConnectedUsers