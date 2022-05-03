import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
    name: 'notification',
    initialState: '',
    reducers: {
        updateNotification(state, action){
            const message = action.payload
            return{
                type: 'ON',
                message
            }
        },
        closeNotification(state, action){
            return{
                type: 'OFF',
                message: 'none'
            }
        }
    },
})

export const {updateNotification, closeNotification} = notificationSlice.actions
export default notificationSlice.reducer