import React, { useCallback, useEffect, useState } from 'react'
import MyConferenceFilters from './MyConferenceFilters'
import Myconferences from 'utils/mocks/attendeesList'
import MyConferenceList from './MyConferenceList'
import LoadingFakeText from '@bit/totalsoft_oss.react-mui.fake-text'
import { generateDefaultFilters } from 'utils/functions'
import { useTranslation } from 'react-i18next'
import { useHeader } from 'providers/AreasProvider'
import MyConferenceHeader from './MyConferenceHeader'
import AddButton from '@bit/totalsoft_oss.react-mui.add-button'
import { useHistory } from 'react-router'

const MyConferenceListContainer = () => {
  const { t } = useTranslation()

  const history = useHistory()

  const handleAddClick = useCallback(() => {
    history.push('myconference/new')
  }, [history])

  const [, setHeader] = useHeader()

  useEffect(() => {
    //did mount
    return () => {
      //will unmount
      setHeader(null)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    setHeader(
      <MyConferenceHeader
        title={t('NavBar.MyConferences')}
        actions={<AddButton key='addButton' title={t('General.Buttons.AddConference')} onClick={handleAddClick} />}
      />
    )
  }, [setHeader, t])

  const [filters, setFilters] = useState(generateDefaultFilters())
  const { data, loading } = { data: Myconferences, loading: false }

  const handleApplyFilters = useCallback(value => {
    setFilters(value)
  }, [])
  if (loading) {
    return <LoadingFakeText lines={10} />
  }

  return (
    <>
      <MyConferenceFilters filters={filters} onApplyFilters={handleApplyFilters} />
      <MyConferenceList conferences={data} />
    </>
  )
}

export default MyConferenceListContainer
