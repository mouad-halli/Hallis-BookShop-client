import { DashboardSideBar } from './DashboardSideBar/DashboardSideBar'
import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectUser } from '../../app/userSlice'
import { useRedirectToPathWithCondition } from '../../hooks/useRedirectToPathWithCondition'

export const Dashboard = () => {

    const user = useSelector(selectUser)


    useRedirectToPathWithCondition('notauthenticated', '/auth')



    return (
        <div className='h-full min-h-screen w-full flex box-border'>
            <DashboardSideBar user={user} />
            <div className='h-full w-full md:w-5/6 flex mx-4 bg-white rounded-lg '>
                <Outlet />
            </div>
        </div>
    )
}
