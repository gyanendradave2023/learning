import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';
import Navbar from '../components/Common/Navbar';

const GET_EMAIL = gql`
  query($id: ID!) {
    getEmail(id: $id) {
      id
      to
      from
      subject
      body
      sentAt
    }
  }
`;

const SentEmailView = () => {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_EMAIL, { variables: { id } });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const { getEmail } = data;

  return (
    <div>
        <Navbar />
      <h2 className="text-2xl mb-4">Sent Email Details</h2>
      <p><strong>To:</strong> {getEmail.to}</p>
      <p><strong>From:</strong> {getEmail.from}</p>
      <p><strong>Subject:</strong> {getEmail.subject}</p>
      <p><strong>Body:</strong> {getEmail.body}</p>
      <p><strong>Sent At:</strong> {getEmail.sentAt}</p>
    </div>
  );
};

export default SentEmailView;
