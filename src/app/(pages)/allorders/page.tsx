

"use client";

import { useEffect, useState } from "react";

interface Order {
  _id: string;
  createdAt: string;
  totalOrderPrice: number;
  paymentMethodType: string;
  isPaid: boolean;
  isDelivered: boolean;
}

export default function AllOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  async function getAllOrders() {
    try {
      setLoading(true);
      const response = await fetch(
        `https://ecommerce.routemisr.com/api/v1/orders/user/` +
          localStorage.getItem("userid")
      );

      const data = await response.json();
      console.log("Orders Response:", data);

      if (Array.isArray(data)) {
        setOrders(data);
      } else {
        setOrders([]);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getAllOrders();
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-6">My Orders</h1>

      {loading ? (
        <div className="text-center text-gray-500">Loading orders...</div>
      ) : orders.length === 0 ? (
        <div className="text-center text-gray-500">
          No orders found. 😔 <br />
          <a
            href="/"
            className="text-blue-600 hover:underline mt-2 inline-block"
          >
            Go shopping →
          </a>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white shadow-md rounded-2xl p-5 border hover:shadow-lg transition"
            >
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm text-gray-500">
                  #{order._id.slice(-6)}
                </span>
                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    order.isPaid ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {order.paymentMethodType}
                </span>
              </div>

              <p className="text-lg font-semibold">
                Total: ${order.totalOrderPrice}
              </p>
              <p className="text-sm text-gray-600">
                Date: {new Date(order.createdAt).toLocaleDateString()}
              </p>

              <div className="flex justify-between mt-4">
                <span
                  className={`text-xs font-medium ${
                    order.isPaid ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {order.isPaid ? "Paid" : "Not Paid"}
                </span>

                <span
                  className={`text-xs font-medium ${
                    order.isDelivered ? "text-green-600" : "text-orange-600"
                  }`}
                >
                  {order.isDelivered ? "Delivered" : "Processing"}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}


// "use client";

// import { useEffect, useState } from "react";
// import { Order } from "./../../../intefaces/order";

// export default function AllOrders() {
//   const [orders, setOrders] = useState<Order[]>([]);
//   const [loading, setLoading] = useState(true);

//   async function getAllOrders() {
//     try {
//       setLoading(true);
//       const response = await fetch(
//         `https://ecommerce.routemisr.com/api/v1/orders/user/` +
//           localStorage.getItem("userid")
//       );

//       const data = await response.json();
//       console.log("Orders Response:", data);

//       if (Array.isArray(data)) {
//         setOrders(data);
//       } else {
//         setOrders([]);
//       }
//     } catch (error) {
//       console.error("Error fetching orders:", error);
//       setOrders([]);
//     } finally {
//       setLoading(false);
//     }
//   }

//   useEffect(() => {
//     getAllOrders();
//   }, []);

//   return (
//     <div className="max-w-4xl mx-auto px-4 py-8">
//       <h1 className="text-3xl font-bold text-center mb-6">My Orders</h1>

//       {loading ? (
//         <div className="text-center text-gray-500">Loading orders...</div>
//       ) : orders.length === 0 ? (
//         <div className="text-center text-gray-500">
//           No orders found. 😔 <br />
//           <a
//             href="/"
//             className="text-blue-600 hover:underline mt-2 inline-block"
//           >
//             Go shopping →
//           </a>
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           {orders.map((Order) => (
//             <div
//               key={Order._id}
//               className="bg-white shadow-md rounded-2xl p-5 border hover:shadow-lg transition"
//             >
//               <div className="flex justify-between items-center mb-3">
//                 <span className="text-sm text-gray-500">
//                   #{Order._id.slice(-6)}
//                 </span>
//                 <span
//                   className={`text-xs px-2 py-1 rounded-full ${
//                     Order.isPaid
//                       ? "bg-green-100 text-green-700"
//                       : "bg-yellow-100 text-yellow-700"
//                   }`}
//                 >
//                   {Order.paymentMethodType}
//                 </span>
//               </div>

//               <p className="text-lg font-semibold">
//                 Total: ${Order.totalOrderPrice}
//               </p>
//               <p className="text-sm text-gray-600">
//                 Date: {new Date(Order.createdAt).toLocaleDateString()}
//               </p>

//               <div className="flex justify-between mt-4">
//                 <span
//                   className={`text-xs font-medium ${
//                     Order.isPaid ? "text-green-600" : "text-red-600"
//                   }`}
//                 >
//                   {Order.isPaid ? "Paid" : "Not Paid"}
//                 </span>

//                 <span
//                   className={`text-xs font-medium ${
//                     Order.isDelivered ? "text-green-600" : "text-orange-600"
//                   }`}
//                 >
//                   {Order.isDelivered ? "Delivered" : "Processing"}
//                 </span>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

