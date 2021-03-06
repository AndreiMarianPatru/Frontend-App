/* eslint-disable react/jsx-no-bind */
import React from 'react'
import { Switch, Redirect } from 'react-router-dom'

import CustomRoute from '../components/routing/CustomRoute'

import Welcome from 'features/Welcome/welcome'
import { Forbidden, NotFound } from '@bit/totalsoft_oss.react-mui.kit.core'
import HelloWorld from 'features/helloWorld/HelloWorld'
import { useEmail } from 'hooks/useEmail'
import ConferenceListContainer from 'features/conference/components/ConferenceListContainer'
import ConferenceJoinedContainer from 'features/conference/components/ConferenceJoinedContainer'
import MyConferenceListContainer from 'features/myConference/list/components/MyConferenceListContainer'
import MyConferenceContainer from 'features/myConference/edit/components/MyConferenceContainer'

export default function AppRoutes() {
  const [email] = useEmail()

  if (!email) {
    return (
      <Switch>
        <CustomRoute isPrivate={false} exact path='/welcome' component={Welcome} />
        <Redirect from='/' to='/welcome' />
      </Switch>
    )
  }
  return (
    <Switch>
      <CustomRoute isPrivate={false} exact path='/helloWorld' component={HelloWorld} />
      <CustomRoute isPrivate={false} exact path='/welcome' component={Welcome} />
      <CustomRoute isPrivate={false} exact path='/conference' component={ConferenceListContainer} />
      <CustomRoute isPrivate={false} exact path='/myconference' component={MyConferenceListContainer} />
      <CustomRoute isPrivate={false} exact path='/myconference/:id(new)' component={MyConferenceContainer} />
      <CustomRoute isPrivate={false} exact path='/myconference/:id(\d+)' component={MyConferenceContainer} />
      <CustomRoute isPrivate={false} exact path='/conference/:id(\d+)' component={ConferenceJoinedContainer} />
      <Redirect exact from='/' to='/welcome' />
      <CustomRoute isPrivate={false} exact path='/forbidden' component={Forbidden} />
      <CustomRoute isPrivate={false} render={() => <NotFound title='PageNotFound'></NotFound>} />
    </Switch>
  )
}
