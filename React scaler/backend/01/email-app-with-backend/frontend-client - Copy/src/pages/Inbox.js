import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchInbox } from '../features/email/emailSlice';

const Inbox = () => {
  const dispatch = useDispatch();
  const inbox = useSelector((state) => state.email.inbox);

  useEffect(() => {
    dispatch(fetchInbox());
  }, [dispatch]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Inbox</h1>
      <ul>
        {inbox.map((email) => (
          <li key={email.id} className="bg-white p-4 mb-2 rounded shadow-md">
            <h2 className="text-lg font-bold">{email.subject}</h2>
            <p className="text-gray-600">{email.body}</p>
            <p className="text-sm text-gray-400">From: {email.from}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Inbox;
