import Heading from 'components/atoms/heading';
import Loading from 'components/atoms/loading/index';
import Form from 'components/molecules/form';
import { ROUTES } from 'constants/routes';
import { getSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { clearErrors, getProductDetails, updateProduct } from 'redux/actions/productAction';
import { UPDATE_PRODUCT_RESET } from 'redux/types/productsType';

const EditProductPage = () => {
  const [productInfo, setProductInfo] = useState({
    name: '',
    price: '',
    description: '',
  });

  const { name, price, description } = productInfo;

  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router.query;

  const { loading, error, isUpdated } = useSelector(state => state.product);
  const { product, error: productDetailsError } = useSelector(state => state.getProductDetails);

  useEffect(() => {
    if (!product || product?._id !== id) {
      dispatch(getProductDetails('', id));
    } else {
      setProductInfo({ ...productInfo, name: product?.name, price: product?.price, description: product?.description });
    }
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (productDetailsError) {
      toast.productDetailsError(productDetailsError);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      dispatch(getProductDetails('', id));
      toast.success('Product Updated Successfully!');
      router.push(`${ROUTES.ADMIN_PRODUCT_EDIT}/${id}`);
      dispatch({ type: UPDATE_PRODUCT_RESET });
    }
  }, [dispatch, error, productDetailsError, isUpdated, product, id]);

  const handleInputChanges = useCallback(
    e => {
      var pattern = /image-*/;
      const file = e.target?.files?.[0];
      if (e.target?.files?.[0] && !file.type.match(pattern)) return;

      if (e.target.name === 'images') {
        setImages([]);
        setImagesPreview([]);

        const files = Array.from(e.target.files);
        files.forEach(file => {
          const reader = new FileReader();

          reader.onload = () => {
            if (reader.readyState === 2) {
              setImages(oldArray => [...oldArray, reader.result]);
              setImagesPreview(oldArray => [...oldArray, reader.result]);
            }
          };

          reader.readAsDataURL(file);
        });
      } else {
        setProductInfo({ ...productInfo, [e.target.name]: e.target.value });
      }
    },
    [productInfo, images, imagesPreview]
  );

  const submitHandler = e => {
    e.preventDefault();

    const productData = {
      name,
      price,
      description,
      images,
    };

    if (images.length !== 0) productData.images = images;
    if (!productData.name || !productData.price) return toast.error('Please provide name and price!');

    dispatch(updateProduct(product._id, productData));
  };

  if (!product) return <Loading square />;

  return (
    <div className="p-edit-product">
      <Form
        loading={loading}
        hasName
        name={name}
        hasPrice
        price={price}
        hasDescription
        description={description}
        hasMultipleImages
        btnMessage="Update"
        modifiers="create-new-product"
        imagesPreview={imagesPreview}
        hasOldImagesPreview={product?.images}
        onChange={handleInputChanges}
        onSubmit={submitHandler}
      >
        <Heading>Update Product</Heading>
      </Form>
    </div>
  );
};

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });

  if (!session || session.user.role !== 'admin') {
    return {
      redirect: {
        destination: '/customPages/user/login',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}

export default EditProductPage;
