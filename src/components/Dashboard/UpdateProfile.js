import React, { useRef, useContext, useState } from 'react';
import { Card, Button, Form, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/auth-conext';

const UpdateProfile = () => {
  const { updateEmailAddress, error, currentUser, updateUserPassword } =
    useContext(AuthContext);
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();

  const [message, setMessage] = useState('');

  const submitHandler = async (e) => {
    e.preventDefault();
    const enteredEmail = emailRef.current.value;
    const enteredPassword = passwordRef.current.value;
    const enteredConfirmPassword = passwordConfirmRef.current.value;

    if (enteredPassword !== enteredConfirmPassword) {
      alert('Password does not match!');
    }

    const promises = [];

    if (enteredEmail !== currentUser.email) {
      promises.push(updateEmailAddress(enteredEmail));
    }
    if (enteredPassword) {
      promises.push(updateUserPassword(enteredPassword));
    }

    Promise.all(promises)
      .then(() => {})
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setMessage('Profile Updated!');
      });
  };

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center">Update Profile</h2>
          {message && <Alert variant="success">{message}</Alert>}
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={submitHandler}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                ref={emailRef}
                defaultValue={currentUser.email}
              />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} />
            </Form.Group>
            <Form.Group id="password-confirm">
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control
                className="mb-3"
                type="password"
                ref={passwordConfirmRef}
              />
            </Form.Group>
            <Button className="w-100" type="submit">
              Update
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-3">
        <Link to="/login">Login</Link>
      </div>
    </>
  );
};

export default UpdateProfile;
