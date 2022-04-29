import { createSlice } from "@reduxjs/toolkit"

const loginModalSlice = createSlice({
    name: 'loginModal',
    initialState: false,
    reducers: {
        showloginModal(state, action) {
            return {
                type: true
            }
        },
        hideloginModal(state, action) {
            return {
                type: false
            }
        }
    }
})

export const { showloginModal, hideloginModal } = loginModalSlice.actions
export default loginModalSlice.reducer