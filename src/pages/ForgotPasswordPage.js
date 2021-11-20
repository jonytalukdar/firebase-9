import {
  Button,
  Center,
  chakra,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useToast,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Card } from '../components/Card';
import DividerWithText from '../components/DividerWithText';
import { Layout } from '../components/Layout';
import { useAuth } from '../context/auth-context';
import useMounted from '../context/useMounted';

export default function ForgotPasswordPage() {
  const { forgotPassword } = useAuth();

  const history = useHistory();
  const toast = useToast();
  const mounted = useMounted();

  const [enteredEmail, setEnteredEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitHander = (e) => {
    e.preventDefault();

    setIsSubmitting(true);
    forgotPassword(enteredEmail)
      .then((res) => {
        toast({
          description: 'Check your email for further instructions',
          status: 'success',
          duration: '4000',
          isClosable: true,
        });
        history.push('/login');
      })
      .catch((error) => {
        toast({
          description: error.code,
          status: 'error',
          duration: '4000',
          isClosable: true,
        });
      })
      .finally(() => mounted.current && setIsSubmitting(false));
  };

  return (
    <Layout>
      <Heading textAlign="center" my={12}>
        Forgot password
      </Heading>
      <Card maxW="md" mx="auto" mt={4}>
        <chakra.form onSubmit={submitHander}>
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
            <Button
              isLoading={isSubmitting}
              type="submit"
              colorScheme="primary"
              size="lg"
              fontSize="md"
            >
              Submit
            </Button>
          </Stack>
        </chakra.form>
        <DividerWithText my={6}>OR</DividerWithText>
        <Center>
          <Button variant="link" onClick={() => history.push('/login')}>
            Login
          </Button>
        </Center>
      </Card>
    </Layout>
  );
}
