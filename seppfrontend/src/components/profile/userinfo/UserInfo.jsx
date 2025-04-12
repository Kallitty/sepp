import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './userinfo.scss'
import { DefaultProfilePic } from '../defaultprofp'
import { ClipLoader } from 'react-spinners'
import swal from 'sweetalert'

const UserInfo = () => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [image, setImage] = useState(null)

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('/user')
        setUser(response.data)
      } catch (error) {
        console.error('Error fetching user data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchUserData()
  }, [])

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setImage(e.target.result)
      }
      reader.readAsDataURL(e.target.files[0])
    }
  }

  const handleImageUpload = async (e) => {
    if (e.target.files && e.target.files[0]) {
      const formData = new FormData()
      formData.append('profile_picture', e.target.files[0])

      try {
        const response = await axios.post('/user/profile-picture', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })

        if (response.status === 200) {
          swal('Success!', 'Profile picture updated successfully.', 'success')
          setUser({ ...user, profile_picture: response.data.profile_picture })
        }
      } catch (error) {
        console.error('Error uploading profile picture:', error)
        swal('Error', 'Failed to upload profile picture.', 'error')
      }
    }
  }

  if (loading) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <ClipLoader size={20} color={'#470647'} loading={loading} />
      </div>
    )
  }

  return (
    <div className='sepp__profile-user--detail'>
      <div className='profile-picture-wrapper'>
        <img
          src={image || (user && user.profile_picture) || DefaultProfilePic}
          alt='Profile'
          className='sepp__profile-user--profile-picture'
        />
        <div className='overlay'>
          <label htmlFor='file-input' className='upload-icon'>
            &#x1f4f7; {/* Camera emoji as upload icon */}
          </label>
          <input
            id='file-input'
            type='file'
            onChange={(e) => {
              handleImageChange(e)
              handleImageUpload(e)
            }}
            style={{ display: 'none' }}
          />
        </div>
      </div>
      <h4 className='sepp__profile-username'>{user.name}</h4>
      <span className='sepp__profile-category'>(Potential Hire)</span>
    </div>
  )
}

export default UserInfo
