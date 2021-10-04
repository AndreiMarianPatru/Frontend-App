import React, { useCallback, useEffect, useState } from 'react'
import ConferenceFilters from './ConferenceFilters'
import ConferenceList from './ConferenceList'
import LoadingFakeText from '@bit/totalsoft_oss.react-mui.fake-text'
import { extractPager, generateDefaultFilters } from 'utils/functions'
import { useQueryWithErrorHandling } from 'hooks/errorHandling'
import { CONFERENCE_LIST_QUERY } from '../gql/queries/ConferenceListQuery'
import { useEmail } from 'hooks/useEmail'
import Pagination from '@bit/totalsoft_oss.react-mui.pagination'
import { useFooter } from 'providers/AreasProvider'
import { useError } from 'hooks/errorHandling'
import { useMutation } from '@apollo/client'
import { ATTEND_CONFERENCE } from '../gql/mutations/AttendConference'
import { DialogDisplay } from '@bit/totalsoft_oss.react-mui.kit.core'
import ConferenceCodeModal from '../components/ConferenceCodeModal'

import { useToast } from '@bit/totalsoft_oss.react-mui.kit.core'
import { useTranslation } from 'react-i18next'
import { emptyString } from 'utils/constants'

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
  const { t } = useTranslation()
  const [, setFooter] = useFooter()
  const addToast = useToast()

  const showError = useError()

  const [code, setCode] = useState()
  const [open, setOpen] = useState(false)

  const [attend] = useMutation(ATTEND_CONFERENCE, {
    onError: showError,
    onCompleted: result => {
      result?.attend && setCode(result?.attend)
      setOpen(true)
      addToast(t('Conferences.SuccessfullyAtteneded'), 'success')
    }
  })

  const handleClose = useCallback(() => {
    setOpen(false)
    setCode(emptyString)
    refetch()
  }, [refetch])

  const handleAttend = useCallback(
    conferenceId => () => {
      const input = {
        attendeeEmail: email,
        conferenceId
        //statusId: 3 // Attended
      }
      attend({ variables: { input } })
    },
    [attend, email]
  )

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
  }, [handleRowsPerPageChange, pager.page, pager.pageSize, pager.totalCount, refetch, handleChangePage, setFooter])

  const handleApplyFilters = useCallback(value => {
    setFilters(value)
  }, [])
  if (loading || !data) {
    return <LoadingFakeText lines={10} />
  }

  return (
    <>
      <ConferenceFilters filters={filters} onApplyFilters={handleApplyFilters} />
      <ConferenceList conferences={data?.conferenceList?.values} onAttend={handleAttend} />
      <DialogDisplay id='showQRCode' open={open} onClose={handleClose} content={<ConferenceCodeModal code={code} />} />
    </>
  )
}

export default ConferenceListContainer
