import { useEffect, useState } from "react"
import { handleError } from "../../api/error"
import { createUserAddress, deleteUserAddress, getUserAddressData, getUserData, updateUserAddress, updateUserData } from "../../api/userAPI"
import { useDispatch } from "react-redux"
import { updateUser } from "../../app/userSlice"
import { toast } from "react-toastify"

export const useSettingsHook = () => {

    const dispatch = useDispatch()


    const [userData, setUserData] = useState({
        firstname: undefined, lastname: undefined, username: undefined,
        password: undefined, phone: undefined, email: undefined
    })

    const [isAddressExist, setIsAddressExist] = useState(false)

    const [addressData, setAddressData] = useState({
        street1: undefined, street2: undefined, country: undefined,
        city: undefined, zipCode: undefined
    })

    const handleUserDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserData({...userData, [e.target.name]: e.target.value})
    }

    const handleAddressDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAddressData({...addressData, [e.target.name]: e.target.value})
    }

    useEffect(() => {

        const fetchData = async () => {
            try {
                const getUserPromise = getUserData()
                const getUserAddressPromise = getUserAddressData()
                const user = await getUserPromise
                const userAddress = await getUserAddressPromise

                if (user && user.imgPath)
                    delete user.imgPath
                if (user && user._id)
                    delete user._id

                if (user)
                    setUserData({...userData, ...user})
                if (userAddress) {
                    setAddressData({...addressData, ...userAddress})
                    setIsAddressExist(true)
                }

            } catch (error: unknown) { handleError(error) }
        }

        fetchData()

    }, [])

    const handleUpdateProfileSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            const updatedData = await updateUserData(userData)

            dispatch(updateUser(updatedData))
            toast.success('profile updated successfully')

        } catch (error: unknown) { handleError(error) }

    }

    const handleAddressFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            if (isAddressExist) {
                await updateUserAddress(addressData)
                toast.success('address updated successfully')
            }
            else {
                await createUserAddress(addressData)
                setIsAddressExist(true)
                toast.success('address created successfully')
            }

        } catch (error: unknown) { handleError(error) }

    }

    const handleDeleteAddress = async () => {
        try {
            await deleteUserAddress()
            setAddressData({
                street1: undefined, street2: undefined, country: undefined,
                city: undefined, zipCode: undefined
            })
            setIsAddressExist(false)
            toast.success('address deleted successfully')

        } catch (error: unknown) { handleError(error) }
    }

    return {
        userData, addressData, handleUserDataChange,
        handleAddressDataChange,handleUpdateProfileSubmit,
        handleAddressFormSubmit, isAddressExist, handleDeleteAddress
    }
}