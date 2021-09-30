import React, { useCallback, useEffect, useState } from 'react'
import ConferenceFilters from './ConferenceFilters'
//import conferences from 'utils/mocks/attendeesList'
import ConferenceList from './ConferenceList'
import LoadingFakeText from '@bit/totalsoft_oss.react-mui.fake-text'
import { generateDefaultFilters } from 'utils/functions'
import { useQueryWithErrorHandling } from 'hooks/errorHandling'
import { CONFERENCE_LIST_QUERY } from '../gql/queries/ConferenceListQuery'
import { useEmail } from 'hooks/useEmail'
import Pagination from '@bit/totalsoft_oss.react-mui.pagination'
import { useFooter } from 'providers/AreasProvider'

const extractPager = ({ page, pageSize }) => ({ page, pageSize })

const ConferenceListContainer = () => {
  const [pager, setPager] = useState({ totalCount: 0, page: 0, pageSize: 3 })
  const [filters, setFilters] = useState(generateDefaultFilters())
  const [email] = useEmail()
  const { data, loading, refetch } = useQueryWithErrorHandling(CONFERENCE_LIST_QUERY, {
    variables: { pager: extractPager(pager), filters, email },
    onCompleted: results => {
      const totalCount = results?.conferenceList?.pagination?.totalCount
      setPager(state => ({ ...state, totalCount }))
    }
  })

  const [, setFooter] = useFooter()

  const handleRowsPerPageChange = useCallback(pageSize => {
    setPager(state => ({ ...state, pageSize: parseInt(pageSize) }))
  }, [])

  const handleChangePage = useCallback(page => setPager(currentPager => ({ ...currentPager, page })), [setPager])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => () => setFooter(null), [])

  useEffect(() => {
    setFooter(
      <Pagination
        totalCount={pager.totalCount}
        page={pager.page}
        pageSize={pager.pageSize}
        rowsPerPageOptions={[3, 6, 12, 24, 100]}
        onRowsPerPageChange={handleRowsPerPageChange}
        onPageChange={handleChangePage}
        onRefresh={refetch}
      />
    )
  }, [handleRowsPerPageChange, pager.page, pager.pageSize, pager.totalCount, refetch, handleChangePage])

  const handleApplyFilters = useCallback(value => {
    setFilters(value)
  }, [])
  if (loading || !data) {
    return <LoadingFakeText lines={10} />
  }

  return (
    <>
      <ConferenceFilters filters={filters} onApplyFilters={handleApplyFilters} />
      <ConferenceList conferences={data?.conferenceList?.values} />
    </>
  )
}

export default ConferenceListContainer
