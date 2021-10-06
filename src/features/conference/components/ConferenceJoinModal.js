import React from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { Grid } from '@material-ui/core'
import qr from 'assets/img/qr.png'
import Typography from '@bit/totalsoft_oss.react-mui.typography'
import ConferenceItem from './ConferenceItem'
import { isEmpty } from 'ramda'

const CoferenceJoinModal = () => {
  const { t } = useTranslation()

  return (
    <>
      <Typography> Joined</Typography>
    </>
  )
}

CoferenceJoinModal.propTypes = {}

export default CoferenceJoinModal
