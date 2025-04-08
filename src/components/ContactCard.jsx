import React from 'react';
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const ContactCard = () => {
  const { store } = useGlobalReducer()
  return (
    <div key={store.contact.id} className="contact-card">
        <h3>{store.contact.name}</h3>
        <p>Email: {store.contact.email}</p>
        <p>Phone: {store.contact.phone}</p>
        <p>Address: {store.contact.address}</p>
      </div>
  );
};

export default ContactCard;