import { Typography } from '@material-ui/core'
import React from 'react'
import ReactPlayer from 'react-player'
import YouTubePlayer from 'react-player/lib/players/YouTube'

const ConferenceJoinedContainer = () => {
  return (
    <>
      <div className='App'>
        <Typography>Getting Started With React.js: Welcome</Typography>
        <ReactPlayer url='https://www.youtube.com/watch?v=FrCgZZXXK9I&ab_channel=EnvatoTuts%2B' controls={true} />
      </div>
    </>
  )
}

export default ConferenceJoinedContainer
