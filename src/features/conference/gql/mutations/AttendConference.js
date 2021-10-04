import { gql } from '@apollo/client'
import CommonFragments from 'features/conference/gql/queries/fragments'
import DictionaryFragments from 'features/common/fragments'

export const ATTEND_CONFERENCE = gql`
  mutation attend($input: Attendee!) {
    attend(input: $input) {
      code
      suggestedConferences {
        ...conference
        type {
          ...type
        }
        category {
          ...category
        }
        location {
          id
          address
          city {
            ...city
          }
          county {
            ...county
          }
          country {
            ...country
          }
        }
        speakers {
          ...speaker
        }
      }
    }
  }
  ${CommonFragments.conference}
  ${CommonFragments.speaker}

  ${DictionaryFragments.type}
  ${DictionaryFragments.category}
  ${DictionaryFragments.city}
  ${DictionaryFragments.county}
  ${DictionaryFragments.country}
`

export default ATTEND_CONFERENCE
