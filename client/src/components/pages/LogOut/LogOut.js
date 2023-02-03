import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AUTH_URL } from '../../../config/config';
import { logOut } from '../../../redux/userRedux';

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const options = {
      method: 'DELETE',
      credentials: 'include',
    };

    fetch(`${AUTH_URL}/logout`, options).then(() => {
      dispatch(logOut());
      localStorage.removeItem('user');
      setTimeout(() => {
        return navigate('/');
      }, 1000);
    });
  }, [dispatch, navigate]);

  return null;
};
export default Logout;
