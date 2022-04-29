import {createSlice} from "@reduxjs/toolkit"

const havaintoModalSlice = createSlice({
    name: 'havaintoModal',
    initialState: false,
    reducers: {
        showHavaintoModal(state, action){
            return{
                type: true
            }
        },
        hideHavaintoModal(state, action){
            return{
                type: false
            }
        }
    }
})

export const {showHavaintoModal, hideHavaintoModal} = havaintoModalSlice.actions
export default havaintoModalSlice.reducer