import { useSelector } from 'react-redux'
import { createSearchParams, useNavigate } from 'react-router-dom'
import { selectUser } from '../../app/userSlice'
import { useComponentVisible } from '../../hooks/useComponentVisibleHook'
import { useState} from 'react'
import { bookGenres } from '../CreateOrUpdateListing/useCreateOrUpdateListingHook'
import { IUser } from '../../@types/user'

export const useNavBarHook = () => {

    const [isNavbarOpen, setIsNavbarOpen] = useState(false)

    const [isMouse, toggleMouse] = useState(false)

    const toggleMouseMenu = () => {
      toggleMouse(!isMouse);
    }

    const user: IUser = useSelector(selectUser)

    const { isComponentsVisible: isUserDropDownVisible, setIsComponentVisible: setIsUserDropDownVisible, ref: userDropDownRef } = useComponentVisible(false)

    const navigate = useNavigate()

    const Genres = Object.values(bookGenres)


    const handleClick = (type: string, q: string) => {
		navigate({ pathname: 'search', search: createSearchParams({ type: type, q: q }).toString() })
    }

    const variants = {
        open: { opacity: 1, x: 0 },
        closed: { opacity: 0, x: "-100%" },
      }

    const { ref: cartRef, isComponentsVisible: isCartVisible, setIsComponentVisible: setIsCartVisible} = useComponentVisible(false)

    const subMenuAnimate = {
        enter: {
          opacity: 1,
          rotateX: 0,
          transition: {
            duration: 0.2
          },
          display: "flex"
        },
        exit: {
          opacity: 0,
          rotateX: -40,
          transition: {
            duration: 0.2,
            delay: 0.15
          },
          transitionEnd: {
            display: "none"
          }
        }
    }

    const cartAnimate = {
        enter: { x: 0, transition: { duration: 0.4 }, display: "fixed" },
        exit: { x: window.innerWidth * 2, transition: { duration: 0.8 }, transitionEnd: { display: "block" } }
    }

    return {
        toggleMouseMenu, isMouse, subMenuAnimate, Genres, cartRef,
        setIsCartVisible, isCartVisible, cartAnimate, user, userDropDownRef,
        setIsUserDropDownVisible , isUserDropDownVisible, setIsNavbarOpen,
        isNavbarOpen, navigate, handleClick
    }
}