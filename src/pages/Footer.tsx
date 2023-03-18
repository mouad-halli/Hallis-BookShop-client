import { BsFacebook, BsInstagram, BsTwitter } from "react-icons/bs"
import { Link } from "react-router-dom"
import { BiCopyright } from 'react-icons/bi'

export const Footer = () => {
    return (
        <div className=" w-full flex flex-col sm:flex-row justify-between gap-y-4 py-6 px-4 sm:px-16 bg-gradient-to-t from-slate-300 to-white">
            <div className="flex gap-x-10 md:gap-x-20 lg:gap-x-32 font-alegreya_Sc font-bold">
                <div className="flex flex-col gap-y-3 text-sm text-slate-600/90">
                    <h1 className=" text-gray-700 font-bold text-lg">Company</h1>
                    <Link to={'/'}>About Us</Link>
                    <Link to={'/'}>Contact Us</Link>
                    <Link to={'/'}>Privacy</Link>
                </div>
                <div className="flex flex-col gap-y-3 text-sm text-slate-600/90">
                    <h1 className=" text-gray-700 font-bold text-lg">Account</h1>
                    <Link to={'dashboard'}>Dashboard</Link>
                    <Link to={'profile'}>Profile</Link>
                    <Link to={'/cart'}>Cart</Link>
                </div>
                <div className="flex flex-col gap-y-3 text-sm text-slate-600/90">
                    <h1 className=" text-gray-700 font-bold text-lg">Search</h1>
                    <Link to={'/'}>Genres</Link>
                    <Link to={'/'}>Authors</Link>
                </div>
            </div>
            <div className=" flex flex-col sm:flex-row lg:flex-col justify-center gap-y-4 gap-x-4 ">
                <div className='flex flex-row sm:flex-col lg:flex-row gap-y-1 gap-x-6 items-center md:justify-center'>
                    <div className='flex justify-center items-center rounded-full bg-pink-700/90 w-9 h-9 cursor-pointer text-white'>
                        <BsInstagram size={20} className=''/>
                    </div>
                    <div className='flex justify-center items-center rounded-full bg-sky-400 w-9 h-9 cursor-pointer text-white'>
                        <BsTwitter size={20} className=''/>
                    </div>
                    <div className='flex justify-center items-center rounded-full bg-blue-600/90 w-9 h-9 cursor-pointer text-white'>
                        <BsFacebook size={20} className=''/>
                    </div>
                </div>
                <div className="flex flex-row sm:flex-col lg:flex-row sm:items-center sm:justify-center gap-4 text-slate-700 text-xs lg:text-sm">
                    <div className="flex items-center gap-x-1">
                        <BiCopyright size={17} />
                        <span className="text-[80%]">2023 All Rights Reserved</span>
                    </div>
                    <a className="cursor-pointer text-[80%]" >Terms of Use</a>
                    <a className="cursor-pointer text-[80%]" >Privacy Notice</a>
                </div>
            </div>
        </div>
    )
}