import React from 'react'
import HomeIcon from '@material-ui/icons/Home'
import Settings from '@material-ui/icons/Settings'
import EventIcon from '@material-ui/icons/Event'
import { EventNoteRounded } from '@material-ui/icons'

const menuItems = [
  { icon: <HomeIcon />, text: 'NavBar.Welcome', path: '/welcome', name: 'Welcome' },
  { icon: <Settings />, text: 'NavBar.Settings', path: '/settings', name: 'Settings' },
  { icon: <HomeIcon />, text: 'NavBar.MyFirstMenu', path: '/helloWorld', name: 'MyFirstMenu' },
  { icon: <EventIcon />, text: 'NavBar.Conferences', path: '/conference', name: 'Conferences' },
  { icon: <EventNoteRounded />, text: 'NavBar.MyConferences', path: '/myconference', name: 'MyConferences' }
]

export default menuItems
