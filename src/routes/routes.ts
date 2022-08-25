import {CHAT_ROUTER, LOGIN_ROUTER} from "../utils/consts";
import Login from "../components/login/Login";
import Chat from "../components/chat/Chat";

export const publicRotes = [
    {
        path: LOGIN_ROUTER,
        Component: Login
    }
]

export const privateRotes = [
    {
        path: CHAT_ROUTER,
        Component: Chat
    }
]