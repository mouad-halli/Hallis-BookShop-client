import { Outlet } from 'react-router-dom'
import { ToastContainer, Flip } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { logOut, selectUserStatus, setCredentials } from './app/userSlice';
import { useEffect } from 'react';
import { clearCart, setCart } from './app/cartSlice';
import { Footer } from './pages/Footer';
import 'react-toastify/dist/ReactToastify.css';
import { getUserData } from './api/userAPI';
import { getCartItems } from './api/cartAPI';
import { NavBar } from './pages/NavBar';
import { userStatus } from './@types/user';

const App = () => {

    const userConnStatus = useSelector(selectUserStatus)

    const dispatch = useDispatch()

    useEffect(() => {

        const fetchData = async () => {
            try {
                const userData = await getUserData()
                dispatch(setCredentials(userData))
                if (userConnStatus === userStatus.AUTHENTICATED) {
                    const cartItems = await getCartItems()
                    dispatch(setCart(cartItems))
                }
            } catch (error: unknown) {
                dispatch(logOut())
                dispatch(clearCart())
            }
        }

        fetchData()

    }, [userConnStatus])

    return (
        <div className='h-full w-full flex flex-col justify-end font-alegreya bg-gradient-to-b from-slate-200/50 to-white bg-slate-100 '>
            <NavBar />
            <Outlet />
            <Footer />
            <ToastContainer
                position="top-center"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition={Flip}
            />
        </div>
    )
}

export default App;