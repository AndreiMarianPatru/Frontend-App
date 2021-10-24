import { Typography } from '@material-ui/core'
import React from 'react'
import ReactPlayer from 'react-player'
import YouTubePlayer from 'react-player/lib/players/YouTube'
import PropTypes from 'prop-types'
import { useEffect } from 'react'
import { useLocation } from 'react-router'

const ConferenceJoinedContainer = props => {
  const location = useLocation()

  return (
    <>
      <div className='App'>
        <Typography>Getting Started With React.js: Welcome</Typography>
        <ReactPlayer url='https://www.youtube.com/watch?v=FrCgZZXXK9I&ab_channel=EnvatoTuts%2B' controls={true} />
        <Typography>{`Conferinta organizata de: ${location.state.organizerEmail}`}</Typography>
        <Typography>{`La aceasta conferinta mai participa de: ${location.state.attendees}`}</Typography>
      </div>
    </>
  )
}

ConferenceJoinedContainer.propTypes = {
  attendees: PropTypes.array,
  organizerEmail: PropTypes.string
}

export default ConferenceJoinedContainer
