import React, { useState } from 'react';
import  './ContactForm.css';


const ContactForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSent, setIsSent] = useState(false);
  const [showError, setShowError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !email || !message) {
      setShowError(true);
      return;
    }

    setShowError(false);

    fetch('http://localhost:5000/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, message }),
    })

      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setIsSent(true);

      })

      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <div>
      {showError && <p>Please fill out all fields before submitting.</p>}
      {isSent ? (
        <p>Message sent successfully!</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
          </label>
          <label>
            Email:
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </label>
          <label>
            Message:
            <textarea value={message} onChange={(e) => setMessage(e.target.value)} />
          </label>
          <button type="submit">Send Message</button>
        </form>
      )}
    </div>
  );
};

export default ContactForm;
