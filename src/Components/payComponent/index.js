import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import authorization from '../../authorization'
import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useState } from "react";
import axios from "axios";
import Layout from "../Layout/Layout";
const Pay = () => {

    const navigate = useNavigate()
    const [userID, setUserID] = useState()
    useEffect(() => {
        async function AuthorToken() {
            let data = await authorization()
            if (data === undefined) navigate('/404-notfound')
            else setUserID(data.id)
        }
        AuthorToken()
    }, [])
    const HandleAddVIPUser = async () => {
        let data = await axios.put(`http://localhost:1001/accounts/${userID}`,
            {
                VIP: 1
            })
        if (data != undefined) {
            let user = data.data
            let accessToken = user.accessToken
            localStorage.removeItem('token')
            localStorage.setItem('token', accessToken)
        }
        window.alert("THANH TOÁN THÀNH CÔNG")
    }
    return (
        <Layout>
            <div className="flex-rows border-2 border-white border-solid w-1/2 rounded-md text-center h-96 mt-20 mb-20 container bg-lime-200">
                <PayPalScriptProvider options={{
                    "client-id": "AYplGn9eOEklJYrnVF7dBbYGTUb6dpEWwYDvhw5wtWpl8IPlvRnhUZ7cq9iCLe4MMGpxSSOMLUUU79ps"
                }}>
                    <PayPalButtons className="mt-20 "
                        createOrder={(data, actions) => {
                            return actions.order
                                .create({
                                    purchase_units: [
                                        {
                                            amount: {
                                                value: "20",
                                            },

                                        },
                                    ],
                                })

                        }}
                        onApprove={(data, actions) => {
                            return actions.order.capture().then((details) => {
                                const name = details.payer.name.given_name;
                                HandleAddVIPUser()
                            });
                        }}

                    />
                </PayPalScriptProvider>
            </div>
        </Layout>
    );
}
export default Pay