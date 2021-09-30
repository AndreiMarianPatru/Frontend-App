import SaveButton from '@bit/totalsoft_oss.react-mui.save-button'
import MyConferenceHeader from 'features/myConference/list/components/MyConferenceHeader'
import { useHeader } from 'providers/AreasProvider'
import React, { useEffect, useReducer } from 'react'
import { useTranslation } from 'react-i18next'
import { types, categories, countries, counties, cities } from 'utils/mocks/addConference'
import MyConference from './MyConference'
import { reducer, initialConference } from '../conferenceState'
import { useRouteMatch } from 'react-router'
import { id } from 'date-fns/locale'
import { conference as mockConference } from 'utils/mocks/myConference'
import { useQueryWithErrorHandling } from 'hooks/errorHandling'
import { CONFERENCE_LIST_QUERY } from 'features/conference/gql/queries/ConferenceListQuery'
import { useEmail } from 'hooks/useEmail'

const MyConferenceContainer = () => {
  const { t } = useTranslation()
  const [, setHeader] = useHeader()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => () => setHeader(null), [])
  const [email] = useEmail()

  const match = useRouteMatch()
  const conferenceId = match.params.id
  const isNew = conferenceId === 'new'
  useEffect(() => {
    if (!isNew) {
      dispatch({ type: 'resetConference', payload: mockConference })
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const [conference, dispatch] = useReducer(reducer, initialConference)

  useEffect(() => {
    setHeader(<MyConferenceHeader title={conference.name} actions={<SaveButton title={t('General.Buttons.Save')} />} />)
  }, [conference.name, setHeader, t])

  const { loading, data } = {
    loading: false,
    data: {
      typeList: types,
      categoryList: categories,
      countryList: countries,
      countyList: counties,
      cityList: cities
    }
  }

  return (
    <MyConference
      conference={conference}
      dispatch={dispatch}
      types={data?.typeList}
      categories={data?.categoryList}
      countries={data?.countryList}
      counties={data?.countyList}
      cities={data?.cityList}
    />
  )
}

export default MyConferenceContainer
