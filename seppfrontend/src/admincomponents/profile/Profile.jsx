import React, { useEffect, useState } from 'react'
import axios from 'axios'
import UserList from './userlist/UserList'
import UserForm from './userform/UserForm'
import './profile.scss'
import swal from 'sweetalert'

const Profile = () => {
  const [users, setUsers] = useState([])
  const [selectedUser, setSelectedUser] = useState(null)

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      const response = await axios.get('/users')
      setUsers(response.data)
    } catch (error) {
      console.error('Error fetching users:', error)
    }
  }

  const handleUserSelect = (user) => {
    setSelectedUser(user)
  }

  const handleUserSubmit = async (user) => {
    try {
      if (user.id) {
        await axios.put(`/users/${user.id}`, user)
      } else {
        await axios.post('/users', user)
      }
      fetchUsers()
      setSelectedUser(null)
    } catch (error) {
      console.error('Error saving user:', error)
    }
  }

  const handleUserDelete = async (userId) => {
    try {
      await axios.delete(`/users/${userId}`)
      fetchUsers()
    } catch (error) {
      console.error('Error deleting user:', error)
    }
  }

  const handleBlockUser = async (id, role) => {
    if (role === 1) {
      swal('Action Denied', 'You cannot block an admin user', 'error')
      return
    }

    swal({
      title: 'Are you sure?',
      text: 'This action will block/unblock the user',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then(async (willBlock) => {
      if (willBlock) {
        try {
          const response = await axios.post(`/users/${id}/block`)
          swal('Success', response.data.message, 'success')
          fetchUsers()
        } catch (error) {
          swal('Error', 'Failed to update user status', 'error')
        }
      }
    })
  }

  return (
    <div className='profile-container'>
      <UserList
        users={users}
        onSelectUser={handleUserSelect}
        onDeleteUser={handleUserDelete}
        onBlockUser={handleBlockUser}
      />
      <UserForm user={selectedUser} onSubmit={handleUserSubmit} />
    </div>
  )
}

export default Profile
