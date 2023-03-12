import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import defaultUserImg from '../assets/user-default-img.jpg'
import { IUser, UserDto, userStatus } from "../@types/user";

interface State {
    data: IUser
    status: userStatus
}

const userInitialState = {
    _id: '',
    username: '',
    firstname: '',
    lastname: '',
    displayName: '',
    imgPath: '',
    phone: 0,
    email: ''
}

const initialState: State = {
    data : userInitialState,
    status: userStatus.FETCHING
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setCredentials: (state, action: PayloadAction<UserDto>) => {

            const { payload } = action
            const { data } = state

            if (!payload)
                return

            data.imgPath = payload.imgPath ? payload.imgPath : defaultUserImg

            if (payload._id)
                data._id = payload._id
            if (payload.firstname)
                data.firstname = payload.firstname
            if (payload.lastname)
                data.lastname = payload.lastname
            if (payload.username)
                data.username = payload.username
            if (payload.email)
                data.email = payload.email
            if (payload.phone)
                data.phone = payload.phone
            
            if (data.firstname && data.lastname)
                data.displayName = data.firstname + ' ' + data.lastname
            else if (payload.username)
                data.displayName = payload.username

            state.status = userStatus.AUTHENTICATED
        },
        updateUser: (state, action: PayloadAction<UserDto>) => {
            const { payload } = action
            const { data } = state
            if (!payload)
                return
            if (payload.imgPath)
                data.imgPath = payload.imgPath
            if (payload.firstname)
                data.firstname = payload.firstname
            if (payload.lastname)
                data.lastname = payload.lastname
            if (payload.username)
                data.username = payload.username
            if (payload.email)
                data.email = payload.email
            if (payload.phone)
                data.phone = payload.phone

            if (data.firstname && data.lastname)
                data.displayName = data.firstname + ' ' + data.lastname
            else if (payload.username)
                data.displayName = payload.username
        },
        updateUserImg: (state, action: PayloadAction<any>) => {
            if (state.data)
                state.data.imgPath = action.payload
        },
        logOut: ( state ) => {
            state.data = userInitialState
            state.status = userStatus.NOTAUTHENTICATED
        },
    }
})

export const { setCredentials, updateUser, updateUserImg, logOut } = userSlice.actions
export default userSlice.reducer
export const selectUser = (state: any) => state.user.status === userStatus.AUTHENTICATED ? state.user.data :  null
export const selectUserStatus = (state: any) => state.user.status
export const selectUserId = (state: any) => state.user.data?._id
