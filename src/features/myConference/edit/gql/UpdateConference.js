import { gql } from '@apollo/client'
import CommonFragments from 'features/conference/gql/queries/fragments'
import DictionaryFragments from 'features/common/fragments'
export const UPDATE_CONFERENCE = gql`
  mutation saveConference($input: ConferenceInput!) {
    saveConference(input: $input) {
      ...conference
      type {
        ...type
      }
      category {
        ...category
      }
      location {
        ...location
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
  ${CommonFragments.conference}
  ${CommonFragments.speaker}
  ${CommonFragments.location}
  ${DictionaryFragments.type}
  ${DictionaryFragments.category}
  ${DictionaryFragments.city}
  ${DictionaryFragments.county}
  ${DictionaryFragments.country}
`
