import React from 'react'
import ConferenceFilters from './ConferenceFilters'
import conferences from 'utils/mocks/attendeesList'
import ConferenceList from './ConferenceList'
import LoadingFakeText from '@bit/totalsoft_oss.react-mui.fake-text'

const ConferenceListContainer = () => {
  const { data, loading } = { data: conferences, loading: false }
  if (loading) {
    return <LoadingFakeText lines={10} />
  }

  return (
    <>
      <ConferenceFilters />
      <ConferenceList conferences={data} />
    </>
  )
}

export default ConferenceListContainer
