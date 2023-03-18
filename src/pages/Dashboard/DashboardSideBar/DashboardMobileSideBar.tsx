import { Link } from "react-router-dom"
import { IUser } from "../../../@types/user"
import { TbBuildingStore, TbFileUpload, TbSettings } from "react-icons/tb"
import { useStyleListOnRouteChangeHook } from "../../../hooks/useStyleListOnRouteChangeHook"
import { useRef } from "react"
import { GoPackage } from "react-icons/go"
import { MdOutlineDashboardCustomize } from "react-icons/md"

interface propsType {
	user: IUser
	handleUploadImage: (e: React.ChangeEvent<HTMLInputElement>) => Promise<void>
    setIsComponentVisible: React.Dispatch<React.SetStateAction<boolean>>
}


export const DashboardMobileSideBar = (props: propsType) => {

	const { user, handleUploadImage, setIsComponentVisible } = props

	const listRefsMap = new Map([
        ['dashboard', useRef<HTMLDivElement>(null)],
		['orders', useRef<HTMLDivElement>(null)],
		['settings', useRef<HTMLDivElement>(null)],
		['products', useRef<HTMLDivElement>(null)],
	])

	useStyleListOnRouteChangeHook(listRefsMap, 'white', 'black', '#2563eb', 'white')

  	return (
		<>
		<label className="cursor-pointer h-28 w-28">
            <span className=" group-hover:flex justify-center items-center hidden absolute h-32 w-32 rounded-full bg-opacity-50 bg-slate-800 ">
                <TbFileUpload size={30} color="white" />
            </span>
            <input type="file" name="image" className=" hidden" onChange={handleUploadImage}/>
            <img className=' h-full w-full object-cover object-center rounded-full' src={user?.imgPath} />
        </label>
        <div className='w-full flex flex-col items-center gap-y-4'>
			<div ref={listRefsMap.get('dashboard')} className=' w-5/6 transition-colors duration-75 py-3 pl-6 rounded-lg'>
                <Link to={''} className=' w-full flex items-center gap-x-3 font-medium text-sm cursor-pointer' onClick={() => setIsComponentVisible(false)}>
                    <MdOutlineDashboardCustomize size={17} />
                    <span>Dashboard</span>
                </Link>
            </div>
            <div ref={listRefsMap.get('products')} className=' w-5/6 transition-colors duration-75 py-3 pl-6 rounded-lg'>
                <Link to={'products'} className=' w-full flex items-center gap-x-3 font-medium text-sm cursor-pointer' onClick={() => setIsComponentVisible(false)}>
                    <TbBuildingStore size={17} />
                    <span>Products</span>
                </Link>
            </div>
            <div ref={listRefsMap.get('orders')} className=' w-5/6 transition-colors duration-75 py-3 pl-6 rounded-lg'>
                <Link to={'orders'} className=' w-full flex items-center gap-x-3 font-medium text-sm cursor-pointer' onClick={() => setIsComponentVisible(false)}>
                    <GoPackage size={17} />
                    <span>Orders</span>
                </Link>
            </div>
            <div ref={listRefsMap.get('settings')} className=' w-5/6 transition-colors duration-75 py-3 pl-6 rounded-lg'>
                <Link to={'settings'} className=' w-full flex items-center gap-x-3 font-medium text-sm cursor-pointer' onClick={() => setIsComponentVisible(false)}>
                    <TbSettings size={17} />
                    <span>Settings</span>
                </Link>
			</div>
        </div>
		</>
  )
}
