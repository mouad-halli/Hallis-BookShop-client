import { useEffect, useRef, useState } from 'react'

export const useComponentVisible = (initialIsVisible: boolean) => {
    
    const [isComponentsVisible, setIsComponentVisible] = useState<boolean>(initialIsVisible)
    
    const ref: any = useRef(null)

    const handleClickOutside = (event: any) => {
        if (ref.current && !ref.current.contains(event.target))
            setIsComponentVisible(false)
    }

    useEffect(() => {
        // setIsComponentVisible(initialIsVisible)
        document.addEventListener('click', handleClickOutside, true)
        return () => {
            document.removeEventListener('click', handleClickOutside, true)
        }
    }, [])
    
    return { ref, isComponentsVisible, setIsComponentVisible }
}