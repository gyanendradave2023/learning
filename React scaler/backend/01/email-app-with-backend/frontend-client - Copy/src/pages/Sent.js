import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSentEmails } from '../features/email/emailSlice';

const Sent = () => {
  const dispatch = useDispatch();
  const sentEmails = useSelector((state) => state.email.sentEmails);

  useEffect(() => {
    dispatch(fetchSentEmails());
  }, [dispatch]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Sent Emails</h1>
      <ul>
        {sentEmails.map((email) => (
          <li key={email.id} className="bg-white p-4 mb-2 rounded shadow-md">
            <h2 className="text-lg font-bold">{email.subject}</h2>
            <p className="text-gray-600">{email.body}</p>
            <p className="text-sm text-gray-400">To: {email.to}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sent;
