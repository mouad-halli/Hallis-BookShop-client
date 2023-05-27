import { useOrdersHook } from "./useOrdersHook"
import { Children } from "react"
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs'

export const Orders = () => {

    const { orders, ordersCount, currentPage, totalPages, isLoading, boardRef, handleNextPageClick, handlePreviousPageClick } = useOrdersHook()

    return (
        <div className="h-screen w-full flex flex-col">
            <div className="h-1/6">
                <div className=" flex justify-center pt-10">
                    <h1 className="text-2xl font-medium">Orders</h1>
                </div>
                <div className=" w-full flex flex-wrap gap-y-4 items-end sm:gap-x-20 justify-center lg:justify-start lg:pl-16 pt-6">
                    <div className="flex items-end border-b-2 border-blue-300  cursor-pointer mx-auto sm:mx-0">
                        <div className=" flex items-center gap-x-2 pb-1 text-sm">
                            <h1 className="font-semibold text-xs">ALL</h1>
                            <span className="bg-blue-50 font-bold text-blue-400 rounded-full px-1 p-0.5 text-[70%] font-mono">24</span>
                        </div>
                    </div>
                    <div className="flex items-end border-b-2 border-slate-300  cursor-pointer mx-auto sm:mx-0">
                        <div className=" flex items-center gap-x-2 pb-1 text-sm">
                            <h1 className="font-semibold text-xs text-slate-400">SHIPPED</h1>
                            <span className="bg-slate-50 font-bold text-slate-400 rounded-full px-1 p-0.5 text-[70%] font-mono">12</span>
                        </div>
                    </div>
                    <div className="flex items-end border-b-2 border-slate-300  cursor-pointer mx-auto sm:mx-0">
                        <div className=" flex items-center gap-x-2 pb-1 text-sm">
                            <h1 className="font-semibold text-xs text-slate-400">PICKED</h1>
                            <span className="bg-slate-50 font-bold text-slate-400 rounded-full px-1 p-0.5 text-[70%] font-mono">3</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="relative h-full w-full flex flex-col pt-10">
                {isLoading && <svg aria-hidden="true" className="absolute w-20 h-20 left-[45%] top-[40%] text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/></svg>}
                <div className="w-full h-[6%] flex justify-evenly items-center text-xs bg-slate-50 text-slate-700 border-b-[1px] border-slate-200/80 ">
                    <h1 className="w-[11%] px-2">ORDER ID</h1>
                    <h1 className="w-[11%] px-2">MERCHANT</h1>
                    <h1 className="w-[11%] px-2">PRODUCT</h1>
                    <h1 className="w-[11%] text-center px-2">DATE</h1>
                    <h1 className="w-[11%] text-center px-2">PRICE</h1>
                    <h1 className="w-[11%] text-center px-2">QUANTITY</h1>
                    <h1 className="w-[11%] text-center px-2">STATUS</h1>
                    <h1 className="w-[11%] text-center px-2">DELIVERY</h1>
                </div>
                <div ref={boardRef} className="h-[80%] w-full">
                    {Children.toArray(orders.map(order => (
                    <div className=" h-[10%] w-full flex justify-evenly text-xs border-b-[1px] border-slate-200/80 hover:bg-slate-50">
                        <h1 className="h-full w-[11%] flex items-center truncate px-2 font-bold">{order._id.slice(0, 10)}</h1>
                        <h1 className="h-full w-[11%] flex items-center truncate px-2">{order.seller._id}</h1>
                        <h1 className="h-full w-[11%] flex items-center truncate px-2">{order.product.name}</h1>
                        <h1 className="h-full w-[11%] flex items-center justify-center truncate px-2">{new Date(order.createdAt).toLocaleDateString().replaceAll('/', '-')}</h1>
                        <h1 className="h-full w-[11%] flex items-center justify-center truncate px-2">${order.product.price}</h1>
                        <h1 className="h-full w-[11%] flex items-center justify-center truncate px-2">{order.product.quantity}</h1>
                        <h1 className="h-full w-[11%] flex items-center justify-center truncate px-2">{order.paymentStatus}</h1>
                        <h1 className="h-full w-[11%] flex items-center justify-center truncate px-2">{order.status}</h1>
                    </div>
                    )))}
                </div>
                {orders.length > 0 && <div className="h-[12%] w-full flex justify-between items-center px-10 text-sm">
                    <div>{`${(currentPage * 10) - 9} -- ${currentPage === Math.ceil(ordersCount / 10) ? ordersCount : currentPage * 10 } of ${ordersCount}`}</div>
                    <div className="flex items-center gap-x-2 ">
                        <BsArrowLeft className="text-xl text-blue-600 cursor-pointer" onClick={handlePreviousPageClick} />
                        <span>{`${currentPage} of ${totalPages}`}</span>
                        <BsArrowRight className="text-xl text-blue-600 cursor-pointer" onClick={handleNextPageClick} />
                    </div>
                </div>}
            </div>
        </div>
    )
}