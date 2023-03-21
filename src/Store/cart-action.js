import { uiActions } from "./ui-slice";
import { cartActions } from "./cart-slice";

export const fetchCartData = () => {
    return async (dispatch) => {
      const fetchData = async () => {
        const response = await fetch(
          'https://cart-redux-6cac5-default-rtdb.firebaseio.com/cart.json'
        );
  
        if (!response.ok) {
          throw new Error('Could not fetch cart data!');
        }
  
        const data = await response.json();
  
        return data;
      };
  
      try {
        const cartData = await fetchData();
        dispatch(
          cartActions.replaceCart({
            items: cartData.items || [],
            totalQuantity: cartData.totalQuantity,
          })
        );
      } catch (error) {
        dispatch(
          uiActions.setNotification({
            status: 'error',
            title: 'Error!',
            message: 'Fetching cart data failed!',
          })
        );
      }
    };
  };

export const sendCartData = (cart) => {
    return async (dispatch) => {
        dispatch(uiActions.setNotification({
            status: "pending",
            title: "sending...",
            message: "Sending cart item!"
        }))

        const sendRequest = async () => {
            const res = await fetch("https://cart-redux-6cac5-default-rtdb.firebaseio.com/cart.json",
                {
                    method: 'PUT',
                    body: JSON.stringify(cart),
                }
            )
            if (!res.ok) {
                throw new Error("failed")
            }
        }
        try {
            await sendRequest();
            dispatch(uiActions.setNotification({
                status: "success",
                title: "success...",
                message: "Sent cart item successfully!"
            }))
        } catch (error) {
            dispatch(
                uiActions.setNotification({
                    status: "error",
                    title: "Error...",
                    message: "Sent cart item failed!"
                })
            )
        }
    }
}