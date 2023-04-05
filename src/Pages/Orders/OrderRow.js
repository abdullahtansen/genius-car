import React, { useEffect, useState } from 'react';

const OrderRow = ({order,handleDelete,handleStatusUpdate}) => {
    const {_id,serviceName,price,service,customer,phone,status} = order;
    const [orderService,setOrderService] = useState({});
    useEffect(()=>{
        fetch(`https://genius-car-server-henna-nine.vercel.app/services/${service}`)
        .then(res=> res.json())
        .then(data=>setOrderService(data))
    },[service])
    return (
            <tr>
        <th>
          <label>
           <button onClick={()=> handleDelete(_id)}  className='btn btn-ghost'>X</button>
          </label>
        </th>
        <td>
          <div className="flex items-center space-x-3">
            <div className="avatar">
              <div className="mask rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 w-24 h-24">
               {orderService?.img &&
                <img src={orderService.img} alt="Avatar Tailwind CSS Component" />
                }
              </div>
              <div>
              <div className="font-bold">{serviceName}</div>
              <div className="text-sm opacity-50">{customer}</div>
            </div>
            </div>
          </div>
        </td>
        <td>
         {phone}
          <br/>
          <span className="badge badge-ghost badge-sm">${price}</span>
        </td>
        <td>Purple</td>
        <th>
          <button className="btn btn-ghost btn-xs" onClick={()=> handleStatusUpdate(_id)}>{status ? status : 'pending'}</button>
        </th>
      </tr>
    
    );
};

export default OrderRow;