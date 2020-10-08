import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import "../../styles/orders.scss";

import { getUserOrdersEndpoint } from "../../api";

const Orders = () => {
  const isSigned = useSelector(({ userAccredited: { isSigned } }) => isSigned);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isSigned) {
      setLoading(true);

      const abortController = new AbortController();

      (async () => {
        try {
          const {
            data: { details },
          } = await getUserOrdersEndpoint();
          setLoading(false);
          setOrders(details);
        } catch (err) {
          setLoading(false);
          console.clear();
        }
      })();

      return () => {
        abortController.abort();
      };
    }
  }, [isSigned]);

  if (!isSigned) {
    return (
      <div className='orders-container'>
        return <h1 style={{ color: "white" }}>Please Login to view Orders</h1>;
      </div>
    );
  }

  if (loading)
    return (
      <div className='loading-container'>
        <img
          src='https://storage.googleapis.com/lexa-component-styles/loading.gif'
          alt='loading'
        />
      </div>
    );

  if (orders.length < 1) {
    return (
      <div className='orders-container'>
        <h1 style={{ color: "white" }}>No Orders Found</h1>;
      </div>
    );
  }

  return (
    <div className='orders-container'>
      <h1>Orders List</h1>
      {orders.map(
        ({
          _id,
          item: { productName, productCoverImage },
          amount,
          createdAt,
          paid,
          delivered,
        }) => {
          return (
            <div key={_id} className='orders__details-box'>
              <div className='prod-image'>
                <img src={productCoverImage} alt='prd-cover' />
              </div>
              <div className='prod-order-details'>
                <p className='prd-name'>Product name : {productName}</p>
                <p className='prd-price'>Product price : {amount}</p>
                <p className='prd-ordered'>
                  Ordered on :{" "}
                  {new Date(createdAt).toUTCString().split("GMT")[0]}{" "}
                </p>
                <p className='prd-paid'>
                  Paid : {paid ? "Paid via card" : "Not paid"}
                </p>
                <p className='prd-delivery'>Status : {delivered}</p>
              </div>
            </div>
          );
        }
      )}
    </div>
  );
};

export default Orders;
