import { Link } from 'react-router-dom'
import { SearchBar } from '../../pages/SearchBar'
import storeLogo from '../../assets/halls-bookshop-logo.svg'
import { RiShoppingCartFill, RiUser3Fill } from 'react-icons/ri'
import { motion } from 'framer-motion'
import { DropDown } from '../../pages/NavBar/DropDown'
import { useNavBarHook } from '../../pages/NavBar/useNavBarHook'
import { CartAndCheckoutSideBar } from '../CartAndCheckoutSideBar'

export const NavBar = () => {

    const {
        toggleMouseMenu, isMouse, subMenuAnimate, Genres, cartRef,
        setIsCartVisible, isCartVisible, cartAnimate, user, userDropDownRef,
        setIsUserDropDownVisible , isUserDropDownVisible, setIsNavbarOpen,
        isNavbarOpen, navigate, handleClick
    } =  useNavBarHook()

    return (
        <>
        <motion.nav className=' z-10 flex w-full items-center h-24 justify-between px-4 gap-x-4'
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ type: "spring", stiffness: 100 }}
        >
            <div className='w-full max-w-[8rem]'>
                <img className=' transition duration-150 ease-in-out hover:scale-110 cursor-pointer' src={storeLogo} onClick={() => navigate('/')} />
            </div>
            <div className='w-full h-full flex items-center'>
                <div className='relative w-[40%] h-full hidden md:flex items-center justify-evenly'>
                    <Link to={''} className=' text-center mx-auto text-sm lg:text-[105%] 2xl:text-[110%] font-medium hover:text-blue-600 hover:scale-110 transition ease-linear duration-150 cursor-pointer' >Home</Link>                    
                    <motion.div className=' flex items-center h-full'
                        onMouseEnter={toggleMouseMenu}
                        onMouseLeave={toggleMouseMenu}
                    >
                        <span className='mx-auto text-sm lg:text-[105%] 2xl:text-[110%] font-medium hover:text-blue-600 hover:scale-110 transition ease-linear duration-150 cursor-pointer'>Genres</span>
                        <motion.div
                            className=' w-full min-h-full absolute top-24 left-0 justify-center py-4 px-6 bg-white rounded shadow-sm shadow-blue-300 drop-shadow'
                            initial="exit"
                            animate={isMouse ? "enter" : "exit"}
                            variants={subMenuAnimate}
                        >
                            <div className='h-full flex flex-wrap gap-x-16 gap-y-3'>
                                {Genres.map((genre, i) => (
                                    <motion.a key={i} className=' w-28 cursor-pointer truncate hover:font-medium hover:text-blue-600' onClick={() => handleClick('by-genre', genre)}
                                        whileHover={{ scale: 1.16 }}
                                    >{genre}</motion.a>
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>
                    <a className=' text-center mx-auto text-sm lg:text-[105%] 2xl:text-[110%] font-medium hover:text-blue-600 hover:scale-110 transition ease-linear duration-150 cursor-pointer' >About Us</a>                    
                </div>
                <div className='w-full md:w-[60%] flex justify-end sm:justify-between gap-x-4'>
                    <div className='w-[70%] hidden sm:flex justify-center'>
                        <div className='w-[75%]'>
                            <SearchBar />
                        </div>
                    </div>
                    <div className='sm:w-[30%] relative flex justify-end gap-x-6'>
                        <div ref={cartRef} className=' flex flex-col items-center'>
                            <div
                                className=' bg-white cursor-pointer ring-1 shadow-inner shadow-slate-300 hover:shadow-blue-300 hover:ring-blue-600 hover:text-blue-600 ring-slate-700 text-slate-700  p-2 rounded-full text-lg hover:scale-110 transition ease-linear duration-150'
                                onClick={() => setIsCartVisible(!isCartVisible)}
                            >
                                <RiShoppingCartFill />
                            </div>
                            <motion.div className=' z-10 fixed right-0 top-0 h-full w-full max-w-full sm:max-w-[24rem] drop-shadow-md bg-white'
                                initial="exit"
                                animate={isCartVisible ? "enter" : "exit"}
                                variants={cartAnimate}
                            >
                                <CartAndCheckoutSideBar setDisplay={setIsCartVisible} reload={isCartVisible} />
                            </motion.div>
                        </div>
                        {!user ? 
                        <Link to={'auth'} className=' cursor-pointer'>
                            <div className=' bg-white hover:ring-blue-600 hover:text-blue-600 shadow-inner shadow-slate-300 hover:shadow-blue-300 ring-1 ring-slate-700 text-slate-700  p-2 rounded-full text-lg hover:scale-110 transition ease-linear duration-150'>
                                <RiUser3Fill />
                            </div>
                        </Link>
                        :
                        <div ref={userDropDownRef} className='relative'
                        >
                            <img
                                className=' object-cover h-9 w-9 rounded-full cursor-pointer ring-1 ring-slate-700 ring-blue-700/60 hover:text-blue-600 hover:scale-110 transition ease-linear duration-150 '
                                src={ user?.imgPath }
                                referrerPolicy={"no-referrer"}
                                onClick={() => setIsUserDropDownVisible(!isUserDropDownVisible)}
                            />
                            <DropDown user={user} isComponentsVisible={isUserDropDownVisible} setIsComponentVisible={setIsUserDropDownVisible} />
                        </div>}
                    </div>
                </div>
            </div>
            <div className=' md:hidden' onClick={() => setIsNavbarOpen(!isNavbarOpen)} >
            {!isNavbarOpen ?
                <div className=" w-10 flex flex-col px-1 py-2 space-y-2 cursor-pointer">
                    <span className=" w-8 h-0.5 bg-slate-700 animate-pulse"></span>
                    <span className=" w-8 h-0.5 bg-slate-700 animate-pulse"></span>
                    <span className=" w-8 h-0.5 bg-slate-700 animate-pulse"></span>
                </div>
            :
                <svg className="h-8 w-10 text-slate-700 animate-pulse cursor-pointer "
                     viewBox="0 0 24 24"
                     fill="none"
                     stroke="currentColor"
                     strokeWidth="2"
                     strokeLinecap="round"
                     strokeLinejoin="round"
                    >
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
            }
            </div>
        </motion.nav>
        {/* <div className=' z-30 fixed h-screen w-full top-24 bg-slate-50'>

        </div> */}
        </>
    )
}