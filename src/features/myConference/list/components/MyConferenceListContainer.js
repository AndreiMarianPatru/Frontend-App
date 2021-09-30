import React, { useCallback, useEffect, useState } from 'react'
import MyConferenceFilters from './MyConferenceFilters'
import Myconferences from 'utils/mocks/attendeesList'
import MyConferenceList from './MyConferenceList'
import LoadingFakeText from '@bit/totalsoft_oss.react-mui.fake-text'
import { extractPager, generateDefaultFilters } from 'utils/functions'
import { useTranslation } from 'react-i18next'
import { useFooter, useHeader } from 'providers/AreasProvider'
import MyConferenceHeader from './MyConferenceHeader'
import AddButton from '@bit/totalsoft_oss.react-mui.add-button'
import { useHistory } from 'react-router'
import { useQueryWithErrorHandling } from 'hooks/errorHandling'
import { useEmail } from 'hooks/useEmail'
import { CONFERENCE_LIST_QUERY } from 'features/conference/gql/queries/ConferenceListQuery'
import Pagination from '@bit/totalsoft_oss.react-mui.pagination'

const MyConferenceListContainer = () => {
  const { t } = useTranslation()

  const history = useHistory()
  const [email] = useEmail()
  const [filters, setFilters] = useState(generateDefaultFilters())

  const [pager, setPager] = useState({ totalCount: 0, page: 0, pageSize: 3 })

  const { data, loading, refetch } = useQueryWithErrorHandling(CONFERENCE_LIST_QUERY, {
    variables: { pager: extractPager(pager), filters: { ...filters, organiserEmail: email }, email },
    onCompleted: results => {
      const totalCount = results?.conferenceList?.pagination?.totalCount
      setPager(state => ({ ...state, totalCount }))
    }
  })

  const handleAddClick = useCallback(() => {
    history.push('myconference/new')
  }, [history])

  const [, setHeader] = useHeader()
  const [, setFooter] = useFooter()

  useEffect(() => {
    //did mount
    return () => {
      //will unmount
      setHeader(null)
      setFooter(null)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleRowsPerPageChange = useCallback(pageSize => {
    setPager(state => ({ ...state, pageSize: parseInt(pageSize) }))
  }, [])

  const handleChangePage = useCallback(page => setPager(currentPager => ({ ...currentPager, page })), [setPager])

  useEffect(() => {
    setHeader(
      <MyConferenceHeader
        title={t('NavBar.MyConferences')}
        actions={<AddButton key='addButton' title={t('General.Buttons.AddConference')} onClick={handleAddClick} />}
      />
    )
  }, [handleAddClick, setHeader, t])

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
  }, [handleRowsPerPageChange, pager.page, pager.pageSize, pager.totalCount, refetch, handleChangePage, setFooter])

  //const { data, loading } = { data: Myconferences, loading: false }

  const handleApplyFilters = useCallback(value => {
    setFilters(value)
  }, [])
  if (loading || !data) {
    return <LoadingFakeText lines={10} />
  }

  return (
    <>
      <MyConferenceFilters filters={filters} onApplyFilters={handleApplyFilters} />
      <MyConferenceList conferences={data?.conferenceList?.values} />
    </>
  )
}

export default MyConferenceListContainer
