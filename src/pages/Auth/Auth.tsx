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
                        className=' px-4 focus-within:outline-none placeholder:text-center placeholder:font-bold placeholder:text-blue-500/60 border-b-2 border-blue-400/60 '
                        type="text" placeholder='Your username' name='username' required
                        value={username} onChange={(e) => handleInputChange(e)}
                    />
                    {display === 'sign up' && <input
                        className=' px-4 focus-within:outline-none placeholder:text-center placeholder:font-bold placeholder:text-blue-500/60 border-b-2 border-blue-400/60 '
                        type="text" placeholder='Your email' name='email' required
                        value={email} onChange={(e) => handleInputChange(e)}
                    />}
                    <input
                        className=' px-4 focus-within:outline-none placeholder:text-center placeholder:font-bold placeholder:text-blue-500/60 border-b-2 border-blue-400/60 '
                        type="password" placeholder='Your password' name='password' required
                        value={password} onChange={(e) => handleInputChange(e)}
                    />
                    {display === 'sign up' && <input
                        className=' px-4 focus-within:outline-none placeholder:text-center placeholder:font-bold placeholder:text-blue-500/60 border-b-2 border-blue-400/60 '
                        type="password" placeholder='Confirm password' name='passwordConfirmation' required
                        value={passwordConfirmation} onChange={(e) => handleInputChange(e)}
                    />}
                    <div className=' w-full flex flex-col justify-between items-center gap-y-2 my-5'>
                        <button type='submit' className=' font-bold px-8 py-[7px] rounded-2xl text-sm md:text-base text-white bg-blue-500/80 drop-shadow-lg transition hover:scale-105 ease-linear' >{display}</button>
                        <span className='font-bold text-xs md:text-md text-blue-500/80 cursor-pointer' onClick={handleDisplayChange} >
                            {display === 'sign up' ? 'Already have an account?' : 'Create an account?'}
                        </span>
                    </div>
                </form>
                <div className=' w-full flex flex-col justify-center items-center'>
                        <div className=' flex items-center justify-center px-4 py-2 gap-x-2 ring-2 ring-blue-400/60 rounded-lg cursor-pointer'
                            onClick={() => { location.href = `${import.meta.env.VITE_BACK_END_URL}/auth/google` }}
                        >
                            <img className="object-cover object-center h-5 bg-white" src='https://developers.google.com/identity/images/g-logo.png' />
                            <span className=' hidden sm:block text-xs md:text-base font-semibold text-blue-400' >Continue with Google</span>
                        </div>
                </div>
            </div>
        </motion.div>
    )
}