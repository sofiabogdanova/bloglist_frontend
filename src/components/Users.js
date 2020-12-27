import React from 'react'
import { Link } from 'react-router-dom'
import { initializeUsers } from '../reducers/usersReducer'
import { connect } from 'react-redux'
import { Table } from 'react-bootstrap'

const Users = (props) => {
  return (
    <div>
      <h1>Users</h1>
      <Table striped>
        <tr>
          <th></th>
          <th>blogs created</th>
        </tr>
        {props.users.map(u =>
          <tr key={u.id}>
            <td><Link to={`/users/${u.id}`}>{u.username}</Link></td>
            <td>{u.blogs.length}</td>
          </tr>
        )}
      </Table>
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