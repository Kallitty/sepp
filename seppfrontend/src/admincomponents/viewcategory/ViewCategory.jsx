import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import swal from 'sweetalert'
import { ClipLoader } from 'react-spinners'

function ViewCategory() {
  const [loading, setLoading] = useState(true)
  const [categoryList, setCategoryList] = useState([])

  useEffect(() => {
    axios
      .get('api/view-category')
      .then((res) => {
        if (res.data.status === 200) {
          setCategoryList(res.data.category)
        }
        setLoading(false)
      })
      .catch((error) => {
        console.error('There was an error fetching the categories!', error)
        swal('Error', 'Failed to fetch categories', 'error')
        setLoading(false)
      })
  }, [])

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
        <ClipLoader size={50} color={'#123abc'} loading={loading} />
      </div>
    )
  }

  const viewCategoryHTMLTable = categoryList.map((item) => (
    <tr key={item.id}>
      <td>{item.id}</td>
      <td>{item.name}</td>
      <td>{item.slug}</td>
      <td>{item.status}</td>

      <td>
        <Link
          to={`edit-category/${item.id}`}
          className='btn btn-success btn-sm'
        >
          Edit
        </Link>
      </td>
      <td>
        <button type='button' className='btn btn-danger btn-sm'>
          Delete
        </button>
      </td>
    </tr>
  ))

  return (
    <div className='container px-4'>
      <div className='card mt-4'>
        <div className='card-header'>
          <h4>
            Category List
            <Link
              to='/admin/category'
              className='btn btn-primary btn-sm float-end'
            >
              Add Category
            </Link>
          </h4>
        </div>
        <div className='card-body'>
          <table className='table table-bordered table-striped'>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Slug</th>
                <th>Status</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>{viewCategoryHTMLTable}</tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default ViewCategory
