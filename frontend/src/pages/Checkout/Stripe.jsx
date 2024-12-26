import React, { useEffect, useState } from "react"
import { loadStripe } from "@stripe/stripe-js"
import { Elements } from "@stripe/react-stripe-js"
import CheckoutForm from "./CheckoutForm"
import { axiosRequest, getConfig } from '../../helpers/config'
import { useSelector } from 'react-redux'

export default function Stripe() {
  const stripePromise = loadStripe("pk_test_51QZFTiA0hiX5Shx2YCGsJaTVrlNFutVQjmXbQitZHYafWPeD0OjHYSsJMNOFoBJdavP0zu2HpU0WSMK9iUbH4mA600S1gSH7On")
  const [clientSecret, setClientSecret] = useState("")
  const { token } = useSelector(state => state.user)
  const { cartItems } = useSelector(state => state.cart)

  useEffect(() => {
    fetchClientSecret()
  }, [])

  const fetchClientSecret = async () => {
    try {
      const response = await axiosRequest.post('pay/order', {
        cartItems,
      }, getConfig(token))
      setClientSecret(response.data.clientSecret)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      {stripePromise && clientSecret && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm />
        </Elements>
      )}
    </>
  )
}
