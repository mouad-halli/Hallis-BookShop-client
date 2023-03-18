import { TbBuildingStore, TbSettings, TbFileUpload } from "react-icons/tb"
import { Link } from "react-router-dom"
import { GoPackage } from 'react-icons/go'
import { useRef } from "react"
import { IUser } from "../../../@types/user"
import { useStyleListOnRouteChangeHook } from "../../../hooks/useStyleListOnRouteChangeHook"
import { MdOutlineDashboardCustomize } from "react-icons/md"

interface propsType {
    user: IUser
    handleUploadImage: (e: React.ChangeEvent<HTMLInputElement>) => Promise<void>
}

export const DashboardComputerSideBar = (props: propsType) => {

    const { user, handleUploadImage } = props

    const listRefsMap = new Map([
        ['dashboard', useRef<HTMLDivElement>(null)],
        ['orders', useRef<HTMLDivElement>(null)],
        ['settings', useRef<HTMLDivElement>(null)],
        ['products', useRef<HTMLDivElement>(null)],
    ])

    useStyleListOnRouteChangeHook(listRefsMap, 'white', 'black', '#f1f5f9', '#3b82f6')

    return (
        <>
        <div className="w-full group relative flex flex-col items-center gap-y-3 ">
            <label className="cursor-pointer h-32 w-32 sm:h-[5rem] sm:w-[5rem] lg:h-32 lg:w-32">
                <span className=" group-hover:flex justify-center items-center hidden absolute h-32 w-32 rounded-full bg-opacity-50 bg-slate-800 ">
                    <TbFileUpload size={30} color="white" />
                </span>
                <input type="file" name="image" className=" hidden" onChange={handleUploadImage}/>
                <img className=' h-full w-full object-cover object-center rounded-full' src={user?.imgPath} />
            </label>
            <div className=' w-4/6 flex flex-col justify-center'>
                <h1 className='font-bold text-blue-500 text-sm lg:text-xl text-center truncate'>
                    {user?.displayName}
                </h1>
                <h1 className=' text-xs lg:text-sm text-center truncate'>{user?.email}</h1>
            </div>
            </div>
            <div className='w-full flex flex-col items-end mt-4 '>
                <div className='h-full w-[70%] flex flex-col items-end gap-y-4'>
                    <div ref={listRefsMap.get('dashboard')} className=' w-full py-3 pl-6 rounded-l-full'>
                        <Link to={''} className=' w-full flex items-center gap-x-3 font-medium text-sm cursor-pointer'>
                            <MdOutlineDashboardCustomize size={17} />
                            <span className="sm:hidden xl:block">Dashboard</span>
                        </Link>
                    </div>
                    <div ref={listRefsMap.get('products')} className=' w-full py-3 pl-6 rounded-l-full'>
                        <Link to={'products'} className=' w-full flex items-center gap-x-3 font-medium text-sm cursor-pointer'>
                            <TbBuildingStore size={17} />
                            <span className="sm:hidden xl:block">Products</span>
                        </Link>
                    </div>
                    <div ref={listRefsMap.get('orders')} className=' w-full py-3 pl-6 rounded-l-full'>
                        <Link to={'orders'} className=' w-full flex items-center gap-x-3 font-medium text-sm cursor-pointer'>
                            <GoPackage size={17} />
                            <span className="sm:hidden xl:block">Orders</span>
                        </Link>
                    </div>
                    <div ref={listRefsMap.get('settings')} className=' w-full py-3 pl-6 rounded-l-full'>
                        <Link to={'settings'} className=' w-full flex items-center gap-x-3 font-medium text-sm cursor-pointer'>
                            <TbSettings size={17} />
                            <span className="sm:hidden xl:block">Settings</span>
                        </Link>
                    </div>
                </div>
        </div>
        </>
    )
  }
  