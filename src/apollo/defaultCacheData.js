import { emailKey } from './cacheKeyFunctions'

// Here you define the default values for local apollo state (@client only values)
// https://www.apollographql.com/docs/react/local-state/local-state-management/

//const defaultEmail = { email: emptyString }
const defaultEmail = { email: 'adsdsasadsadamin@totalsoft.ro' }

export const defaults = { [emailKey]: defaultEmail }
