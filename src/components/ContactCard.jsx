import React, { useContext } from 'react';
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const ContactCard = ({ contact }) => {
  const { store, dispatch } = useGlobalReducer()
  return (
    <div className="contact-card">
      <h3>{contact.name}</h3>
      <p>Email: {contact.phone}</p>
      <p>Phone: {contact.email}</p>
      <p>Address: {contact.address}</p>
    </div>
  );
};

export default ContactCard;