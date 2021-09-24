import React from 'react'
import PropTypes from 'prop-types'
import { Td, Tr } from 'react-super-responsive-table'
import tableStyles from 'assets/jss/components/tableStyle'
import { makeStyles, Checkbox } from '@material-ui/core'
import CustomTextField from '@bit/totalsoft_oss.react-mui.custom-text-field'
import DeleteButton from '@bit/totalsoft_oss.react-mui.delete-button'
import { useTranslation } from 'react-i18next'

const useStyles = makeStyles(tableStyles)

const MyConferenceSpeakerData = props => {
  const { speaker, dispatch, index } = props
  const classes = useStyles()
  const { t } = useTranslation()

  return (
    <Tr>
      <Td className={classes.tableContent}>
        <CustomTextField fullWidth />
      </Td>
      <Td className={classes.tableContent}>
        <CustomTextField fullWidth />
      </Td>
      <Td className={classes.tableContent}>
        <CustomTextField fullWidth isNumeric />
      </Td>
      <Td className={classes.tableContent}>
        <Checkbox color='secondary' />
      </Td>
      <Td className={classes.tableContent}>
        <DeleteButton title={t('General.Buttons.DeleteSpeaker')} />
      </Td>
    </Tr>
  )
}
MyConferenceSpeakerData.propTypes = {
  speaker: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired
}

export default MyConferenceSpeakerData
