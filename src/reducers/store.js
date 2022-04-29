import { configureStore } from '@reduxjs/toolkit'

import notificationReducer from '../reducers/notificationReducer'
import HavaintoModalReducer from '../reducers/havaintoModalReducer'
import loginModalReducer from '../reducers/loginModalReducer'

const store = configureStore({
    reducer: {
        notification: notificationReducer,
        havaintoModal: HavaintoModalReducer,
        loginModal: loginModalReducer
    }
})

export default store