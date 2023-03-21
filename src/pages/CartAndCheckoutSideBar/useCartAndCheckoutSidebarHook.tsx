import { useEffect, useState } from "react"
import { useRedirectToPathWithCondition } from "../../hooks/useRedirectToPathWithCondition"
import { useNavigate } from "react-router"
import { $api } from "../../api/API"
import { handleError } from "../../api/error"
import { getCart } from "../../api/cartAPI"
import { toast } from "react-toastify"
import { getUserAddressData } from "../../api/userAPI"
import { selectUser } from "../../app/userSlice"
import { useSelector } from "react-redux"
import { userAddress } from "../../@types/address"
import { Book } from "../../@types/book"
import { IUser } from "../../@types/user"

export interface cartItem {
    _id: string
    product: Book
    quantity: number
}

export const useCartAndCheckoutSidebarHook = (params: any) => {

    const { setDisplay, reload } = params

    useRedirectToPathWithCondition('notauthenticated', '/auth')

    const user: IUser = useSelector(selectUser)

    const [cartItems, setCartItems] = useState<cartItem[]>([])

    const [subTotal, setSubTotal] = useState<number>(0)

    const [isCheckout, setIsCheckout] = useState<boolean>(false)

    const [userAddress, setUserAddress] = useState<userAddress>()

    const [isWaiting, setIsWaiting] = useState(false);

    const navigate = useNavigate()

    const handleRemoveProduct = (productId: string) => {
        setCartItems(
            cartItems.filter(item => item.product._id !== productId)
        )
    }

    const handleSubTotalChange = (newSubTotal: number) => {
        setSubTotal(newSubTotal)
    }

    const handlePlaceOrder = async () => {
        setIsWaiting(true)
        try {
            const stipeSessionUrl = await (await $api.post('/payment/create-stripe-checkout-session')).data
        
            window.location.replace(stipeSessionUrl)
        } catch (error: unknown) { handleError(error) }
        finally { setIsWaiting(false) }
    }

    useEffect(() => {
        const fetchUserCartAndAddress = async () => {
            try {
                const userCart = await getCart()
                setCartItems(userCart.items)
                setSubTotal(userCart.subTotal)

                const address = await getUserAddressData()
                if (address) {
                    setUserAddress(address)
                }

            } catch (error: unknown) {handleError(error)}
        }
        if (reload) {
            setIsCheckout(false)
            fetchUserCartAndAddress()
        }
    }, [reload])

    const handleNavigate = (url: string) => {
        setDisplay(false)
        navigate(url)
    }

    const handlePassToCheckout = () => {
        if (!cartItems.length)
            return toast.error('your cart is empty')
        setIsCheckout(true)
    }

    return {
        isCheckout, cartItems, handleNavigate, subTotal,
        handleRemoveProduct, handleSubTotalChange,handlePlaceOrder,
        handlePassToCheckout, setIsCheckout, setDisplay, userAddress,
        user, isWaiting
    }
}