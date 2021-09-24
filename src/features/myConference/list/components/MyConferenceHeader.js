import { Grid } from '@material-ui/core'
import React from 'react'
import Typography from '@bit/totalsoft_oss.react-mui.typography'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({ title: { ...theme.header.title, width: '100%' } }))

const MyConferenceHeader = props => {
  const { title, actions } = props

  const classes = useStyles()
  return (
    <Grid container justifyContent='flex-start' alignItems='center'>
      <Grid item xs={6} sm={9} lg={9} container justifyContent='flex-start'>
        <Typography variant='subtitle1' className={classes.title}>
          {' '}
          {title}
        </Typography>
      </Grid>
      <Grid item xs={3} sm={3} lg={3} container justify='flex-end' spacing={1}>
        {actions}
      </Grid>
    </Grid>
  )
}

MyConferenceHeader.propTypes = {
  title: PropTypes.string,
  actions: PropTypes.node
}

export default MyConferenceHeader
