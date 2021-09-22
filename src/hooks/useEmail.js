import { useCallback } from 'react'
import { useApolloLocalStorage } from './apolloLocalStorage'
import { emailKey } from 'apollo/cacheKeyFunctions'

export const useEmail = () => {
  const [storageEmail, setStorageemail] = useApolloLocalStorage(emailKey)
  const email = storageEmail.email
  const setEmail = useCallback(value => setStorageemail({ email: value }), [setStorageemail])

  return [email, setEmail]
}
