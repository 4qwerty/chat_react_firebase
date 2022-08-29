import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCUjDO_QgzR_I-nkDXs-F6wNUy5RTJPAY4",
    authDomain: "chat-bccc0.firebaseapp.com",
    projectId: "chat-bccc0",
    storageBucket: "chat-bccc0.appspot.com",
    messagingSenderId: "787929040332",
    appId: "1:787929040332:web:992bef2ce829b799f50969"
};

export const Context = createContext<any|null>(null);

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app)

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
    <Context.Provider value={{
        auth,
        db
    }}>
        <React.StrictMode>
            <App />
        </React.StrictMode>
    </Context.Provider>
);
