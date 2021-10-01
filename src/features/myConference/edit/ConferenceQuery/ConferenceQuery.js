import { gql } from '@apollo/client'
import Fragments from 'features/conference/gql/queries/fragments'
export const MYCONFERENCE_LIST_QUERY = gql`
  query conferenceById($id: ID!) {
    conference(id: $id) {
      ...conference
      location {
        id
        name
        country {
          id
          name
          code
        }
        county {
          id
          name
          code
        }
        city {
          id
          name
          code
        }
        address
        latitude
        longitude
      }
      type {
        id
        name
      }
      category {
        id
        name
      }
      speakers {
        id
        name
        nationality
        rating

        isMainSpeaker
      }
    }
  }
  ${Fragments.conference}
`
