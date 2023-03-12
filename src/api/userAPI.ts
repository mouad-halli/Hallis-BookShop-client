import { UserDto } from "../app/userSlice"
import { $api } from "./API"

export const getUserData = async () => {
    return (await $api.get('user/me')).data
}

export const updateUserData = async (data: any) => {
    return (await $api.put('user', data)).data
}

export const getUserAddressData = async () => {
    return (await $api.get('user/address')).data
}

export const createUserAddress = async (data: any) => {
    return (await $api.post('user/address', data)).data
}

export const updateUserAddress = async (data: any) => {
    return (await $api.put('user/address', data)).data
}

export const deleteUserAddress = async () => {
    $api.delete('user/address')
}

export const setUserImage = async (imgFile: File) => {
    const form = new FormData()

    form.append('img', imgFile)
    return (await $api.put('/user/set-img', form, { headers: { 'Content-Type': "multipart/form-data" } })).data
}

export const getAllUsersWithBooks = async (minimumOfBooks: number) => {
    return (await $api(`user/users-books/${minimumOfBooks}`)).data
}