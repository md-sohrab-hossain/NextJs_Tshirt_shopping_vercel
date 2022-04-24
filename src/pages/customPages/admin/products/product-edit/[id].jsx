import { useGetProductDetails } from 'api/useGetProductDetails';
import { usePutProductInfo } from 'api/usePutProductInfo';
import Heading from 'components/atoms/heading';
import Loading from 'components/atoms/loading';
import Form from 'components/molecules/form';
import { ROUTES } from 'constants/routes';
import { useGetAbsoluteUrl } from 'libs/utils';
import { getSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const EditProductPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [isUpdated, setIsUpdated] = useState(false);
  const [productInfo, setProductInfo] = useState({
    name: '',
    price: '',
    description: '',
  });

  const { name, price, description } = productInfo;

  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const absoluteUrl = useGetAbsoluteUrl();
  const { data: productDetails, isLoading, isSuccess } = useGetProductDetails(absoluteUrl, router.query.id);
  const { mutate: updateProductInfo } = usePutProductInfo();

  useEffect(() => {
    if (isSuccess) {
      setProductInfo({
        ...productInfo,
        name: productDetails?.name,
        price: productDetails?.price,
        description: productDetails?.description,
      });
    }
  }, [isSuccess]);

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
    setIsUpdated(true);

    const productData = {
      name,
      price,
      description,
      images,
    };

    if (images.length !== 0) productData.images = images;
    if (!productData.name || !productData.price) return toast.error('Please provide name and price!');

    updateProductInfo(
      { data: [id, productData] },
      {
        onSuccess: () => {
          setIsUpdated(false);
          toast.success('Product Updated Successfully!');
          router.push(`${ROUTES.ADMIN_PRODUCT_EDIT}/${id}`);
        },
        onError: () => {
          setIsUpdated(false);
          toast.error('Something went wrong!!');
        },
      }
    );
  };

  if (isLoading) return <Loading square />;

  return (
    <div className="p-edit-product">
      <Form
        loading={isUpdated}
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
        hasOldImagesPreview={productDetails?.images}
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
