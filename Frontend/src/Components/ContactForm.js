import React, { useState } from 'react';
import './ContactForm.css';
import { ThreeDots } from 'react-loader-spinner';

const ContactForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSent, setIsSent] = useState(false);
  const [showError, setShowError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !email || !message) {
      setShowError(true);
      return;
    }

    setShowError(false);
    setIsLoading(true);

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
        setIsLoading(false);
        setName('');
        setEmail('');
        setMessage('');

        setTimeout(() => {
          setIsSent(false);
        }, 5000);
      })
      .catch((error) => {
        console.error('Error:', error);
        setIsLoading(false);
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>Contact me</h1>
        <label>
          <input placeholder= "Name" type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <label>
          <input placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label>
          <textarea placeholder="Message" value={message} onChange={(e) => setMessage(e.target.value)} />
        </label>
        <button type="submit">Send Message</button>
      </form>
      {showError && <p>Please fill out all fields before submitting.</p>}
      {isLoading && <div className='loaderContainer'><ThreeDots color="black" height={15} width={50} /></div>}
      {isSent && <p>Message sent successfully!</p>}
    </div>
  );
};

export default ContactForm;
