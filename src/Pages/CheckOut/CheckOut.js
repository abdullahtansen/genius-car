import React, { useContext } from 'react';
import { useLoaderData } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';

const CheckOut = () => {
    const {_id,title,price} = useLoaderData();
    const {user} = useContext(AuthContext);

    const handlePlaceOrder = (e) =>{
        e.preventDefault();
        const form = e.target;
        const name = `${form.first.value} ${form.last.value}`;
        const email =  user?.email || 'unregistered';
        const message = form.message.value;
        const phone = form.phone.value;

        const order = {
            service: _id,
            serviceName: title,
            price,
            customer: name,
            email,
            phone,
            message
        }

        // if(phone.length > 10){
        //     alert('Phone number should be 10 characters or longer')
        // }else{

        // }
        fetch('https://genius-car-server-henna-nine.vercel.app/orders',{
            method: 'POST',
            headers:{
                'content-type': 'application/json'
            },
            body: JSON.stringify(order)
        })
        .then(res=> res.json())
        .then(data=>{
            if(data.acknowledged){
              form.reset();
              alert('Order Placed SuccessFully')  
            }
        }).catch(er=> console.error(er))
    }

    return (
        <div className='pb-3'>
           <form onSubmit={handlePlaceOrder}>
            <h2 className="text-4xl">You are about to order: {title}</h2>
            <h4 className='text-4xl'>Price: ${price}</h4>
           <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
           <input name="first" type="text" placeholder="first name" className="input w-full input-bordered" />
           <input name="last" type="text" placeholder="last name" className="input w-full input-bordered" />
           <input name="phone" required type="text" placeholder="your phone" className="input w-full input-bordered" />
           <input name="email" type="text" placeholder="your email" defaultValue={user?.email} className="input w-full" readOnly/>
           </div>
           <textarea name="message" className="textarea textarea-bordered h-24  w-full" placeholder="Your message" required></textarea>
           <input type="submit" value="Place your Order" className='btn' />
           </form>
        </div>
    );
};

export default CheckOut;