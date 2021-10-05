import SaveButton from '@bit/totalsoft_oss.react-mui.save-button'
import MyConferenceHeader from 'features/myConference/list/components/MyConferenceHeader'
import { useHeader } from 'providers/AreasProvider'
import React, { useCallback, useEffect, useReducer } from 'react'
import { useTranslation } from 'react-i18next'
//import { types, categories, countries, counties, cities } from 'utils/mocks/addConference'
import MyConference from './MyConference'
import { reducer, initialConference } from '../conferenceState'
import { useHistory, useRouteMatch } from 'react-router'
//import { id } from 'date-fns/locale'
//import { conference as mockConference } from 'utils/mocks/myConference'
import { useQueryWithErrorHandling } from 'hooks/errorHandling'
//import { DICTIONARY_QUERY } from 'features/conference/gql/queries/DictionatyQuery'
import { CONFERENCE_QUERY } from 'features/myConference/edit/ConferenceQuery/ConferenceQuery'
import { useEmail } from 'hooks/useEmail'
import LoadingFakeText from '@bit/totalsoft_oss.react-mui.fake-text/dist/LoadingFakeText'
import { useMutation } from '@apollo/client'
import { useToast } from '@bit/totalsoft_oss.react-mui.kit.core'
import { useError } from 'hooks/errorHandling'
import { UPDATE_CONFERENCE } from '../gql/UpdateConference'

const MyConferenceContainer = () => {
  const { t } = useTranslation()
  const [, setHeader] = useHeader()

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => () => setHeader(null), [])
  const [email] = useEmail()
  const addToast = useToast()
  const match = useRouteMatch()
  const conferenceId = match.params.id
  const isNew = conferenceId === 'new'
  const history = useHistory()
  const showError = useError()

  const [conference, dispatch] = useReducer(reducer, initialConference)

  const { data: dataDict, loading } = useQueryWithErrorHandling(CONFERENCE_QUERY, {
    variables: { id: conferenceId, isNew },
    onCompleted: result => result?.conference && dispatch({ type: 'resetConference', payload: result.conference })
  })

  const [updateConference, { loading: saving }] = useMutation(
    UPDATE_CONFERENCE,

    {
      onCompleted: result => {
        addToast(t('MyConferences.SavingSucceeded'), 'success')
        if (isNew) {
          history.push(`/myconference/${result?.saveConference?.id}`)
          return
        }
        result?.saveConference && dispatch({ type: 'resetConference', payload: result?.saveConference })
      },
      onError: showError
    }
  )

  const handleSave = useCallback(() => {
    const { id, name, startDate, endDate, deletedSpeakers, type, location, category, speakers } = conference
    const { city, county, country, ...locationData } = location
    const input = {
      id,
      name,
      startDate,
      endDate,
      organizerEmail: email,
      deletedSpeakers,
      type,
      category,
      location: { ...locationData, cityId: city.id, countyId: county.id, countryId: country.id },
      speakers
    }
    updateConference({ variables: { input } })
  }, [conference, email, updateConference])

  // const { loading, data } = {
  //   loading: false,
  //   data: {
  //     typeList: types,
  //     categoryList: categories,
  //     countryList: countries,
  //     countyList: counties,
  //     cityList: cities
  //  }
  // }

  useEffect(() => {
    setHeader(
      <MyConferenceHeader title={conference.name} actions={<SaveButton title={t('General.Buttons.Save')} onClick={handleSave} />} />
    )
  }, [conference.name, handleSave, setHeader, t])

  if (loading) return <LoadingFakeText lines={10} />

  if (loading || saving) return <LoadingFakeText lines={10}></LoadingFakeText>
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
