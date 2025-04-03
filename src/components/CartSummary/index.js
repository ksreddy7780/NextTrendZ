// Write your code here
import CartContext from '../../context/CartContext'

const CartSummary = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value

      const totalAmount = cartList.reduce(
        (acc, current) => acc + current.price * current.quantity,
        0,
      )

      return (
        <div>
          <h1>Order Total:{totalAmount} </h1>
          <p>{cartList.length} item in cart</p>
          <button data-testid="checkout" type="button">
            Checkout
          </button>
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default CartSummary
