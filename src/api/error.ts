import axios, { AxiosError } from "axios"
import { toast } from "react-toastify"

export const handleError = (error: unknown) => {

    if (axios.isAxiosError(error)) {
        
        const errorStatus =  error.response?.status
        const errorMsg = error.response?.data?.message

        if (errorStatus === 401)
            return toast.error('Action require authentication')
        toast.error(errorMsg)
    }
    else {
        toast.error('something went wrong')
    }

}