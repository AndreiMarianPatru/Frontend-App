import React, { useCallback, useState } from 'react'
import MyConferenceFilters from './MyConferenceFilters'
import Myconferences from 'utils/mocks/attendeesList'
import MyConferenceList from './MyConferenceList'
import LoadingFakeText from '@bit/totalsoft_oss.react-mui.fake-text'
import { generateDefaultFilters } from 'utils/functions'

const MyConferenceListContainer = () => {
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
