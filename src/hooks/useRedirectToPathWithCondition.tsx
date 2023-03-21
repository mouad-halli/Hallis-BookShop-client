import { useEffect } from "react"
import { useSelector } from "react-redux"
import { selectUserStatus } from "../app/userSlice"
import { useNavigate } from "react-router-dom"
import { userStatus } from "../@types/user"

export const useRedirectToPathWithCondition = (condition: string, toLocation: string) => {

    const navigate = useNavigate()
    
    const userConnStatus = useSelector(selectUserStatus)

    useEffect(() => {
        if (userConnStatus !== userStatus.FETCHING) {
            // if (condition === 'authenticated' && userConnStatus === userStatus.AUTHENTICATED )
            if (condition === userConnStatus )
                navigate(toLocation)
            // else if (condition === 'not authenticated' && userConnStatus === userStatus.NOTAUTHENTICATED )
            //     navigate(toLocation)
        }
    }, [userConnStatus])

}