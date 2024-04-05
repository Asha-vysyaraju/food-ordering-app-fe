
import React, { useState, useEffect } from 'react';
import PaypalButtons from './PaypalButtons';
import OrderItemsList from './OrderItemsList';
import Map from './Map/Map';
import { getNewOrderForCurrentUser } from '../services/orderService';
import { motion } from "framer-motion";

export default function PaymentPage() {
  const [order, setOrder] = useState();

  useEffect(() => {
    getNewOrderForCurrentUser().then(data => setOrder(data));
  }, []);

  if (!order) return;

  return (
    <>
     <div className="w-screen h-full  relative flex items-start justify-center bg-lightBackground gap-2 ">
       <div className="flex flex-col items-center h-full w-1/2   backdrop-blur-md p-4 px-4 py-40 gap-6">
       <p className="text-3xl font-semibold text-headingColor ">
         Order Form
        </p>
        <div className="w-full flex flex-col items-center justify-center gap-6 px-4 md:px-12 py-4">
        <div className='flex'>
            <h3>Name:</h3>
            <span>{order.name}</span>
        </div>
        <div className='flex'>
            <h3>Address:</h3>
            <span>{order.address}</span>
        </div>
            
        </div>
        {/* order items */}
        <OrderItemsList order={order} />
       </div>
       <div className="flex flex-col items-center w-1/2  h-full  backdrop-blur-md p-4 px-4 py-40 gap-6">
       <div>
       <p className="text-3xl font-semibold text-headingColor  ">
 Your Location
        </p>
        {/* Map */}
        <Map readonly={true} location={order.addressLatLng} />
          <motion.div
                whileTap={{ scale: 0.8 }}
               
                className='mt-10'
                
              >
            <PaypalButtons order={order} />
              </motion.div>
          </div> 
              
       </div>
       </div>
    </>
  )
  }
