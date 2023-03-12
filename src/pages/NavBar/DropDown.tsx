import { Link } from 'react-router-dom'
import { IUser, logOut } from '../../app/userSlice'
import { TbLogout, TbUser, TbBuildingStore, TbSettings } from 'react-icons/tb'
import { $api } from '../../api/API'
import { useDispatch } from 'react-redux'
import { clearCart } from '../../app/cartSlice'
import { GoPackage } from 'react-icons/go'
import { MdOutlineDashboardCustomize } from 'react-icons/md'
import { motion } from 'framer-motion'

export const DropDown = (props: any ) => {

    const { user, isComponentsVisible, setIsComponentVisible } = props
    const dispatch = useDispatch()

    const subMenuAnimate = {
        enter: {
          opacity: 1,
          rotateX: 0,
          transition: {
            duration: 0.2
          },
          display: "flex"
        },
        exit: {
          opacity: 0,
          rotateX: -60,
          transition: {
            duration: 0.2,
            delay: 0.15
          },
          transitionEnd: {
            display: "none"
          }
        }
    }

    const handleLogout = async () => {
        try {
            await $api.get('auth/logout')
            dispatch(logOut())
            dispatch(clearCart())
            setIsComponentVisible(false)
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <motion.div className=' w-[12rem] flex flex-col gap-y-4 absolute -right-3 sm:right-6 top-20 py-6 px-4 shadow-md shadow-blue-300 drop-shadow bg-white rounded-md'
            initial="exit"
            animate={isComponentsVisible ? "enter" : "exit"}
            variants={subMenuAnimate}
        >
            <div className='flex items-center gap-x-3 py-1 px-2'>
                <img className='object-cover object-center w-9 h-9 rounded-full' referrerPolicy={"no-referrer"} src={user.imgPath} />
                <h1 className='truncate w-[71%] font-semibold text-lg' >{user.displayName}</h1>
            </div>
            <hr className=' w-full h-px' />
            <div className='flex flex-col gap-y-3 px-3'>
                <Link to='dashboard/profile' className=' flex w-full items-center transition ease-linear hover:scale-[1.07] hover:font-medium hover:text-blue-600' onClick={() => setIsComponentVisible(false)} >
                    <div className='w-5/6 flex items-center gap-x-2 '>
                        <TbUser className='w-1/6'/>
                        <h3 className=' w-5/6'>Profile</h3>
                    </div>
                    <span className='w-1/6 text-center'>{'>'}</span>
                </Link>
                <Link to='dashboard' className=' flex w-full items-center transition ease-linear hover:scale-[1.07] hover:font-medium hover:text-blue-600' onClick={() => setIsComponentVisible(false)} >
                    <div className='w-5/6 flex items-center gap-x-2 '>
                        <MdOutlineDashboardCustomize className='w-1/6'/>
                        <h3 className=' w-5/6'>Dashboard</h3>
                    </div>
                    <span className='w-1/6 text-center'>{'>'}</span>
                </Link>
                <Link to='dashboard/settings' className=' flex w-full items-center transition ease-linear hover:scale-[1.07] hover:font-medium hover:text-blue-600' onClick={() => setIsComponentVisible(false)} >
                    <div className='w-5/6 flex items-center gap-x-2 '>
                        <TbSettings className='w-1/6'/>
                        <h3 className=' w-5/6'>Settings</h3>
                    </div>
                    <span className='w-1/6 text-center'>{'>'}</span>
                </Link>
                <div className=' flex w-full items-center transition ease-linear hover:scale-[1.07] hover:font-medium hover:text-blue-600 cursor-pointer' onClick={handleLogout} >
                    <div className='w-5/6 flex items-center gap-x-2 '>
                        <TbLogout className='w-1/6'/>
                        <h3 className=' w-5/6'>Logout</h3>
                    </div>
                    <span className='w-1/6 text-center'>{'>'}</span>
                </div>
            </div>
        </motion.div>
    )
}