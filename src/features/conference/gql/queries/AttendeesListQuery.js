import { gql } from '@apollo/client'
export const ATTENDEES_QUERY = gql`
  mutation withdraw($input: Attendee!) {
    withdraw(input: $input)
  }
`
