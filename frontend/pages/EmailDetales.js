import React, { useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';

export const EmailDetail = () => {
  const location = useLocation();
  const history = useHistory();
  const [email, setEmail] = useState(null);

  useEffect(() => {
    const fetchEmailDetails = async () => {
      try {
        const response = await fetch(`/api/emails/${location.params.emailId}`);
        const data = await response.json();
        setEmail(data);
      } catch (error) {
        console.error('Error fetching email details:', error);
      }
    };

    fetchEmailDetails();
  }, [location.params.emailId]);

  const handleReply = () => {
    const replySubject = `Re: ${email.subject}`;
    const replyBody = `----
    on ${email.sentAt}, ${email.sender.email} wrote:
    
    ${email.body}`;

    const replyRecipients = email.sender.email;

    history.push({
      pathname: '/compose',
      state: {
        replySubject,
        replyBody,
        replyRecipients
      }
    });
  };

  return (
    <div>
      <h1>Email Detail</h1>
      {email && (
        <>
          <p>Subject: {email.subject}</p>
          <p>Sender: {email.sender.email}</p>
          <p>Body: {email.body}</p>
          <p>Sent At: {email.sentAt}</p>
          <button onClick={handleReply}>Reply</button>
        </>
      )}
    </div>
  );
};
