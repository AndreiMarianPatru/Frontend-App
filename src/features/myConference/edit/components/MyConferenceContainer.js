import SaveButton from '@bit/totalsoft_oss.react-mui.save-button'
import MyConferenceHeader from 'features/myConference/list/components/MyConferenceHeader'
import { useHeader } from 'providers/AreasProvider'
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { types, categories, countries, counties, cities } from 'utils/mocks/addConference'
import MyConference from './MyConference'

const MyConferenceContainer = () => {
  const { t } = useTranslation()
  const [, setHeader] = useHeader()
  useEffect(() => () => setHeader(null, []))

  useEffect(() => {
    setHeader(<MyConferenceHeader actions={<SaveButton title={t('General.Buttons.Save')} />} />)
  }, [setHeader, t])

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
      types={data?.typeList}
      categories={data?.categoryList}
      countries={data?.countryList}
      counties={data?.countyList}
      cities={data?.cityList}
    />
  )
}

export default MyConferenceContainer
