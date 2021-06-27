/** Library */
import React from "react";
import { useRouter } from "next/router";
import Pagination from "react-js-pagination";
/** Library */

/** components */
import Loading from "../components/atoms/Loading";
import ProductItem from "../components/product/ProductItem";
/** components */

/** css */
import style from "../styles/home.module.scss";
/** css */

function Home({ productsData }) {
  const router = useRouter();

  const { loading, products, productsCount, resultPerPage } = productsData;

  const handlePagination = (pageNumber) => {
    let url = window.location.href + `/?page=${pageNumber}`;

    url = url.replace(/\b\?page=([1-9])(\/)?/g, "");

    router.push(url);
  };

  let { page = 1 } = router.query;
  let count = productsCount;
  page = Number(page);

  if (loading) {
    return <Loading />;
  }
  return (
    <>
      <div className={style.container}>
        <div className={style.container__search}>
          <p>Our Products</p>
          <input
            type="text"
            className="form-control w-25 m-5 float-right"
            placeholder="Search.."
          />
        </div>

        <div className={style.container__row}>
          {products && products.length == 0 ? (
            <div>
              <b>No Products. &#128542;</b>
            </div>
          ) : (
            products &&
            products.map((product) => (
              <ProductItem key={product._id} product={product} />
            ))
          )}
        </div>
      </div>

      {resultPerPage < count && (
        <div className={style.pagination}>
          <Pagination
            activePage={page}
            itemsCountPerPage={resultPerPage}
            totalItemsCount={productsCount}
            onChange={handlePagination}
            nextPageText={"Next"}
            prevPageText={"Prev"}
            firstPageText={"First"}
            lastPageText={"Last"}
            itemClass="page-item"
            linkClass="page-link"
          />
        </div>
      )}
    </>
  );
}

export default Home;
