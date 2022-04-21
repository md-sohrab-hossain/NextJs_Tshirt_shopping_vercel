import Heading from 'components/atoms/heading';
import Loading from 'components/atoms/loading/index';
import Form from 'components/molecules/form';
import { ROLE } from 'constants/options';
import { ROUTES } from 'constants/routes';
import { getSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { clearErrors, getUserDetails, updateUser } from 'redux/actions/userAction';
import { UPDATE_USER_RESET } from 'redux/types/userTypes';

const UpdateUserPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [userInfo, setUserInfo] = useState(() => ({
    name: '',
    email: '',
    role: '',
  }));

  const { name, email, role } = userInfo;
  const dispatch = useDispatch();
  const router = useRouter();

  const { error, isUpdated } = useSelector(state => state.user);
  const { user, loading } = useSelector(state => state.userDetails);
  const userId = router.query.id;

  useEffect(() => {
    if (user && user._id !== userId) {
      dispatch(getUserDetails(userId));
    } else {
      setUserInfo({ ...userInfo, name: user.name, email: user.email, role: user.role });
    }

    if (error) {
      toast.error(error);
      setIsLoading(false);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      setIsLoading(false);
      router.push(`${ROUTES.ADMIN_USERS}`);
      dispatch({ type: UPDATE_USER_RESET });
    }
  }, [dispatch, isUpdated, userId, user, error]);

  const handleUserInfo = useCallback(
    e => {
      setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
    },
    [userInfo]
  );

  const handleDropdownOption = selectedValue => {
    setUserInfo({ ...userInfo, role: selectedValue });
  };

  const submitHandler = e => {
    e.preventDefault();
    setIsLoading(true);

    const userData = {
      name,
      email,
      role,
    };

    if (!userData.name || !userData.email || !userData.role) {
      setIsLoading(false);
      toast.error('Please provide all the necessary information!');
      return;
    }

    dispatch(updateUser(user._id, userData));
  };

  if (loading) return <Loading square />;

  return (
    <div className="p-update-user">
      <Form
        loading={isLoading}
        hasName
        name={name}
        hasEmail
        email={email}
        hasDropdown
        btnMessage="Update"
        modifiers="update-user"
        dropdownOptions={ROLE}
        handleDropdownOption={handleDropdownOption}
        selectedDropdownValue={user.role}
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
