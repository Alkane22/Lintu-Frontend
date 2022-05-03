import { createSlice } from "@reduxjs/toolkit"

const notificationModalSlice = createSlice({
    name: 'notificationModal',
    initialState: false,
    reducers: {
        updateNotificationModal(state, action) {
            //console.log(action)
            const message = action.payload.message
            const background = action.payload.background
            const timeout = action.payload.timeout
            return {
                type: true,
                message,
                background,
                timeout
            }
        },
        showNotificationModal(state, action) {
            return {
                type: true
            }
        },
        hideNotificationModal(state, action) {
            return {
                type: false
            }
        }
    }
})

export const { showNotificationModal, hideNotificationModal, updateNotificationModal } = notificationModalSlice.actions
export default notificationModalSlice.reducer