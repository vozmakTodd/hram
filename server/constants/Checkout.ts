import { YooCheckout } from '@a2seven/yoo-checkout'

const getCHeckout = () => {
  if (!process.env.SHOP_ID || !process.env.SECRET_KEY) {
    throw new Error('add SHOP_ID and SECRET_KEY as env vars')
  }

  return new YooCheckout({ shopId: process.env.SHOP_ID, secretKey: process.env.SECRET_KEY })
}

const Checkout = getCHeckout()

export default Checkout
