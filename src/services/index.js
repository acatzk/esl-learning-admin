import { apolloProvider } from './apollo'
import { fb, db, auth, messaging, currentUser } from './adminFirebase'
import { fb2 } from './usersFirebase'

export {
    fb,
    db,
    fb2,
    auth,
    messaging,
    currentUser,
    apolloProvider,
}