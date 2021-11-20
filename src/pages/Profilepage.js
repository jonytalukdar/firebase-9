import React from 'react';
import { Layout } from '../components/Layout';
import { Badge, Code, Container, Heading, chakra } from '@chakra-ui/react';
import { Card } from '../components/Card';
import { useAuth } from '../context/auth-context';

const Profilepage = () => {
  const { currentUser } = useAuth();

  return (
    <Layout>
      <Heading>
        Profile page
        <Badge colorScheme="green" fontSize="lg" mx={4}>
          Protected Page
        </Badge>
      </Heading>

      <Container maxW="container.lg" overflowX="auto" py={4}>
        {JSON.stringify(currentUser)}
      </Container>
    </Layout>
  );
};

export default Profilepage;
