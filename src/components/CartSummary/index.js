// Write your code here
import Popup from 'reactjs-popup'
import {Component} from 'react'
import CartContext from '../../context/CartContext'
import './index.css'

const paymentOptions = [
  'Card',
  'Net Banking',
  'UPI',
  'Wallet',
  'Cash on Delivery',
]

class CartSummary extends Component {
  state = {confirmorder: false}

  onClickConfirmOrder = () => {
    this.setState(prevState => ({
      confirmorder: !prevState.confirmorder,
    }))
  }

  render() {
    const {confirmorder} = this.state
    return (
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
              <div>
                <Popup
                  modal
                  trigger={
                    <button data-testid="checkout" type="button">
                      Checkout
                    </button>
                  }
                  position="bottom left"
                >
                  {confirmorder ? (
                    <p className="confirm-order">
                      order has been placed successfully
                    </p>
                  ) : (
                    <div className="popup-container">
                      <select>
                        {paymentOptions.map(option => (
                          <option
                            key={option}
                            value={option}
                            disabled={option !== 'Cash on Delivery'} // Disable all options except the one that matches enabledOptionValue
                          >
                            {option}
                          </option>
                        ))}
                      </select>
                      <h1>Order Total:{totalAmount} </h1>
                      <p>{cartList.length} item in cart</p>
                      <button type="button" onClick={this.onClickConfirmOrder}>
                        Confirm Order
                      </button>
                    </div>
                  )}
                </Popup>
              </div>
            </div>
          )
        }}
      </CartContext.Consumer>
    )
  }
}

export default CartSummary

