import React, { useCallback, useEffect, useState } from 'react'
import SearchIcon from '@material-ui/icons/Search'
import { Grid } from '@material-ui/core'

import DateTime from '@bit/totalsoft_oss.react-mui.date-time'

import Button from '@bit/totalsoft_oss.react-mui.button'
import IconCard from '@bit/totalsoft_oss.react-mui.icon-card'
import { useTranslation } from 'react-i18next'
import PropTypes from 'prop-types'
import { generateDefaultFilters } from 'utils/functions'

const MyConferenceFilters = props => {
  const { t } = useTranslation()
  const { filters, onApplyFilters } = props
  const [startDate, setStartDate] = useState(filters.startDate)
  const [endDate, setEndDate] = useState(filters.endDate)

  useEffect(() => {
    setStartDate(filters.startDate)
    setEndDate(filters.endDate)
  }, [filters])

  const handleApplyClick = useCallback(() => onApplyFilters({ startDate, endDate }), [onApplyFilters, endDate, startDate])
  const handleKeyPressed = useCallback(({ keyCode }) => keyCode === 13 && handleApplyClick(), [handleApplyClick])
  const handleResetClick = useCallback(() => {
    const defaultFilters = generateDefaultFilters()
    onApplyFilters(defaultFilters)
  }, [])

  return (
    <>
      <IconCard
        icon={SearchIcon}
        iconColor='theme'
        content={
          <Grid container spacing={2} onKeyDown={handleKeyPressed}>
            <Grid item xs={12} lg={3}>
              <DateTime label={t('Conferences.Filters.StartDate')} clearable value={startDate} onChange={setStartDate} />
            </Grid>
            <Grid item xs={12} lg={3}>
              <DateTime label={t('Conferences.Filters.EndDate')} clearable value={endDate} onChange={setEndDate} />
            </Grid>
          </Grid>
        }
      />
      <Button size={'sm'} color={'primary'} right={true} onClick={handleResetClick}>
        {t('General.Buttons.ResetFilters')}
      </Button>
      <Button size={'sm'} color={'primary'} right={true} onClick={handleApplyClick}>
        {t('General.Buttons.ApplyFilters')}
      </Button>
    </>
  )
}
MyConferenceFilters.propTypes = {
  filters: PropTypes.object,
  onApplyFilters: PropTypes.func
}

export default MyConferenceFilters
