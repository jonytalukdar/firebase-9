import {
  Button,
  chakra,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Stack,
  useToast,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { FaGoogle } from 'react-icons/fa';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { Card } from '../components/Card';
import DividerWithText from '../components/DividerWithText';
import { Layout } from '../components/Layout';
import { useAuth } from '../context/auth-context';
import useMounted from '../context/useMounted';

export default function Loginpage() {
  const { login, goggleSingIn } = useAuth();
  const mounted = useMounted();
  const history = useHistory();
  const location = useLocation();
  const toast = useToast();

  const [enteredEmail, setEnteredEmail] = useState('');
  const [enteredPassword, setEnteredPassword] = useState('');
  const [isSubmiting, setIsSubmiting] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();

    setIsSubmiting(true);
    login(enteredEmail, enteredPassword)
      .then((res) => {
        toast({
          description: 'LoggedIn successfully',
          status: 'success',
          duration: '4000',
          isClosable: true,
        });
        history.push(`${location.state ? location.state.from : 'profile'}`);
      })
      .catch((error) => {
        toast({
          description: error.code,
          status: 'error',
          duration: '4000',
          isClosable: true,
        });
      })
      .finally(() => mounted.current && setIsSubmiting(false));
  };

  return (
    <Layout>
      <Heading textAlign="center" my={12}>
        Login
      </Heading>
      <Card maxW="md" mx="auto" mt={4}>
        <chakra.form onSubmit={submitHandler}>
          <Stack spacing="6">
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input
                name="email"
                type="email"
                autoComplete="email"
                required
                value={enteredEmail}
                onChange={(e) => setEnteredEmail(e.target.value)}
              />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input
                name="password"
                type="password"
                autoComplete="password"
                required
                value={enteredPassword}
                onChange={(e) => setEnteredPassword(e.target.value)}
              />
            </FormControl>
            {/* <PasswordField /> */}
            <Button
              isLoading={isSubmiting}
              type="submit"
              colorScheme="primary"
              size="lg"
              fontSize="md"
            >
              Sign in
            </Button>
          </Stack>
        </chakra.form>
        <HStack justifyContent="space-between" my={4}>
          <Button variant="link">
            <Link to="/forgot-password">Forgot password?</Link>
          </Button>
          <Button variant="link" onClick={() => history.push('/register')}>
            Register
          </Button>
        </HStack>
        <DividerWithText my={6}>OR</DividerWithText>
        <Button
          variant="outline"
          isFullWidth
          colorScheme="red"
          leftIcon={<FaGoogle />}
          onClick={goggleSingIn}
        >
          Sign in with Google
        </Button>
      </Card>
    </Layout>
  );
}
