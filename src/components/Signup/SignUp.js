import React, { useContext, useRef, useState } from 'react';

import { Card, Button, Form, Alert } from 'react-bootstrap';
import { AuthContext } from '../../context/auth-conext';

const SignUp = () => {
  const { signUp } = useContext(AuthContext);

  //state
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();

  const submitHandler = async (e) => {
    e.preventDefault();
    const enteredEmail = emailRef.current.value;
    const enteredPassword = passwordRef.current.value;
    const enteredConfirmPassword = passwordConfirmRef.current.value;

    if (enteredPassword !== enteredConfirmPassword) {
      return setError('Password does not match!');
    }
    try {
      setLoading(true);
      setError('');
      await signUp(enteredEmail, enteredPassword);
    } catch (error) {
      setError('Failed to create an account!');
    }
    setLoading(false);
  };

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center">Sign Up</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={submitHandler}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} />
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
            <Button disabled={loading} className="w-100" type="submit">
              Sign Up
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-3">
        Already have an account? Log In
      </div>
    </>
  );
};

export default SignUp;
