import { useState } from 'react';
import { Alert, Button, Spinner, Form } from 'react-bootstrap';
import { AUTH_URL } from '../../../config/config';

const Register = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState(null); // 'success' ||'clientError' ||'serverError' ||'loginError' ||'loading'

  const handleSubmit = (e) => {
    e.preventDefault();

    const userData = { login, password };

    const options = {
      method: 'post',
      body: userData,
    };

    setStatus('loading');
    fetch(`${AUTH_URL}/register`, options).then((res) => {
      if (res.status === 201) {
        setStatus('success');
      } else if (res.status === 400) {
        setStatus('clientError');
      } else if (res.status === 409) {
        setStatus('loginError');
      } else {
        setStatus('serveError');
      }
    });
  };

  return (
    <Form className='col-12 col-sm-3 mx-auto' onSubmit={handleSubmit}>
      {status === 'success' && (
        <Alert variant='success'>
          <Alert.Heading>Success!</Alert.Heading>
          <p>You have been succesfully registered! You can now log in...</p>
        </Alert>
      )}

      {status === 'serverError' && (
        <Alert variant='danger'>
          <Alert.Heading>Something went wrong...</Alert.Heading>
          <p>Unexpected error... try again!</p>
        </Alert>
      )}

      {status === 'clientError' && (
        <Alert variant='danger'>
          <Alert.Heading>No enough data</Alert.Heading>
          <p>You have to fill all the fields</p>
        </Alert>
      )}

      {status === 'loginError' && (
        <Alert variant='warning'>
          <Alert.Heading>Login already in use</Alert.Heading>
          <p>You have to use other login</p>
        </Alert>
      )}

      {status === 'loading' && (
        <Spinner animation='border' role='status' className='block mx-auto'>
          <span className='visually-hidden'>Loading...</span>
        </Spinner>
      )}

      <h1 className='m4'>Sign Up</h1>

      <Form.Group className='mb-3' controlId='formLogin'>
        <Form.Label>Login</Form.Label>
        <Form.Control
          type='text'
          placeholder='Enter login'
          value={login}
          onChange={(e) => setLogin(e.target.value)}
        ></Form.Control>
      </Form.Group>

      <Form.Group className='mb-3' controlId='formPassword'>
        <Form.Label>Password</Form.Label>
        <Form.Control
          type='password'
          placeholder='Enter password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></Form.Control>
      </Form.Group>

      <Button variant='primary' type='submit'>
        Submit
      </Button>
    </Form>
  );
};

export default Register;
