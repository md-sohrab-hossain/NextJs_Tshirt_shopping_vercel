import Home from "../components/Home";
import { getAllProducts } from "../redux/actions/productAction";

const App = ({ props }) => {
  return <Home productsData={props.products} />;
};

App.getInitialProps = async ({ req, query, store }) => {
  await store.dispatch(getAllProducts(req, query.page));

  const product = store.getState();
  const products = product.getAllProducts;

  return {
    props: { products },
  };
};

export default App;
