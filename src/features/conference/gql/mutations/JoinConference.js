import { gql } from '@apollo/client'
export const JOIN_MUTATION = gql`
  mutation join($input: Attendee!) {
    join(input: $input) {
      attendeesEmails
      organizerEmail
    }
  }
`
