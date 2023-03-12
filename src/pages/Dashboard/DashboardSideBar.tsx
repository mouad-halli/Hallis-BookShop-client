import { TbBuildingStore, TbSettings, TbUser, TbFileUpload } from "react-icons/tb"
import { Link, useLocation } from "react-router-dom"
import { GoPackage, GoPrimitiveDot } from 'react-icons/go'
import { useDispatch } from "react-redux"
import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from "react"
import { setUserImage } from "../../api/userAPI"
import { IUser, updateUserImg } from "../../app/userSlice"
import { handleError } from "../../api/error"

export const DashboardSideBar = ( props: {user: IUser, displaySideBar: (isDisplay: boolean) => void} ) => {

    const { user, displaySideBar } = props

    const location = useLocation()

    const pathRouteNames = location.pathname.split('/')

    const [isStoreClicked, setIsStoreClicked] = useState(false)

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

    const subMenuAnimate = {
        enter: { opacity: 1, scale: 1, transition: { delay: 0.1, duration: 0.3 }, display: "block" },
        exit: { opacity: 0, scale: 0.5, transition: { delay: 0.1, duration: 0.3 }, transitionEnd: { display: "none" } }
    }

    const buttonsRefs = new Map([
        ['profile', useRef<HTMLDivElement>(null)],
        ['orders', useRef<HTMLDivElement>(null)],
        ['settings', useRef<HTMLDivElement>(null)],
        ['listings', useRef<HTMLDivElement>(null)],
        ['create-listing', useRef<HTMLDivElement>(null)],
    ])

    useEffect(() => {
    
        pathRouteNames.map(route => {
            const routeButtonRefStyle = buttonsRefs.get(route)?.current?.style
            if (routeButtonRefStyle) {
                routeButtonRefStyle.backgroundColor = '#f1f5f9'
                routeButtonRefStyle.color = '#3b82f6'
            }
        })

        return () => {
            pathRouteNames.map(route => {
                const routeButtonRefStyle = buttonsRefs.get(route)?.current?.style
                if (routeButtonRefStyle) {
                    routeButtonRefStyle.backgroundColor = 'white'
                    routeButtonRefStyle.color = 'black'
                }
            })
        }

    }, [location])

    const handleClick = () => {
        if (window.innerWidth <= 768)
            displaySideBar(false)
    }

    return (
        <>
            <div className=" group relative flex flex-col gap-y-3  ">
                <label className="cursor-pointer">
                    <span className=" group-hover:flex justify-center items-center hidden absolute h-32 w-32 rounded-full bg-opacity-50 bg-slate-800 ">
                        <TbFileUpload size={30} color="white" />
                    </span>
                    <input type="file" name="image" className=" hidden" onChange={handleUploadImage}/>
                    <img className=' h-32 w-32 object-cover object-center rounded-full' src={user?.imgPath} />
                </label>
                <div className=' w-full flex flex-col justify-center items-center'>
                    <h1 className='font-bold text-blue-500 text-xl'>
                        {user?.displayName}
                    </h1>
                    <h1 className='text-sm'>{user?.email}</h1>
                </div>
            </div>
            <div className='w-full flex flex-col items-end mt-4 '>
                <div className='h-full w-[70%] flex flex-col items-end gap-y-4'>
                    <div ref={buttonsRefs.get('profile')} className=' w-full py-3 pl-6 rounded-l-full ' onClick={handleClick}>
                        <Link to={'profile'} className=' w-full flex items-center gap-x-3 font-medium text-sm cursor-pointer'>
                            <TbUser size={17} />
                            <span className="sm:hidden md:block">My Profile</span>
                        </Link>
                    </div>
                    <div className=' w-full py-3 pl-6 rounded-l-full' onClick={() => setIsStoreClicked(!isStoreClicked)}>
                        <div className=' w-full flex items-center gap-x-3 font-medium text-sm cursor-pointer'>
                            <TbBuildingStore size={17} />
                            <span className="sm:hidden md:block">My Store</span>
                        </div>
                    </div>
                    <motion.div className="w-full pl-7 space-y-4"
                        initial="exit"
                        animate={isStoreClicked ? "enter" : "exit"}
                        variants={subMenuAnimate}
                    >
                        <div className="w-full rounded-l-full" ref={buttonsRefs.get('listings')} onClick={handleClick}>
                            <Link to={'store/listings'} className="w-full flex items-center gap-x-2 py-3 pl-6 text-sm">
                                <GoPrimitiveDot />
                                <span className="sm:hidden md:block">My posted books</span>
                            </Link>
                        </div>
                        <div className="w-full rounded-l-full" ref={buttonsRefs.get('create-listing')} onClick={handleClick}>
                            <Link to={'store/create-listing'} className="w-full flex items-center gap-x-2 py-3 pl-6 text-sm">
                                <GoPrimitiveDot />
                                <span className="sm:hidden md:block">Post a book</span>
                            </Link>
                        </div>
                    </motion.div>
                    <div ref={buttonsRefs.get('orders')} className=' w-full py-3 pl-6 rounded-l-full' onClick={handleClick}>
                        <Link to={'orders'} className=' w-full flex items-center gap-x-3 font-medium text-sm cursor-pointer'>
                            <GoPackage size={17} />
                            <span className="sm:hidden md:block">My Orders</span>
                        </Link>
                    </div>
                    <div ref={buttonsRefs.get('settings')} className=' w-full py-3 pl-6 rounded-l-full' onClick={handleClick}>
                        <Link to={'settings'} className=' w-full flex items-center gap-x-3 font-medium text-sm cursor-pointer'>
                            <TbSettings size={17} />
                            <span className="sm:hidden md:block">My Settings</span>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}
