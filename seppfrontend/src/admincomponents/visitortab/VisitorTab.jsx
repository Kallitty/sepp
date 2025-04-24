import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useTable, usePagination } from 'react-table'
import moment from 'moment'
import './visitortab.scss'
import swal from 'sweetalert'
import { FaSearch } from 'react-icons/fa'
import { ClipLoader } from 'react-spinners'

const VisitorTab = () => {
  const [visitors, setVisitors] = useState([])
  const [loading, setLoading] = useState(false)
  const [searchLoadings, setSearchLoadings] = useState({
    ip: false,
    referrer: false,
    timezone: false,
    country: false,
    page: false,
  })
  const [searchInputs, setSearchInputs] = useState({
    ip: '',
    referrer: '',
    timezone: '',
    country: '',
    page: '',
  })

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchVisitors()
    }, 500)

    return () => clearTimeout(timer)
  }, [searchInputs])

  const fetchVisitors = async () => {
    setLoading(true)
    try {
      const response = await axios.get('user-activity', {
        params: {
          ...searchInputs,
          anonymous_only: true,
        },
      })
      setVisitors(response.data.data)
    } catch (error) {
      console.error('Error fetching visitors', error)
      swal('Error', 'Failed to fetch visitors', 'error')
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

  const data = React.useMemo(() => visitors, [visitors])

  const columns = React.useMemo(
    () => [
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
      { Header: 'City', accessor: 'city' },
      {
        Header: 'Country',
        accessor: 'country',
        Cell: ({ value }) => (
          <div className='searchable-cell'>
            {value}
            {searchLoadings.country && (
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
      { Header: 'OS', accessor: 'os' },
      {
        Header: 'Timezone',
        accessor: 'timezone',
        Cell: ({ value }) => (
          <div className='searchable-cell'>
            {value}
            {searchLoadings.timezone && (
              <ClipLoader
                size={12}
                color={'#470647'}
                className='input-spinner'
              />
            )}
          </div>
        ),
      },
      { Header: 'Language', accessor: 'language' },
      {
        Header: 'Referrer',
        accessor: 'referrer',
        Cell: ({ value }) => (
          <div className='searchable-cell'>
            {value || 'Direct'}
            {searchLoadings.referrer && (
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
        Header: 'Page Visited',
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
        Header: 'Visited At',
        accessor: 'created_at',
        Cell: ({ value }) => formatDate(value),
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
              placeholder={`Search ${field.replace('_', ' ')}...`}
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

export default VisitorTab
