import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import { Td, Tr } from 'react-super-responsive-table'
import tableStyles from 'assets/jss/components/tableStyle'
import { makeStyles, Checkbox } from '@material-ui/core'
import CustomTextField from '@bit/totalsoft_oss.react-mui.custom-text-field'
import DeleteButton from '@bit/totalsoft_oss.react-mui.delete-button'
import { useTranslation } from 'react-i18next'
import { onCheckBoxChange, onTextBoxChange } from 'utils/propertyChangeAdapters'

const useStyles = makeStyles(tableStyles)

const MyConferenceSpeakerData = props => {
  const { speaker, dispatch } = props
  const { name, nationality, rating, isMainSpeaker, id } = speaker

  const classes = useStyles()
  const { t } = useTranslation()

  const handleDelete = useCallback(() => dispatch({ type: 'deleteSpeaker', payload: speaker.id }), [dispatch, speaker.id])

  //const handleDispatch = type=>value=>dispatch({type,payload:{id,[type]:value}})

  //const namehandleDispatch= useCallback(()=>dispatch({type:'speakerName',payload:{id,name:event.target.value}}),[dispatch,id])
  const generalhandleDispatch = (type, prop) => value => dispatch({ type, payload: { id, [prop]: value } })

  return (
    <Tr>
      <Td className={classes.tableContent}>
        <CustomTextField fullWidth value={name} onChange={onTextBoxChange(generalhandleDispatch('speakerName', 'name'))} />
      </Td>
      <Td className={classes.tableContent}>
        <CustomTextField fullWidth value={nationality} onChange={onTextBoxChange(generalhandleDispatch('nationality', 'nationality'))} />
      </Td>
      <Td className={classes.tableContent}>
        <CustomTextField fullWidth isNumeric value={rating} onChange={generalhandleDispatch('rating', 'rating')} />
      </Td>
      <Td className={classes.tableContent}>
        <Checkbox
          color='secondary'
          checked={Boolean(isMainSpeaker)}
          onChange={onCheckBoxChange(generalhandleDispatch('isMainSpeaker', 'isMainSpeaker'))}
        />
      </Td>
      <Td className={classes.tableContent}>
        <DeleteButton title={t('General.Buttons.DeleteSpeaker')} onClick={handleDelete} />
      </Td>
    </Tr>
  )
}
MyConferenceSpeakerData.propTypes = {
  speaker: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
}

export default MyConferenceSpeakerData
