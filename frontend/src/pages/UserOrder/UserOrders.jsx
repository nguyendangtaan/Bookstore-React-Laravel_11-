import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import ProfileSidebar from '../../components/ProfileSidebar/ProfileSidebar'
import Alert from '../../layouts/Alert'

export default function UserOrders() {
    const { user, isLoggedIn, token} = useSelector(state => state.user)
    const navigate = useNavigate()
    const [ordersToShow, setOrdersToShow] = useState(5)

    useEffect(() => {
        if(!isLoggedIn) navigate('/authenticate')
    },[isLoggedIn])

    const loadMoreOrders = () => {
        if(ordersToShow > user?.orders?.length) {
          return;
        }else {
            setOrdersToShow(prevOrdersToShow => prevOrdersToShow += 5)
        }
    }

    return (
        <div className="row my-5" style={{ minHeight:"800px" }}>
           <ProfileSidebar />
           
            <div className="col-md-7" style={{ marginLeft:"20px" }}>
                <div className="card-body">
                    {
                        user?.orders?.length > 0
                            ?
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Book Name</th>
                                    <th>Book Price</th>
                                    <th>Qty</th>
                                    <th>Total</th>
                                    <th>Order Date</th>
                                    <th>Delivered Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    user?.orders?.slice(0,ordersToShow).map((order,index) => (
                                        <tr key={index}>
                                            <th>{index+=1}</th>
                                            <th>
                                                <div className="d-flex flex-column">
                                                    {
                                                        order?.books?.map(book => (
                                                            <span key={book.id} className="badge bg-success my-1 rounded-0">
                                                                {book.book_name}
                                                            </span>
                                                        ))
                                                    }
                                                </div>
                                            </th>
                                            <th>
                                                <div className="d-flex flex-column">
                                                    {
                                                        order?.books?.map(book => (
                                                            <span key={book.id} className="badge bg-danger my-1 rounded-0">
                                                                ${book.price}
                                                            </span>
                                                        ))
                                                    }
                                                </div>
                                            </th>
                                            <th>{order.qty}</th>
                                            <th>
                                                <span className="badge bg-secondary my-1 rounded-0">
                                                    {order.total_price} VNĐ
                                                </span>
                                            </th>
                                            <th>{order.created_at}</th>
                                            <th>
                                                {
                                                    order.delivered_at ?
                                                        <span className="badge bg-success my-1 rounded-0">
                                                            {order.delivered_at}
                                                        </span>
                                                        :
                                                        <i className="text-muted">
                                                            Pending...
                                                        </i>

                                                }
                                            </th>
                                        </tr>
                                    ))
                                    }
                            </tbody>
                        </table>
                        :
                        <Alert content="Không có đơn hàng nào" type="primary"/>
                    }
                    {
                        ordersToShow < user?.orders?.length && 
                        <div className="d-flex justify-content-center my-3">
                            <button className="btn btn-sm btn-dark"
                                onClick={() => loadMoreOrders()}
                            >
                            <i className="bi bi-arrow-clockwise"></i>{" "}
                                Load more
                            </button>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}