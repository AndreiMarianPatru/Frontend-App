import { useQuery } from '@apollo/client'
import { LoadingFakeText } from '@bit/totalsoft_oss.react-mui.kit.core'
import { MY_FIRST_QUERY } from './queries/MyFirstQuery'
import React from 'react'

function HelloWorld() {
  const { loading, data } = useQuery(MY_FIRST_QUERY)
  if (loading) {
    return <LoadingFakeText lines={10} />
  }

  return data?.myFirstEndpoint
}

export default HelloWorld
