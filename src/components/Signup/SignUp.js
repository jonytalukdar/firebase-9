import React, { useRef, useContext } from 'react';
import { Card, Button, Form, Alert, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/auth-conext';

const SignUp = () => {
  const { signUp, error, isLoading } = useContext(AuthContext);

  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();

  const submitHandler = (e) => {
    e.preventDefault();
    const enteredEmail = emailRef.current.value;
    const enteredPassword = passwordRef.current.value;
    const enteredConfirmPassword = passwordConfirmRef.current.value;

    if (enteredPassword !== enteredConfirmPassword) {
      alert('Password does not match!');
    }

    signUp(enteredEmail, enteredPassword);
  };

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center">Sign Up</h2>
          <div className="text-center">
            {error && <Alert variant="danger">{error}</Alert>}
            {isLoading && <Spinner animation="grow" />}
          </div>
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
            <Button className="w-100" type="submit">
              Sign Up
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-3">
        Already have an account? <Link to="/login">Log In</Link>
      </div>
    </>
  );
};

export default SignUp;
