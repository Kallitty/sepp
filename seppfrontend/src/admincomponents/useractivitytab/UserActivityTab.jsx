import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useTable, usePagination } from 'react-table'
import moment from 'moment'
import './useractivitytab.scss'
import swal from 'sweetalert'
import { FaSearch, FaUser } from 'react-icons/fa'
import { ClipLoader } from 'react-spinners'

const UserActivityTab = () => {
  const [activities, setActivities] = useState([])
  const [loading, setLoading] = useState(false)
  const [searchLoadings, setSearchLoadings] = useState({
    user: false,
    page: false,
    action: false,
    ip: false,
  })
  const [searchInputs, setSearchInputs] = useState({
    user: '',
    page: '',
    action: '',
    ip: '',
  })

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchActivities()
    }, 500)

    return () => clearTimeout(timer)
  }, [searchInputs])

  const fetchActivities = async () => {
    setLoading(true)
    try {
      const response = await axios.get('user-activity', {
        params: {
          ...searchInputs,
          authenticated_only: true,
        },
      })
      setActivities(response.data.data)
    } catch (error) {
      console.error('Error fetching activities', error)
      swal('Error', 'Failed to fetch user activities', 'error')
    }
    setLoading(false)
  }

  const handleSearchChange = (e, field) => {
    setSearchLoadings((prev) => ({ ...prev, [field]: true }))
    setSearchInputs({ ...searchInputs, [field]: e.target.value })

    setTimeout(() => {
      setSearchLoadings((prev) => ({ ...prev, [field]: false }))
    }, 600)
  }

  const formatDate = (dateString) => {
    return moment(dateString).format('YY-MM-DD, HH:mm')
  }

  const getActionType = (pageVisited) => {
    if (pageVisited.includes('login')) return 'Login'
    if (pageVisited.includes('dashboard')) return 'Dashboard Access'
    if (pageVisited.includes('edit')) return 'Content Edit'
    return 'Page View'
  }

  // const data = React.useMemo(() => activities, [activities])
  const data = React.useMemo(
    () =>
      activities.map((activity) => ({
        ...activity,
        action_type: getActionType(activity.page_visited),
      })),
    [activities]
  )

  const columns = React.useMemo(
    () => [
      {
        Header: 'User',
        accessor: 'user.name',
        Cell: ({ row }) => (
          <div className='user-cell'>
            <FaUser className='user-icon' />
            <span>{row.original.user?.name || 'N/A'}</span>
            {searchLoadings.user && (
              <ClipLoader
                size={12}
                color={'#470647'}
                className='input-spinner'
              />
            )}
          </div>
        ),
      },
      {
        Header: 'Action',
        accessor: 'action_type',
        Cell: ({ value }) => {
          const action = getActionType(value)
          return (
            <div className='searchable-cell'>
              {action}
              {searchLoadings.action && (
                <ClipLoader
                  size={12}
                  color={'#470647'}
                  className='input-spinner'
                />
              )}
            </div>
          )
        },
      },
      {
        Header: 'Page',
        accessor: 'page_visited',
        Cell: ({ value }) => (
          <div className='searchable-cell'>
            {value}
            {searchLoadings.page && (
              <ClipLoader
                size={12}
                color={'#470647'}
                className='input-spinner'
              />
            )}
          </div>
        ),
      },
      {
        Header: 'IP Address',
        accessor: 'ip_address',
        Cell: ({ value }) => (
          <div className='searchable-cell'>
            {value}
            {searchLoadings.ip && (
              <ClipLoader
                size={12}
                color={'#470647'}
                className='input-spinner'
              />
            )}
          </div>
        ),
      },
      { Header: 'Device', accessor: 'device' },
      { Header: 'Browser', accessor: 'browser' },
      {
        Header: 'Time',
        accessor: 'created_at',
        Cell: ({ value }) => formatDate(value),
      },
      {
        Header: 'Details',
        accessor: 'meta',
        Cell: ({ value }) => (
          <div className='meta-details'>
            {value?.login_method && `Method: ${value.login_method}`}
            {value?.role && `Role: ${value.role}`}
          </div>
        ),
      },
    ],
    [searchLoadings]
  )

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    state,
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 10 },
    },
    usePagination
  )

  if (loading) {
    return (
      <div className='loading-container'>
        <ClipLoader size={50} color={'#470647'} loading={loading} />
      </div>
    )
  }

  return (
    <div className='visitor-container'>
      <div className='search-filters'>
        {Object.keys(searchInputs).map((field) => (
          <div className='search-filter' key={field}>
            <FaSearch className='search-icon' />
            <input
              type='text'
              placeholder={`Search ${field}...`}
              value={searchInputs[field]}
              onChange={(e) => handleSearchChange(e, field)}
              className='search-input'
            />
            {searchLoadings[field] && (
              <ClipLoader
                size={15}
                color={'#470647'}
                className='filter-spinner'
              />
            )}
          </div>
        ))}
      </div>

      <table {...getTableProps()} className='visitor-table'>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()} key={column.id}>
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()} key={row.id}>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()} key={cell.column.id}>
                    {cell.render('Cell')}
                  </td>
                ))}
              </tr>
            )
          })}
        </tbody>
      </table>

      <div className='pagination'>
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          Previous
        </button>
        <span>
          Page {state.pageIndex + 1} of {pageOptions.length}
        </span>
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          Next
        </button>
      </div>
    </div>
  )
}

export default UserActivityTab
