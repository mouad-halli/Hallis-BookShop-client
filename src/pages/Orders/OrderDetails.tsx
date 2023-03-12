export const OrderDetails = (props: any) => {

    const { order } = props

    return (
        <div>
            order details component
            <h1>{order._id}</h1>
        </div>
    )
}