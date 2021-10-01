import React, { Fragment, useCallback, useState } from 'react'
import { Typography, Grid } from '@material-ui/core'
import IconButton from '@bit/totalsoft_oss.react-mui.icon-button'
import { CustomTextField } from '@bit/totalsoft_oss.react-mui.kit.core'
import KeyboardReturnIcon from '@material-ui/icons/KeyboardReturn'
import { useTranslation } from 'react-i18next'
import { emptyString } from 'utils/constants'
import { useApolloLocalStorage } from 'hooks/apolloLocalStorage'
import { useEmail } from 'hooks/useEmail'
import { validateEmail } from 'utils/functions'
import { useToast } from '@bit/totalsoft_oss.react-mui.kit.core'

function Welcome() {
  const { t } = useTranslation()

  const [isValid, setIsValid] = useState(true)
  const addToast = useToast()

  const [email, setEmail] = useEmail()
  const [textFieldValue, setTextFieldValue] = useState(email)

  const handleTextFieldValueChange = useCallback(event => setTextFieldValue(event.target.value), [])

  const handleButtonClick = useCallback(() => {
    const isEmailValid = validateEmail(textFieldValue)
    setEmail(isEmailValid ? textFieldValue : emptyString)
    // if(isEmailValid==false)
    //   addToast('Invalid Email!', 'failure')
    // return (
    //<Fragment>
    //   <Typography>Invalid Email!</Typography>
    //   <Grid>Enter another email!</Grid>
    // </Fragment>
    //)
    setIsValid(isEmailValid)
  }, [setEmail, textFieldValue])

  const handleKeyDown = useCallback(
    event => {
      if (event.keyCode === 13) {
        handleButtonClick()
      }
    },
    [handleButtonClick]
  )

  return (
    <Grid container justifyContent='center' alignItems='center' alignContent='center' direction='column' spacing={10}>
      <Grid item xs={4}>
        <Typography variant='h5'>{t('LandingPage.Title')}</Typography>
      </Grid>
      <Grid item container justifyContent='center' alignItems='center' alignContent='center' direction='column' spacing={1}>
        <Grid item xs={12}>
          <Typography variant='caption'>{t('LandingPage.Subtitle')}</Typography>
        </Grid>
        <Grid item xs={12}>
          <CustomTextField
            fullWidth
            endAdornment={
              <IconButton size='small' color='theme' aria-label='go' onClick={handleButtonClick}>
                <KeyboardReturnIcon fontSize='small' />
              </IconButton>
            }
            debounceBy={0}
            value={textFieldValue}
            onChange={handleTextFieldValueChange}
            onKeyDown={handleKeyDown}
            error={!isValid}
            id={!isValid && 'outlined-error-helper-text'}
            label={!isValid && 'Error'}
            helperText={!isValid && t('LandingPage.BadEmail')}
            variant='outlined'
          />
        </Grid>
      </Grid>
    </Grid>
  )
}

export default Welcome
