import { useCreateNewProduct } from 'api/useCreateNewProduct';
import { useGetUserDetails } from 'api/useGetUserDetails';
import Heading from 'components/atoms/heading';
import Form from 'components/molecules/form';
import { ROUTES } from 'constants/routes';
import { getSession } from 'next-auth/client';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const defaultImg = '/images/white_tshirt.png';
const DynamicCustomImageEditor = dynamic(() => import('components/molecules/image-editor'), { ssr: false });

const CreateNewProductPage = () => {
  const router = useRouter();
  const [images, setImages] = useState([]);
  const [imgSrc, setImgSrc] = useState(defaultImg);
  const [isCreated, setIsCreated] = useState(() => false);
  const [imagesPreview, setImagesPreview] = useState([]);
  const [productInfo, setProductInfo] = useState({
    name: '',
    price: '',
    description: '',
  });

  const { name, price, description } = productInfo;
  const { mutate: createNewProduct } = useCreateNewProduct();
  const { data: userDetails } = useGetUserDetails();

  useEffect(() => {
    if (imgSrc.match(/\/images\/white_tshirt/g)) return;
    setImages(item => [...item, imgSrc]);
    setImagesPreview(item => [...item, imgSrc]);
  }, [imgSrc]);

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
    setIsCreated(true);

    const productData = {
      name,
      price,
      description,
      images,
      user: userDetails?.user,
    };

    if (images.length === 0) return toast.error('Please upload images.');
    if (!productData.name || !productData.price) return toast.error('Please provide name and price!');

    createNewProduct(productData, {
      onSuccess: () => {
        setIsCreated(false);
        toast.success('Product Created successfully!');
        router.push(`${ROUTES.ADMIN_PRODUCTS_LIST}`);
      },
      onError: () => {
        setIsCreated(false);
        toast.error('Something went wrong!');
      },
    });
  };

  return (
    <div className="p-create-new-product">
      <div className="p-create-new-product__img-preview">
        <DynamicCustomImageEditor setImgSrc={setImgSrc} />
      </div>

      <div className="p-create-new-product__form">
        <Form
          loading={isCreated}
          hasName
          hasPrice
          hasDescription
          hasMultipleImages
          btnMessage="Create"
          modifiers="create-new-product"
          imagesPreview={imagesPreview}
          onChange={handleInputChanges}
          onSubmit={submitHandler}
        >
          <Heading>New Product</Heading>
        </Form>
      </div>
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

export default CreateNewProductPage;
