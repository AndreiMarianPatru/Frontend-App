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
import { DICTIONARY_QUERY } from 'features/conference/gql/queries/DictionatyQuery'
import { CONFERENCE_QUERY, MYCONFERENCE_LIST_QUERY } from 'features/myConference/edit/ConferenceQuery/ConferenceQuery'
import { useEmail } from 'hooks/useEmail'
import LoadingFakeText from '@bit/totalsoft_oss.react-mui.fake-text/dist/LoadingFakeText'

const MyConferenceContainer = () => {
  const { t } = useTranslation()
  const [, setHeader] = useHeader()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => () => setHeader(null), [])
  const [email] = useEmail()

  const match = useRouteMatch()
  const conferenceId = match.params.id
  const isNew = conferenceId === 'new'

  const [conference, dispatch] = useReducer(reducer, initialConference)

  const { data: dataDict, loading: loadingCeva } = useQueryWithErrorHandling(CONFERENCE_QUERY, {
    variables: { id: conferenceId, isNew },
    onCompleted: result => result?.conference && dispatch({ type: 'resetConference', payload: result.conference })
  })

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

  useEffect(() => {
    setHeader(<MyConferenceHeader title={conference.name} actions={<SaveButton title={t('General.Buttons.Save')} />} />)
  }, [conference.name, setHeader, t])

  if (loading || loadingCeva) return <LoadingFakeText lines={10} />

  return (
    <MyConference
      conference={conference}
      dispatch={dispatch}
      types={dataDict?.typeList}
      categories={dataDict?.categoryList}
      countries={dataDict?.countryList}
      counties={dataDict?.countyList}
      cities={dataDict?.cityList}
    />
  )
}

export default MyConferenceContainer
