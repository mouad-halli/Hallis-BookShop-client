import { Children, useEffect, useState } from "react"

export const Order = (props: any) => {

    const { order, handleDisplayOrderDetails, orderIndex } = props
    const [total, setTotal] = useState(0)
    const [orderItemsPictures, setOrderItemsPictures] = useState([])

    useEffect(() => {
        if (order) {
            order.createdAt = new Date(order.createdAt).toISOString().split('T')[0]
            order.items.forEach((item, i) => {
                setTotal(total + (item.product.price * item.quantity))
                if (i < 3)
                    orderItemsPictures.push(item.product.imgPath)
            })
        }
    }, [])

    const handleClick = (e: any) => {
        const buttonType = e.target.name
        if (buttonType === 'view details') {
            handleDisplayOrderDetails(orderIndex)
        }
    }

    return (
        <div className="w-[48%] h-[55%] relative flex items-end">
            <div className=" h-5/6 w-full bg-slate-100 rounded-lg shadow-lg shadow-slate-300">
                <div className=" h-2/6 w-full">
                    { orderItemsPictures[0] && <img className=" object-cover object-center absolute left-10 top-8 h-40 w-28 shadow-full rounded-xl hover:-translate-y-4 hover:scale-110 duration-200 transition ease-linear z-10" src={orderItemsPictures[0]} />}
                    { orderItemsPictures[1] && <img className=" object-cover object-center absolute left-16 top-8 h-40 w-28 shadow-full rounded-xl hover:-translate-y-4 hover:scale-110 duration-200 transition ease-linear z-20" src={orderItemsPictures[1]} />}
                    { orderItemsPictures[2] && <img className=" object-cover object-center absolute left-24 top-8 h-40 w-28 shadow-full rounded-xl hover:-translate-y-4 hover:scale-110 duration-200 transition ease-linear z-30" src={orderItemsPictures[2]} />}
                </div>
                <div className="h-3/6 w-ful flex flex-col justify-center items-center gap-y-2 ">
                    <div className=" w-5/6 flex overflow-clip">
                        <span className="w-[32%] font-semibold" >Order id :</span>
                        <h1 className="w-[68%] text-center text-slate-600">63dc82556b844f2121d963dc82556b844f2121d963dc82556b844f2121d9</h1>
                    </div>
                    <div className=" w-5/6 flex">
                        <span className=" w-[32%] font-semibold" >Order status: </span>
                        <h1 className="w-[68%] text-center text-green-600">{order.paymentStatus}</h1>
                    </div>
                    <div className=" w-5/6 flex">
                        <span className="w-[32%] font-semibold" >Total: </span>
                        <h1 className="w-[68%] text-center font-bold text-red-500">${total}</h1>
                    </div>
                    <div className=" w-5/6 flex pt-2">
                        <h1 className="font-mono font-bold text-blue-500 text-sm">{order.createdAt}</h1>
                    </div>
                </div>
                <div className="h-1/6 w-full flex justify-center gap-x-10">
                    <button name="view details" onClick={handleClick} className=" hover:-translate-y-1 hover:scale-105 transition ease-linear bg-blue-500 drop-shadow shadow-lg shadow-blue-500/50 text-white font-semibold rounded-lg h-[54%] w-2/6 ">View Details</button>
                    <button name="track order"  onClick={handleClick} className=" hover:-translate-y-1 hover:scale-105 transition ease-linear bg-blue-500 drop-shadow shadow-lg shadow-blue-500/50 text-white font-semibold rounded-lg h-[54%] w-2/6">Track Order</button>
                </div>
            </div>
        </div>
    )

    // return (
    //     <>
    //         <div className="w-full h-4/5 flex flex-col absolute bottom-0 shadow-md shadow-blue-500/30 bg-slate-50 rounded-lg">
    //             <div className="relative h-2/6 -top-10 bg-slate-200">
    //                 {Children.toArray(orderItemsPictures.map(picture => (
    //                     <img className="absolute left-10 object-cover h-40 w-28 drop-shadow rounded-xl" src={picture} />
    //                 )))}
    //             </div>
    //             <div className=" h-3/6 w-full bg-slate-400 flex flex-col items-center justify-center">
                    // <div className=" w-5/6 flex overflow-clip">
                    //     <span className="w-[32%] font-bold" >order id :</span>
                    //     <h1 className="w-[68%] text-slate-600">63dc82556b844f2121d963dc82556b844f2121d963dc82556b844f2121d9</h1>
                    // </div>
                    // <div className=" w-5/6 flex">
                    //     <span className="w-[32%] font-bold" >price: </span>
                    //     <h1 className="w-[68%] text-slate-600">${total}</h1>
                    // </div>
                    // <div className=" w-5/6 flex">
                    //     <span className=" w-[32%] font-bold" >order status: </span>
                    //     <h1 className="w-[68%] text-green-600">{order.paymentStatus}</h1>
                    // </div>
                    // <div className=" w-5/6 flex">
                    //     <h1 className="font-mono text-sm">{order.createdAt}</h1>
                    // </div>
    //             </div>
    //             <div className=" bg-slate-600 h-1/6 w-full flex justify-center items-start gap-x-4">
    //                 <button name="view details" onClick={handleClick} className="bg-white rounded-lg py-1 ring-1 font-semibold ring-blue-400 text-blue-500 px-6">View Details</button>
    //                 <button name="track order"  onClick={handleClick} className="bg-white rounded-lg py-1 ring-1 font-semibold ring-blue-400 text-blue-500 px-6">Track Order</button>
    //             </div>
    //         </div>
    //     </>
    // )
}