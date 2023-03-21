import { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import Notification from './components/UI/Notification';
import { uiActions } from './Store/ui-slice';


let initial = true;

function App() {

  const showCart = useSelector(state => state.ui.showCart)
  const cart = useSelector(state => state.cart)
  const notification = useSelector(state => state.ui.notification)
  const dispatch = useDispatch();

  useEffect(() => {

    const sendCartData = async () => {
      dispatch(uiActions.setNotification({
        status: "pending",
        title: "sending...",
        message: "Sending cart item!"
      }))

      const res = await fetch("https://cart-redux-6cac5-default-rtdb.firebaseio.com/cart.json",
        {
          method: 'PUT',
          body: JSON.stringify(cart),
        }
      )
      if (res.ok) {
        dispatch(uiActions.setNotification({
          status: "success",
          title: "success...",
          message: "Sent cart item successfully!"
        }))
      } else {
        throw new Error("failed")
      }
    }
    if(initial){
      initial = false;
      return;
    }
    sendCartData().catch(error => {
      dispatch(uiActions.setNotification({
        status: "error",
        title: "Error...",
        message: "Sent cart item failed!"
      }))
    })
  }, [cart, dispatch])

  return (
    <Fragment>
      {notification && <Notification
        status={notification.status}
        title={notification.title}
        message={notification.message} />}
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </Fragment>

  );
}

export default App;
