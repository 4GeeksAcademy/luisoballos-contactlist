import React from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const ContactList = () => {
  const { store } = useGlobalReducer();

  return (
    <div className="contact-list">
      {store.contacts.length > 0 ? (
        store.contacts.map((contact) => (
          <div key={contact.id} className="contact-card">
            <h3>{contact.full_name}</h3>
            <p>Email: {contact.email}</p>
            <p>Phone: {contact.phone}</p>
            <p>Address: {contact.address}</p>
          </div>
        ))
      ) : (
        <p>No contacts available. Add a new contact to get started!</p>
      )}
    </div>
  );
};

export default ContactList;