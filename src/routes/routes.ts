import { CHAT_ROUTER, LOGIN_ROUTER, SING_UP_ROUTER } from '../utils/consts'
import Login from '../components/login/Login'
import SingUp from '../components/signUp/SignUp'
import Chat from '../components/chat/Chat'

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
]
