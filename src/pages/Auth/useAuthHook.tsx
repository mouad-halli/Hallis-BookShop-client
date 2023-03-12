import { useState } from 'react'
import { $api } from '../../api/API'
import { useDispatch } from 'react-redux'
import { setCredentials } from '../../app/userSlice'
import { useRedirectToPathWithCondition } from '../../hooks/useRedirectToPathWithCondition'
import { handleError } from '../../api/error'
import { toast } from 'react-toastify'

export const useAuthHook = (initialDisplay: string) => {

    const dispatch = useDispatch()
    
    useRedirectToPathWithCondition('authenticated', '/') // if already authenticated redirect to home

    const [ display, setDisplay ] = useState<string>(initialDisplay)
    const [ username, setUsername ] = useState<string>('')
    const [ email, setEmail ] = useState<string>('')
    const [ password, setPassword ] = useState<string>('')
    const [ passwordConfirmation, setPasswordConfirmation ] = useState<string>('')

    const clearState = () => {
        setUsername('')
        setEmail('')
        setPassword('')
        setPasswordConfirmation('')
    }

    const handleDisplayChange = () => {
        setDisplay(
            display === 'sign up'
            ? 'sign in' : 'sign up'
        )
        clearState()
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputName = e.target.name
        const inputValue = e.target.value

        if (inputName === 'username')
            setUsername(inputValue)
        else if (inputName === 'email')
            setEmail(inputValue)
        else if (inputName === 'password')
            setPassword(inputValue)
        else
            setPasswordConfirmation(inputValue)
    }

    const handleSignIn = async () => {
        try {
            const signInInput = { username, password }

            const res = await $api.post('auth/login', signInInput)
            const {token, ...userData} = res.data
            dispatch(setCredentials(userData))
            toast.success('Signed in successfully ')
        } catch (error: unknown) { handleError(error) }
    }

    const handleSignUp = async () => {
        try {
            const signUpInput = { username, email, password, passwordConfirmation }

            await $api.post('auth/register', signUpInput)
            handleDisplayChange()
            clearState()
            toast.success('account created usccessfully')
        } catch (error: unknown) { handleError(error) }
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (display === 'sign up')
            await handleSignUp()
        else
            await handleSignIn()
    }

    return {
        username, email, password, passwordConfirmation,
        display, handleDisplayChange, handleInputChange,
        handleSubmit
    }
}