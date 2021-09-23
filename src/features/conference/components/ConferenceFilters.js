import React from 'react'
import SearchIcon from '@material-ui/icons/Search'
import { Grid } from '@material-ui/core'

import DateTime from '@bit/totalsoft_oss.react-mui.date-time'

import Button from '@bit/totalsoft_oss.react-mui.button'
import IconCard from '@bit/totalsoft_oss.react-mui.icon-card'
import { useTranslation } from 'react-i18next'

const ConferenceFilters = _props => {
  const { t } = useTranslation()

  return (
    <>
      <IconCard
        icon={SearchIcon}
        iconColor='theme'
        content={
          <Grid container spacing={2}>
            <Grid item xs={12} lg={3}>
              <DateTime label={t('Conferences.Filters.StartDate')} clearable />
            </Grid>
            <Grid item xs={12} lg={3}>
              <DateTime label={t('Conferences.Filters.EndDate')} clearable />
            </Grid>
          </Grid>
        }
      />
      <Button size={'sm'} color={'primary'} right={true}>
        {t('General.Buttons.ResetFilters')}
      </Button>
      <Button size={'sm'} color={'primary'} right={true}>
        {t('General.Buttons.ApplyFilters')}
      </Button>
    </>
  )
}

export default ConferenceFilters
