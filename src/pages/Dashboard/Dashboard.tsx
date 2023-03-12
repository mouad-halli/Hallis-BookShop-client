import { useEffect, useRef, useState } from 'react'
import { DashboardSideBar } from './DashboardSideBar'
import { Outlet, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { motion } from 'framer-motion'
import { selectUser } from '../../app/userSlice'
import { useRedirectToPathWithCondition } from '../../hooks/useRedirectToPathWithCondition'


export const Dashboard = () => {

    const user = useSelector(selectUser)

    const location = useLocation()

    useRedirectToPathWithCondition('not authenticated', '/auth')

    const [displaySideBar, setDisplaySideBar] = useState(true)

    const handleDisplaySideBar = (isDisplay: boolean) => setDisplaySideBar(isDisplay)

    useEffect(() => {

        if (location.pathname === '/dashboard')
            setDisplaySideBar(true)

    }, [location])

    return (
        <div className='h-full min-h-screen w-full flex'>
            {displaySideBar &&
                <motion.div className='h-full w-full sm:w-2/6 lg:w-[27%] xl:w-1/6 flex sm:hidden flex-col items-center gap-y-6 py-6 sm:rounded-tr-2xl bg-white'
                    initial={{ x: -window.innerWidth }}
                    animate={{ x: 0 }}
                >
                    <DashboardSideBar user={user} displaySideBar={handleDisplaySideBar} />
                </motion.div>
            }
            <motion.div className=' h-screen w-full sm:w-2/6 lg:w-[27%] xl:w-1/6 hidden sm:flex flex-col items-center gap-y-6 py-6 sm:rounded-tr-2xl bg-white'
                initial={{ x: -window.innerWidth }}
                animate={{ x: 0 }}
            >
                <DashboardSideBar user={user} displaySideBar={handleDisplaySideBar} />
            </motion.div>
            <div className='h-full w-4/6 lg:w-[75%] xl:w-5/6 hidden sm:flex '>
                <Outlet />
            </div>
            {!displaySideBar && <div className='h-full w-full lg:w-[67%] xl:w-5/6 sm:hidden flex '>
                <Outlet />
            </div>}
        </div>
    )
}
