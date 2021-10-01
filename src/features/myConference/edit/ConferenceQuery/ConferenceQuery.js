import { gql } from '@apollo/client'
import Fragments from 'features/conference/gql/queries/fragments'
import Commonfragments from 'features/common/fragments'
export const MYCONFERENCE_LIST_QUERY = gql`
  query conferenceById($id: ID!) {
    conference(id: $id) {
      ...conference
      location {
        ...location
        country {
          ...country
        }
        county {
          ...county
        }
        city {
          ...city
        }
      }
      type {
        ...type
      }
      category {
        ...category
      }
      speakers {
        ...speaker
      }
    }
  }
  ${Fragments.conference}
  ${Fragments.location}
  ${Fragments.speaker}
  ${Commonfragments.category}
  ${Commonfragments.city}
  ${Commonfragments.country}
  ${Commonfragments.county}
  ${Commonfragments.type}
`
