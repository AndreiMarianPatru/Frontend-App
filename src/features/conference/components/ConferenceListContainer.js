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
import { useLazyQuery, useMutation } from '@apollo/client'
import { ATTEND_CONFERENCE } from '../gql/mutations/AttendConference'
import { WITHDRAW_CONFERENCE } from '../gql/mutations/WithdrawConference'
import { JOIN_MUTATION } from '../gql/mutations/JoinConference'
import { DialogDisplay } from '@bit/totalsoft_oss.react-mui.kit.core'
import ConferenceCodeModal from '../components/ConferenceCodeModal'
import ConferenceJoinModal from '../components/ConferenceJoinModal'
import { useHistory, useRouteMatch } from 'react-router'
import { useToast } from '@bit/totalsoft_oss.react-mui.kit.core'
import { useTranslation } from 'react-i18next'
import { emptyArray, emptyString } from 'utils/constants'

const ConferenceListContainer = () => {
  const [pager, setPager] = useState({ totalCount: 0, page: 0, pageSize: 3 })
  const [filters, setFilters] = useState(generateDefaultFilters())
  const [email] = useEmail()
  const { t } = useTranslation()
  const [, setFooter] = useFooter()
  const addToast = useToast()
  const showError = useError()
  const [code, setCode] = useState()
  const [open, setOpen] = useState(false)
  const [suggestedConferences, setSuggestedConferences] = useState(emptyArray)
  const history = useHistory()
  const [attendees, setAttendees] = useState()
  const [organizerEmail, setOrganizerEmail] = useState()

  const [openJoin, setOpenJoin] = useState(false)

  const { data, loading, refetch } = useQueryWithErrorHandling(CONFERENCE_LIST_QUERY, {
    variables: { pager: extractPager(pager), filters, email },
    onCompleted: results => {
      const totalCount = results?.conferenceList?.pagination?.totalCount
      setPager(state => ({ ...state, totalCount }))
    }
  })

  const [attend] = useMutation(ATTEND_CONFERENCE, {
    onError: showError,
    onCompleted: result => {
      result?.attend && setCode(result?.attend)
      setCode(result?.attend.code)
      setSuggestedConferences(result?.attend.suggestedConferences)
      setOpen(true)
      addToast(t('Conferences.SuccessfullyAttended'), 'success')
    }
  })

  const date = Date.now()

  const [join] = useMutation(JOIN_MUTATION, {
    onError: showError,
    onCompleted: result => {
      result?.attendeesEmails && setAttendees(result?.attendeesEmails) && setOrganizerEmail(result?.organizerEmail)
      setAttendees(result?.join?.attendeesEmails)
      setOrganizerEmail(result?.join?.organizerEmail)
      const ana = result?.join?.organizerEmail
      const bana = result?.join?.attendeesEmails
      history.push({
        pathname: `/conference/${result?.join?.conference?.id}`,
        state: { organizerEmail: result?.join?.organizerEmail, attendees: result?.join?.attendeesEmails }
      })

      addToast(t('Conferences.SuccessfullyJoined'), 'success')
    }
  })

  const [withdraw] = useMutation(WITHDRAW_CONFERENCE, {
    onError: showError,
    onCompleted: () => {
      addToast(t('Conferences.SuccessfullyWithdrawn'), 'success')
      refetch()
    }
  })
  const handleJoin = useCallback(
    conferenceId => () => {
      const input = {
        conferenceId,
        attendeeEmail: email
        //statusId: 1 // Joined
      }
      join({ variables: { input } })
    },
    [join, email]
  )
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

  const handleWithdraw = useCallback(
    conference => () => {
      const input = {
        attendeeEmail: email,
        conferenceId: conference.id
      }
      withdraw({ variables: { input } })
    },
    [withdraw, email]
  )

  const handleClose = useCallback(() => {
    setOpen(false)
    setCode(emptyString)
    refetch()
  }, [refetch])

  const handleCloseJoin = useCallback(() => {
    setOpenJoin(false)

    refetch()
  }, [refetch])

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
      <ConferenceList conferences={data?.conferenceList?.values} onAttend={handleAttend} onWithdraw={handleWithdraw} onJoin={handleJoin} />
      <DialogDisplay
        id='showQRCode'
        open={open}
        onClose={handleClose}
        title={t('General.Congratulations')}
        content={
          <ConferenceCodeModal
            code={code}
            suggestedConferences={suggestedConferences}
            onAttend={handleAttend}
            onWithdraw={handleWithdraw}
            onJoin={handleJoin}
          />
        }
      />
      <DialogDisplay
        id='showJoin'
        open={openJoin}
        onClose={handleCloseJoin}
        title={t('General.Congratulations')}
        content={<ConferenceJoinModal attendees={attendees} organizerEmail={organizerEmail} />}
      />
    </>
  )
}

export default ConferenceListContainer
