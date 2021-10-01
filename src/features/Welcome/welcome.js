import React, { useState, useCallback } from 'react'
import { Typography, Grid, InputAdornment } from '@material-ui/core'
import { CustomTextField } from '@bit/totalsoft_oss.react-mui.kit.core'
import { useTranslation } from 'react-i18next'
import IconButton from '@bit/totalsoft_oss.react-mui.icon-button'
import KeyboardReturnIcon from '@material-ui/icons/KeyboardReturn'
import { useEmail } from 'hooks/useEmail'
import { validateEmail } from 'utils/functions'
function Welcome() {
  const { t } = useTranslation()
  const [storagedEmail, setEmailStoraged] = useEmail()
  const [email, setEmail] = useState(storagedEmail)
  const [isValid, setValid] = useState(true)
  const memoizedCallback = useCallback(e => {
    setEmail(e.target.value)
  }, [])
  const onButtonClicked = useCallback(() => {
    if (validateEmail(email)) {
      setEmailStoraged(email)
    } else {
      setEmailStoraged('')
      setEmail('')
    }
    setValid(validateEmail(email))
  }, [email, setEmailStoraged])
  const tastaApasata = useCallback(
    e => {
      if (e.charCode === 13) {
        onButtonClicked(email)
      }
    },
    [email, onButtonClicked]
  )
  // addToast('This is my toast', 'success')
  return (
    <Grid container direction='column' justifyContent='space-between' alignItems='center' spacing={8}>
      <Grid item xs={12} background-color='111111'>
        <Typography variant='h5'>{t('LandingPage.Hello')}</Typography>
      </Grid>
      <Grid container item direction='column' alignItems='center'>
        <Grid item>
          <Typography variant='caption'>{t('LandingPage.Subtitle')}</Typography>
        </Grid>
        <Grid item>
          <CustomTextField
            onChange={memoizedCallback}
            onKeyPress={tastaApasata}
            error={!isValid}
            helperText={!isValid && t('LandingPage.Error')}
            value={email}
            endAdornment={
              <InputAdornment position='end'>
                <IconButton size='small' color='theme' aria-label='go' onClick={onButtonClicked}>
                  <KeyboardReturnIcon fontSize='small' />
                </IconButton>
              </InputAdornment>
            }
          />
        </Grid>
      </Grid>
    </Grid>
  )
}
export default Welcome
