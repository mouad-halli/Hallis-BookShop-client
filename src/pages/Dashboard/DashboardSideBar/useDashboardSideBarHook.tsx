import { useDispatch } from "react-redux"
import { setUserImage } from "../../../api/userAPI"
import { updateUserImg } from "../../../app/userSlice"
import { handleError } from "../../../api/error"

export const useDashboardSideBarHook = () => {

    const dispatch = useDispatch()

    const handleUploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files
        if (!files)
            return
        try {

            const imgPath = await setUserImage(files[0])

            dispatch(updateUserImg(`${imgPath}?${new Date().getTime()}`))

        } catch (error: unknown) { handleError(error) }
    }

    return { handleUploadImage }
}