import { useCartAndCheckoutSidebarHook } from "./useCartAndCheckoutSidebarHook"
import { Cart } from "./Cart/Cart"
import { Checkout } from "./Checkout/Checkout"

export const CartAndCheckoutSideBar = (props: any) => {

    const {
        isCheckout, cartItems, handleNavigate, subTotal, handleRemoveProduct, handleSubTotalChange,
        handlePlaceOrder, handlePassToCheckout, setIsCheckout, setDisplay, userAddress, user
    } = useCartAndCheckoutSidebarHook(props)

    return (
        <div className='h-full flex flex-col gap-y-6 py-2'>
            <div className=' h-[8%] mx-4 border-b-[1px] flex items-center justify-between px-2'>
                {isCheckout ?
                    <div className='w-5/6 flex font-bold gap-x-[6.7rem]'>
                    <span className=' font-sans text-xs bg-slate-300 text-gray-500/80 font-bold px-[9px] py-[5px] rounded-full cursor-pointer transition hover:scale-[1.2] ease-linear' onClick={() => setIsCheckout(false)} >{'<'}</span>
                        <h1 className=''>Checkout</h1>
                    </div>
                    :
                    <div className='flex gap-x-2 items-center'>
                        <h1 className='font-bold'>My Cart</h1>
                        <span>({cartItems.length})</span>
                    </div>
                }
                <span className=' font-sans text-xs bg-slate-300 text-gray-500/80 font-bold px-[9px] py-[5px] rounded-full cursor-pointer transition hover:scale-[1.2] ease-linear' onClick={() => setDisplay(false)} >X</span>
            </div>
            <div className='w-full h-[70%] px-4'>
                {isCheckout ?
                    <Checkout user={user} userAddress={userAddress}  navigate={handleNavigate} />
                    :
                    <Cart items={cartItems} navigate={handleNavigate} removeProduct={handleRemoveProduct} cartSubtotal={subTotal} setCartSubtotal={handleSubTotalChange} />
                }
            </div>
            <div className='h-[20%] w-full px-4 flex flex-col gap-y-4 font-semibold text-slate-400 text-xs'>
                <div className='flex flex-col gap-y-4 border-t-[1px] border-b-[1px] py-4'>
                    <div className=' flex justify-between'>
                        <h1>Subtotal</h1>
                        <span className='text-black text-sm'>${subTotal}</span>
                    </div>
                    <div className='flex justify-between'>
                        <h1>Shipping</h1>
                        <span>--</span>
                    </div>
                </div>
                <div className=' flex justify-between'>
                    <h1>Total</h1>
                    <span className='text-black text-sm'>${subTotal}</span>
                </div>
                {isCheckout ?
                    <button className='bg-blue-600 py-[7px] rounded font-bold text-white transition hover:scale-105 ease-linear' onClick={handlePlaceOrder}>PLACE ORDER</button>
                    :
                    <button className='bg-slate-800 py-[7px] rounded font-bold text-white transition hover:scale-105 ease-linear' onClick={handlePassToCheckout}>CHECKOUT</button>
                }
            </div>
        </div>
    )
}