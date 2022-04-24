import { useGetUserDetails } from 'api/useGetUserDetails';
import { useGetUserDetailsById } from 'api/useGetUserDetailsById';
import { usePutUserInfo } from 'api/usePutUserInfo';
import Heading from 'components/atoms/heading';
import Loading from 'components/atoms/loading';
import Form from 'components/molecules/form';
import { ROLE } from 'constants/options';
import { ROUTES } from 'constants/routes';
import { getSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const UpdateUserPage = () => {
  const [isUpdate, setIsUpdate] = useState(false);
  const [userInfo, setUserInfo] = useState(() => ({
    name: '',
    email: '',
    role: '',
  }));

  const router = useRouter();
  const userId = router.query.id;
  const { name, email, role } = userInfo;

  const { refetch } = useGetUserDetails();
  const { mutate: updateUserInfo } = usePutUserInfo();
  const { data: userData, isSuccess, isLoading } = useGetUserDetailsById(userId);

  useEffect(() => {
    if (isSuccess) {
      const { user } = userData;
      setUserInfo({ ...userInfo, name: user.name, email: user.email, role: user.role });
    }
  }, [userData, isSuccess]);

  const handleUserInfo = useCallback(e => setUserInfo({ ...userInfo, [e.target.name]: e.target.value }), [userInfo]);

  const handleDropdownOption = selectedValue => {
    setUserInfo({ ...userInfo, role: selectedValue });
  };

  const submitHandler = e => {
    e.preventDefault();
    setIsUpdate(true);

    const userData = {
      name,
      email,
      role,
    };

    if (!userData.name || !userData.email || !userData.role) {
      setIsUpdate(false);
      return toast.error('Please provide all the necessary information!');
    }

    updateUserInfo(
      { data: [userId, userData] },
      {
        onSuccess: ({ data }) => {
          refetch();
          setIsUpdate(false);
          toast.success(data.message);
          router.push(`${ROUTES.ADMIN_USERS}`);
        },
        onError: () => {
          setIsUpdate(false);
          toast.error('Something went wrong!!');
        },
      }
    );
  };

  if (isLoading) return <Loading square />;

  return (
    <div className="p-update-user">
      <Form
        loading={isUpdate}
        hasName
        name={name}
        hasEmail
        email={email}
        hasDropdown
        btnMessage="Update"
        modifiers="update-user"
        dropdownOptions={ROLE}
        handleDropdownOption={handleDropdownOption}
        selectedDropdownValue={userData?.user.role}
        onChange={handleUserInfo}
        onSubmit={submitHandler}
      >
        <Heading large>Update User</Heading>
      </Form>
    </div>
  );
};

export async function getServerSideProps({ req, res }) {
  const session = await getSession({ req: req });

  if (!session || session?.user.role !== 'admin') {
    res.writeHead(301, {
      Location: '/',
    });
    res.end();
  }

  return {
    props: {},
  };
}

export default UpdateUserPage;
