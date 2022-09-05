import {
    CHAT_ROUTER,
    LOGIN_ROUTER,
    PRIVATE_CORRESPONDENCE_ROUTER,
    SING_UP_ROUTER,
} from '../utils/consts'
import Login from '../components/login/Login'
import SingUp from '../components/signUp/SignUp'
import Chat from '../components/chat/Chat'
import PrivateCorrespondence from '../components/privateCorrespondence/PrivateCorrespondence'

export const publicRotes = [
    {
        path: LOGIN_ROUTER,
        Component: Login,
    },
    {
        path: SING_UP_ROUTER,
        Component: SingUp,
    },
]

export const privateRotes = [
    {
        path: CHAT_ROUTER,
        Component: Chat,
    },
    {
        path: PRIVATE_CORRESPONDENCE_ROUTER,
        Component: PrivateCorrespondence,
    },
]
