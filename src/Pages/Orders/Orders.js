import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthProvider/AuthProvider";
import OrderRow from "./OrderRow";

const Orders = () => {
  const { user,logOut } = useContext(AuthContext);
  const [orders, setOrder] = useState([]);
    console.log(orders)
  useEffect(() => {
    fetch(`https://genius-car-server-henna-nine.vercel.app/orders?email=${user?.email}`,{
      headers:{
        authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then((res) =>{
        if(res.status === 401 || res.status ===403){
         return logOut()
        }
       return res.json()})
      .then((data) => setOrder(data));
  }, [user?.email]);

  const handleDelete =(_id)=>{
    const proceed = window.confirm('Are You sure,You Want to cancel this order');
    if(proceed){
        fetch(`https://genius-car-server-henna-nine.vercel.app/orders/${_id}`,{
            method: 'DELETE',
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data)
            if(data.deletedCount > 0){
                alert('deleted Successfully')
                const remaining = orders.filter(odr => odr._id !== _id)
                setOrder(remaining)
            }
        })
    }
}

const handleStatusUpdate = (id) =>{
    fetch(`https://genius-car-server-henna-nine.vercel.app/orders/${id}`,{
        method: 'PATCH',
        headers:{
            'content-type': 'application/json'
        },
        body: JSON.stringify({status: 'APPROVED'})
    })
    .then(res=> res.json())
    .then(data=>{ 
        console.log(data)
        if(data.modifiedCount > 0){
            const remaining = orders.filter(odr => odr._id !== id)
            const approving = orders.find(odr => odr._id === id);
            approving.status = 'Approved'

            const newOrders = [approving,...remaining];
            setOrder(newOrders)
        }
    })
}

  return (
    <div>
      <h1 className="text-5xl">You have {orders.length} Orders</h1>
      <div className="overflow-x-auto w-full">
        <table className="table w-full">
          <thead>
            <tr>
              <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>
              <th>Name</th>
              <th>Job</th>
              <th>Favorite Color</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
          {
          orders.map(order=> <OrderRow key={order._id} order={order} handleDelete={handleDelete}handleStatusUpdate={handleStatusUpdate}></OrderRow>)
          }
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
