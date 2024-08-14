import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';

const GET_EMAIL = gql`
  query Email($id: ID!) {
    email(id: $id) {
      from
      to
      subject
      body
      sentAt
    }
  }
`;

const EmailView = () => {
  const { id } = useParams();
  const { data, loading, error } = useQuery(GET_EMAIL, { variables: { id } });
  const [email, setEmail] = useState(null);

  useEffect(() => {
    if (data) setEmail(data.email);
  }, [data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading email</p>;

  return (
    <div className="p-4">
      {email ? (
        <div className="bg-white p-4 rounded shadow-md">
          <h1 className="text-2xl font-bold mb-2">{email.subject}</h1>
          <p className="text-gray-600">From: {email.from}</p>
          <p className="text-gray-600">To: {email.to}</p>
          <p className="text-gray-600">Sent At: {new Date(email.sentAt).toLocaleString()}</p>
          <p className="mt-4">{email.body}</p>
        </div>
      ) : (
        <p>Email not found</p>
      )}
    </div>
  );
};

export default EmailView;
