import Checkout from "../../../components/shopping/checkout/checkoutTemplate";
import { getMyOrders } from "../../../redux/actions/productOrderAction";

const CheckoutPage = ({ props }) => {
  return <Checkout orders={props.products} />;
};

CheckoutPage.getInitialProps = async ({ req, store }) => {
  await store.dispatch(getMyOrders(req?.headers.cookie, req));

  const product = store.getState();
  const products = product.getMyOrderList;

  return {
    props: { products },
  };
};

export default CheckoutPage;
