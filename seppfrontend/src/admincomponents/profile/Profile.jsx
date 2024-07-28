import React, { useEffect, useState } from 'react'
import axios from 'axios'
import UserList from './userlist/UserList'
import UserForm from './userform/UserForm'
import './profile.scss'

const Profile = () => {
  const [users, setUsers] = useState([])
  const [selectedUser, setSelectedUser] = useState(null)

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      const response = await axios.get('/api/users')
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
        await axios.put(`/api/users/${user.id}`, user)
      } else {
        await axios.post('/api/users', user)
      }
      fetchUsers()
      setSelectedUser(null)
    } catch (error) {
      console.error('Error saving user:', error)
    }
  }

  const handleUserDelete = async (userId) => {
    try {
      await axios.delete(`/api/users/${userId}`)
      fetchUsers()
    } catch (error) {
      console.error('Error deleting user:', error)
    }
  }

  return (
    <div className='profile-container'>
      <UserList
        users={users}
        onSelectUser={handleUserSelect}
        onDeleteUser={handleUserDelete}
      />
      <UserForm user={selectedUser} onSubmit={handleUserSubmit} />
    </div>
  )
}

export default Profile
