import { useAuthHook } from './useAuthHook'
import { motion } from 'framer-motion'

export const Auth = () => {    

    const {
        username, email, password, passwordConfirmation,
        display, handleDisplayChange, handleInputChange,
        handleSubmit
    } = useAuthHook('sign in')

    return (
        <motion.div className=' h-full min-h-screen w-full flex justify-center items-start py-40 '
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            exit={{ width: window.innerWidth, transition: { duration: 0.1 } }}
        >
            <div className=' w-full max-w-[18rem] md:max-w-[22rem] flex flex-col items-center shadow-lg shadow-blue-500/40 rounded-xl bg-white pb-10 '>
                <h1 className='font-bold text-xl my-10 md:my-12 md:text-2xl'>{display}</h1>
                <form className='w-full flex flex-col gap-y-5 px-12 md:px-16' onSubmit={handleSubmit}>
                    <input
                        className=' px-4 pb-1 focus-within:outline-none placeholder:text-center placeholder:font-bold placeholder:text-blue-500/60 border-b-2 border-blue-400/60 '
                        type="text" placeholder='Your username' name='username' required
                        value={username} onChange={(e) => handleInputChange(e)}
                    />
                    {display === 'sign up' && <input
                        className=' px-4 pb-1 focus-within:outline-none placeholder:text-center placeholder:font-bold placeholder:text-blue-500/60 border-b-2 border-blue-400/60 '
                        type="text" placeholder='Your email' name='email' required
                        value={email} onChange={(e) => handleInputChange(e)}
                    />}
                    <input
                        className=' px-4 pb-1 focus-within:outline-none placeholder:text-center placeholder:font-bold placeholder:text-blue-500/60 border-b-2 border-blue-400/60 '
                        type="password" placeholder='Your password' name='password' required
                        value={password} onChange={(e) => handleInputChange(e)}
                    />
                    {display === 'sign up' && <input
                        className=' px-4 pb-1 focus-within:outline-none placeholder:text-center placeholder:font-bold placeholder:text-blue-500/60 border-b-2 border-blue-400/60 '
                        type="password" placeholder='Confirm password' name='passwordConfirmation' required
                        value={passwordConfirmation} onChange={(e) => handleInputChange(e)}
                    />}
                    <div className=' w-full flex flex-col justify-between items-center gap-y-2 my-5'>
                        <button type='submit' className=' font-bold px-8 py-[7px] rounded-2xl text-sm md:text-base text-white bg-[#4285F4] hover:bg-[#4285F4]/90 drop-shadow-lg transition hover:scale-105 ease-linear' >{display}</button>
                        <span className='font-bold text-xs md:text-md text-blue-500/80 cursor-pointer' onClick={handleDisplayChange} >
                            {display === 'sign up' ? 'Already have an account?' : 'Create an account?'}
                        </span>
                    </div>
                </form>
                <div className=' w-full flex flex-col justify-center items-center'>
                    <button type="button" className="transition hover:scale-105 ease-linear text-white bg-gradient-to-br from-[#4285F4] to-[#4285F4]/80 hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 mr-2 mb-2"
                        onClick={() => { location.href = `${import.meta.env.VITE_BACK_END_URL}/auth/google` }}
                    >
                        <svg className="w-4 h-4 mr-2 -ml-1" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512"><path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path></svg>
                        Sign in with Google
                    </button>
                    {/* <div className=' flex items-center justify-center px-4 py-2 gap-x-2 ring-2 ring-blue-400/60 rounded-lg cursor-pointer'
                        onClick={() => { location.href = `${import.meta.env.VITE_BACK_END_URL}/auth/google` }}
                    >
                        <img className="object-cover object-center h-5 bg-white" src='https://developers.google.com/identity/images/g-logo.png' />
                        <span className=' hidden sm:block text-xs md:text-base font-semibold text-blue-400' >Continue with Google</span>
                    </div> */}
                </div>
            </div>
        </motion.div>
    )
}