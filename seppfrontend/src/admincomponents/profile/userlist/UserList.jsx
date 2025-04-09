import React, { useState, useEffect, useRef } from 'react'
import './userlist.scss'
// import '../profile.scss'
import { utils, writeFile } from 'xlsx'
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import { FaDownload } from 'react-icons/fa'
import swal from 'sweetalert'

const UserList = ({ users, onSelectUser, onDeleteUser, onBlockUser }) => {
  const [currentPage, setCurrentPage] = useState(1)
  const [showDropdown, setShowDropdown] = useState(false)
  const dropdownRef = useRef(null)
  const usersPerPage = 10

  const regularUsers = users.filter((user) => user.role_as === 0)

  const indexOfLastUser = currentPage * usersPerPage
  const indexOfFirstUser = indexOfLastUser - usersPerPage
  const currentUsers = regularUsers.slice(indexOfFirstUser, indexOfLastUser)

  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  const exportToExcel = () => {
    const ws = utils.json_to_sheet(
      regularUsers.map((user, index) => ({
        'S/N': index + 1,
        Name: user.name,
        Email: user.email,
        'Created At': new Date(user.created_at).toLocaleDateString(),
        'Updated At': new Date(user.updated_at).toLocaleDateString(),
      }))
    )
    const wb = utils.book_new()
    utils.book_append_sheet(wb, ws, 'Users')
    writeFile(wb, 'UserList.xlsx')
    setShowDropdown(false)
  }

  const exportToPDF = () => {
    const doc = new jsPDF()
    doc.text('User List', 20, 10)
    doc.autoTable({
      head: [['S/N', 'Name', 'Email', 'Created At', 'Updated At']],
      body: regularUsers.map((user, index) => [
        index + 1,
        user.name,
        user.email,
        new Date(user.created_at).toLocaleDateString(),
        new Date(user.updated_at).toLocaleDateString(),
      ]),
    })
    doc.save('UserList.pdf')
    setShowDropdown(false)
  }

  useEffect(() => {
    if (showDropdown) {
      const timer = setTimeout(() => setShowDropdown(false), 3000)
      return () => clearTimeout(timer)
    }
  }, [showDropdown])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleDelete = (userId) => {
    swal({
      title: 'Do you want to permanently delete this user?',
      text: 'This action cannot be undone!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        onDeleteUser(userId)
        swal('User has been deleted!', {
          icon: 'success',
        })
      } else {
        // swal('Action cancelled')
      }
    })
  }

  return (
    <div className='user-list'>
      <h2>All Users</h2>
      <div className='export-dropdown' ref={dropdownRef}>
        <FaDownload
          onClick={() => setShowDropdown(!showDropdown)}
          className='export-icon'
        />
        {showDropdown && (
          <div className='dropdown-menu'>
            <button onClick={exportToExcel}>Export to Excel</button>
            <button onClick={exportToPDF}>Export to PDF</button>
          </div>
        )}
      </div>

      <table>
        <thead>
          <tr>
            <th>S/N</th>
            <th>Name</th>
            <th>Email</th>
            <th>Created At</th>
            <th>Updated At</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map((user, index) => (
            <tr key={user.id}>
              <td>{indexOfFirstUser + index + 1}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{new Date(user.created_at).toLocaleDateString()}</td>
              <td>{new Date(user.updated_at).toLocaleDateString()}</td>
              <td>
                <div className='role-status'>
                  <span className='role'>
                    {user.role_as === 1 ? 'Admin' : 'User'}
                  </span>
                  <span
                    className={`status-badge ${
                      user.status === 1 ? 'active' : 'blocked'
                    }`}
                  >
                    {user.status === 1 ? 'Active' : 'Blocked'}
                  </span>
                </div>
              </td>
              <td className='actions'>
                {/* <table>
        <thead>
          <tr>
            <th>S/N</th>
            <th>Name</th>
            <th>Email</th>
            <th>Created At</th>
            <th>Updated At</th>
            <th>Role</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map((user, index) => (
            <tr key={user.id}>
              <td>{indexOfFirstUser + index + 1}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{new Date(user.created_at).toLocaleDateString()}</td>
              <td>{new Date(user.updated_at).toLocaleDateString()}</td>
              <td>{user.role_as === 1 ? 'Admin' : 'User'}</td>
              <td>{user.status === 1 ? 'Active' : 'Blocked'}</td>

              <td className='actions'> */}
                <button
                  className='edit-button'
                  onClick={() => onSelectUser(user)}
                >
                  Edit
                </button>
                <>
                  {user.role_as === 0 && (
                    <button
                      onClick={() => onBlockUser(user.id, user.role_as)}
                      className='btn btn-danger btn-sm'
                    >
                      {user.status === 1 ? 'Block' : 'Unblock'}
                    </button>
                  )}
                </>
                <button
                  className='delete-button'
                  onClick={() => handleDelete(user.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className='pagination'>
        {Array.from(
          { length: Math.ceil(regularUsers.length / usersPerPage) },
          (_, i) => (
            <button
              key={i + 1}
              onClick={() => paginate(i + 1)}
              className={i + 1 === currentPage ? 'active' : ''}
            >
              {i + 1}
            </button>
          )
        )}
      </div>
    </div>
  )
}

export default UserList

//Theformer UserList

// import React, { useState, useEffect, useRef } from 'react'
// import { utils, writeFile } from 'xlsx'
// import jsPDF from 'jspdf'
// import 'jspdf-autotable'
// import { FaDownload } from 'react-icons/fa'
// import swal from 'sweetalert'

// const UserList = ({ users, onSelectUser, onDeleteUser }) => {
//   const [currentPage, setCurrentPage] = useState(1)
//   const [showDropdown, setShowDropdown] = useState(false)
//   const dropdownRef = useRef(null)
//   const usersPerPage = 10

//   const regularUsers = users.filter((user) => user.role_as === 0)

//   const indexOfLastUser = currentPage * usersPerPage
//   const indexOfFirstUser = indexOfLastUser - usersPerPage
//   const currentUsers = regularUsers.slice(indexOfFirstUser, indexOfLastUser)

//   const paginate = (pageNumber) => setCurrentPage(pageNumber)

//   const exportToExcel = () => {
//     const ws = utils.json_to_sheet(
//       regularUsers.map((user, index) => ({
//         'S/N': index + 1,
//         Name: user.name,
//         Email: user.email,
//         'Created At': new Date(user.created_at).toLocaleDateString(),
//         'Updated At': new Date(user.updated_at).toLocaleDateString(),
//       }))
//     )
//     const wb = utils.book_new()
//     utils.book_append_sheet(wb, ws, 'Users')
//     writeFile(wb, 'UserList.xlsx')
//     setShowDropdown(false)
//   }

//   const exportToPDF = () => {
//     const doc = new jsPDF()
//     doc.text('User List', 20, 10)
//     doc.autoTable({
//       head: [['S/N', 'Name', 'Email', 'Created At', 'Updated At']],
//       body: regularUsers.map((user, index) => [
//         index + 1,
//         user.name,
//         user.email,
//         new Date(user.created_at).toLocaleDateString(),
//         new Date(user.updated_at).toLocaleDateString(),
//       ]),
//     })
//     doc.save('UserList.pdf')
//     setShowDropdown(false)
//   }

//   useEffect(() => {
//     if (showDropdown) {
//       const timer = setTimeout(() => setShowDropdown(false), 3000)
//       return () => clearTimeout(timer)
//     }
//   }, [showDropdown])

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setShowDropdown(false)
//       }
//     }

//     document.addEventListener('mousedown', handleClickOutside)
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside)
//     }
//   }, [])

//   const handleDelete = (userId) => {
//     swal({
//       title: 'Do you want to permanently delete this user?',
//       text: 'This action cannot be undone!',
//       icon: 'warning',
//       buttons: true,
//       dangerMode: true,
//     }).then((willDelete) => {
//       if (willDelete) {
//         onDeleteUser(userId)
//         swal('User has been deleted!', {
//           icon: 'success',
//         })
//       } else {
//         // swal('Action cancelled')
//       }
//     })
//   }

//   return (
//     <div className='user-list'>
//       <h2>All Users</h2>
//       <div className='export-dropdown' ref={dropdownRef}>
//         <FaDownload
//           onClick={() => setShowDropdown(!showDropdown)}
//           className='export-icon'
//         />
//         {showDropdown && (
//           <div className='dropdown-menu'>
//             <button onClick={exportToExcel}>Export to Excel</button>
//             <button onClick={exportToPDF}>Export to PDF</button>
//           </div>
//         )}
//       </div>

//       <table>
//         <thead>
//           <tr>
//             <th>S/N</th>
//             <th>Name</th>
//             <th>Email</th>
//             <th>Created At</th>
//             <th>Updated At</th>
//             <th>Role</th>
//             <th>Status</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {currentUsers.map((user, index) => (
//             <tr key={user.id}>
//               <td>{indexOfFirstUser + index + 1}</td>
//               <td>{user.name}</td>
//               <td>{user.email}</td>
//               <td>{new Date(user.created_at).toLocaleDateString()}</td>
//               <td>{new Date(user.updated_at).toLocaleDateString()}</td>
//               <td>{user.role_as === 1 ? 'Admin' : 'User'}</td>
//               <td>{user.status === 1 ? 'Active' : 'Blocked'}</td>

//               <td className='actions'>
//                 <button
//                   className='edit-button'
//                   onClick={() => onSelectUser(user)}
//                 >
//                   Edit
//                 </button>
//                 <>
//                   {user.role_as === 0 && (
//                     <button
//                       onClick={() => handleBlockUser(user.id, user.role_as)}
//                       className='btn btn-danger btn-sm'
//                     >
//                       {user.status === 1 ? 'Block' : 'Unblock'}
//                     </button>
//                   )}
//                 </>
//                 <button
//                   className='delete-button'
//                   onClick={() => handleDelete(user.id)}
//                 >
//                   Delete
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       <div className='pagination'>
//         {Array.from(
//           { length: Math.ceil(regularUsers.length / usersPerPage) },
//           (_, i) => (
//             <button
//               key={i + 1}
//               onClick={() => paginate(i + 1)}
//               className={i + 1 === currentPage ? 'active' : ''}
//             >
//               {i + 1}
//             </button>
//           )
//         )}
//       </div>
//     </div>
//   )
// }

// export default UserList
