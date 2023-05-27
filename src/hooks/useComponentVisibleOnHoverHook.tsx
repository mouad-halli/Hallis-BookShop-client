import { useEffect, useRef, useState } from 'react'

export const useComponentVisibleOnHoverHook = (initialIsVisible: boolean) => {
    
    const [isComponentsVisible, setIsComponentVisible] = useState<boolean>()
    
    const ref: any = useRef(null)

    const handleClickOutside = (event: any) => {
        if (ref.current && !ref.current.contains(event.target)) {
            setIsComponentVisible(false)
        }
        // else if ((ref.current && !ref.current.contains(event.target) && !ref.current.contains(event.target.firstChild)))
    }

    useEffect(() => {
        setIsComponentVisible(initialIsVisible)
        document.addEventListener('mouseover', handleClickOutside, true)
        return () => {
            document.removeEventListener('mouseover', handleClickOutside, true)
        }
    }, [])
    
    return { ref, isComponentsVisible, setIsComponentVisible }
}