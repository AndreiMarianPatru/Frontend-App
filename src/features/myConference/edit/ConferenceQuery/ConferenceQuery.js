import { gql } from '@apollo/client'

import CommonFragments from 'features/conference/gql/queries/fragments'
import DictionaryFragments from 'features/common/fragments'

export const CONFERENCE_QUERY = gql`
  query conferenceData($id: ID!, $isNew: Boolean!) {
    conference(id: $id) @skip(if: $isNew) {
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
    typeList {
      ...type
    }
    categoryList {
      ...category
    }
    cityList {
      ...city
    }
    countyList {
      ...county
    }
    countryList {
      ...country
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
