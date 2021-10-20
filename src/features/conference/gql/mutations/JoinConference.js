import { gql } from '@apollo/client'
import CommonFragments from 'features/conference/gql/queries/fragments'

export const JOIN_MUTATION = gql`
  mutation join($input: Attendee!) {
    join(input: $input) {
      attendeesEmails
      organizerEmail
      conference {
        ...conference
      }
    }
  }
  ${CommonFragments.conference}
`
