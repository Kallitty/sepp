import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import swal from 'sweetalert'

function Category() {
  const [categoryInput, setCategory] = useState({
    slug: '',
    name: '',
    descrip: '',
    status: '',
    meta_title: '',
    meta_keyword: '',
    meta_descrip: '',
    error_list: [],
  })

  const handleInput = (e) => {
    e.persist()
    setCategory({
      ...categoryInput,
      [e.target.name]: e.target.value,
    })
  }

  const submitCategory = (e) => {
    e.preventDefault()

    const data = {
      slug: categoryInput.slug,
      name: categoryInput.name,
      description: categoryInput.descrip,
      status: categoryInput.status,
      meta_title: categoryInput.meta_title,
      meta_keyword: categoryInput.meta_keyword,
      meta_descrip: categoryInput.meta_descrip,
    }

    axios.post(`api/store-category`, data).then((res) => {
      if (res.data.status === 200) {
        document.getElementById('CATEGORY_FORM').reset()
        swal('Success.', res.data.message, 'success')
      } else if (res.data.status === 400) {
        setCategory({
          ...categoryInput,
          error_list: res.data.validation_errors,
        })
      }
    })
  }
  var display_errors = []
  if (categoryInput.error_list) {
    display_errors = [
      categoryInput.error_list.slug,
      categoryInput.error_list.name,
      categoryInput.error_list.meta_title,
    ]
  } else {
  }

  return (
    <div className='container-fluid px-4'>
      <h1 className='mt-4'>Add Category</h1>
      {display_errors.map((item) => {
        return <p className='mb-1'> {item}</p>
      })}
      <form onSubmit={submitCategory} id='CATEGORY_FORM'>
        <ul className='nav nav-tabs' id='myTab' role='tablist'>
          <li className='nav-item' role='presentation'>
            <button
              className='nav-link active'
              id='items-tab'
              data-bs-toggle='tab'
              data-bs-target='#item'
              type='button'
              role='tab'
              aria-controls='item'
              aria-selected='true'
            >
              Items
            </button>
          </li>
          <li className='nav-item' role='presentation'>
            <button
              className='nav-link'
              id='profile-tab'
              data-bs-toggle='tab'
              data-bs-target='#profile'
              type='button'
              role='tab'
              aria-controls='profile'
              aria-selected='false'
            >
              Profile
            </button>
          </li>
          <li className='nav-item' role='presentation'>
            <button
              className='nav-link'
              id='price-tab'
              data-bs-toggle='tab'
              data-bs-target='#price'
              type='button'
              role='tab'
              aria-controls='price'
              aria-selected='false'
            >
              Price
            </button>
          </li>
        </ul>
        <div className='tab-content' id='myTabContent'>
          <div
            className='tab-pane card-body border fade show active'
            id='item'
            role='tabpanel'
            aria-labelledby='items-tab'
          >
            <div className='form-group mb-3'>
              <label>Slug</label>
              <input
                type='text'
                name='slug'
                onChange={handleInput}
                value={categoryInput.slug}
                className='form-control'
              />
            </div>
            <div className='form-group mb-3'>
              <label>Name</label>
              <input
                type='text'
                name='name'
                onChange={handleInput}
                value={categoryInput.name}
                className='form-control'
              />
            </div>
            <div className='form-group mb-3'>
              <label>Description</label>
              <textarea
                name='descrip'
                onChange={handleInput}
                value={categoryInput.descrip}
                className='form-control'
              ></textarea>
            </div>
            <div className='form-group mb-3'>
              <label>Status</label>
              <input
                type='checkbox'
                name='status'
                onChange={handleInput}
                value={categoryInput.status}
              />
              {''} Status 0=shown/ 1=hidden
            </div>
          </div>

          <div
            className='tab-pane card-body border fade'
            id='profile'
            role='tabpanel'
            aria-labelledby='profile-tab'
          >
            <div className='form-group mb-3'>
              <label>Meta Title</label>
              <input
                type='text'
                name='meta_title'
                onChange={handleInput}
                value={categoryInput.meta_title}
                className='form-control'
              />
            </div>
            <div className='form-group mb-3'>
              <label>Meta Keywords</label>
              <textarea
                name='meta_keyword'
                onChange={handleInput}
                value={categoryInput.meta_keyword}
                className='form-control'
              ></textarea>
            </div>
          </div>

          <div
            className='tab-pane card-body border fade'
            id='price'
            role='tabpanel'
            aria-labelledby='price-tab'
          >
            <div className='form-group mb-3'>
              <label>Meta Description</label>
              <textarea
                name='meta_descrip'
                onChange={handleInput}
                value={categoryInput.meta_descrip}
                className='form-control'
              ></textarea>
            </div>
          </div>
        </div>
        <button type='submit' className='btn btn-primary px-4 float-end'>
          Submit
        </button>
      </form>
    </div>
  )
}

export default Category
