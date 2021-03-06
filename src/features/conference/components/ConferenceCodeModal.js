import React from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { Grid } from '@material-ui/core'
import qr from 'assets/img/qr.png'
import Typography from '@bit/totalsoft_oss.react-mui.typography'
import ConferenceItem from './ConferenceItem'
import { isEmpty } from 'ramda'

const ConferenceCodeModal = ({ code, suggestedConferences, onAttend, onWithdraw, onJoin }) => {
  const { t } = useTranslation()
  const link = `https://api.qrserver.com/v1/create-qr-code/?data=${code}`

  //return t('Conferences.QRCodeMessage',{code})
  return (
    <>
      <Grid container justify={'center'}>
        <Grid item xs={12} lg={12}>
          <img src={link} style={{ maxHeight: '400px', alignSelf: 'center' }} alt='QR' />
        </Grid>
        <Grid item xs={12} lg={12}>
          <Typography>{t('Conferences.QRCodeMessage', { code })}</Typography>
        </Grid>
      </Grid>
      {!isEmpty(suggestedConferences) && (
        <Grid container>
          <Grid item lg={12}>
            <Typography>{t('General.SuggestedConference')}</Typography>{' '}
          </Grid>
          {suggestedConferences?.map(conference => (
            <Grid item xs={12} lg={4} key={conference?.id}>
              <ConferenceItem conference={conference} onAttend={onAttend} onWithdraw={onWithdraw} onJoin={onJoin} />
            </Grid>
          ))}
        </Grid>
      )}
    </>
  )
}

ConferenceCodeModal.propTypes = {
  code: PropTypes.object,
  suggestedConferences: PropTypes.array,
  onAttend: PropTypes.func,
  onWithdraw: PropTypes.func,
  onJoin: PropTypes.func
}

export default ConferenceCodeModal
