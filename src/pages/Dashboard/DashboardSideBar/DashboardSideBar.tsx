import { useDispatch } from "react-redux"
import { setUserImage } from "../../../api/userAPI"
import { updateUserImg } from "../../../app/userSlice"
import { handleError } from "../../../api/error"
import { IUser } from "../../../@types/user"
import { MdOutlineDashboardCustomize } from 'react-icons/md'
import { motion } from "framer-motion"
import { useComponentVisible } from "../../../hooks/useComponentVisibleHook"
import { DashboardMobileSideBar } from "./DashboardMobileSideBar"
import { DashboardComputerSideBar } from "./DashboardComputerSideBar"
import { useDashboardSideBarHook } from "./useDashboardSideBarHook"

interface Props {
    user: IUser,
}

export const DashboardSideBar = ( props: Props ) => {

    const { user } = props

    const { handleUploadImage } = useDashboardSideBarHook()

    const { ref, isComponentsVisible, setIsComponentVisible } = useComponentVisible(false)

    const dashboardSideBarVariants = {
        hidden: { x: -innerWidth },
        visible: { x: 0 },
    }

    return (
        <div ref={ref} className="h-screen md:w-1/6">
            <motion.div className='fixed md:hidden bg-blue-600 z-10 top-[6rem] text-white rounded-r-lg' onClick={() => setIsComponentVisible(!isComponentsVisible)}
                initial="visible"
                variants={dashboardSideBarVariants}
                animate={isComponentsVisible ? "hidden" : "isible"}
                transition={{ stiffness: 0 }}
            >
                <MdOutlineDashboardCustomize className='m-2 text-2xl' />
            </motion.div>
            <motion.div className='h-full w-56 fixed md:hidden z-10 top-0 flex flex-col items-center gap-y-12 pt-6 bg-white'
                initial="hidden"
                variants={dashboardSideBarVariants}
                animate={isComponentsVisible ? "visible" : "hidden"}
                transition={{ stiffness: 0 }}
            >
                <DashboardMobileSideBar user={user} handleUploadImage={handleUploadImage} setIsComponentVisible={setIsComponentVisible} />
            </motion.div>
            <motion.div className=' h-full hidden md:flex flex-col items-center gap-y-6 py-6 sm:rounded-tr-2xl bg-white'
                initial={{ x: -window.innerWidth }}
                animate={{ x: 0 }}
            >
                <DashboardComputerSideBar user={user} handleUploadImage={handleUploadImage} />
            </motion.div>
        </div>
    )
}
