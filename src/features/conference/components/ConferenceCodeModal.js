import React from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { Grid } from '@material-ui/core'
import qr from 'assets/img/qr.png'
import Typography from '@bit/totalsoft_oss.react-mui.typography'

const ConferenceCodeModal = ({ code }) => {
  const { t } = useTranslation()
  //return t('Conferences.QRCodeMessage',{code})
  return (
    <Grid container justify={'center'}>
      <Grid item>
        <img src={qr} style={{ maxHeight: '400px' }} alt='QR' />
      </Grid>
      <Grid item>
        <Typography>{t('Conferences.QRCodeMessage', { code })}</Typography>
      </Grid>
    </Grid>
  )
}

ConferenceCodeModal.propTypes = {
  code: PropTypes.object
}

export default ConferenceCodeModal
