import React, { useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { Services } from "../services/Services";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/css/bootstrap.min.css";

export const ContactList = ({ openEditModal }) => {
  const { store, dispatch } = useGlobalReducer();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [contactToDelete, setContactToDelete] = useState(null);

  const handleDeleteConfirmation = (contactId) => {
    setContactToDelete(contactId);
    setShowDeleteModal(true);
  };

  const handleDeleteContact = async () => {
    try {
      await Services.deleteContact(contactToDelete);
      dispatch({
        type: "deleteContact",
        payload: { contactId: contactToDelete },
      });
      setShowDeleteModal(false);
      setContactToDelete(null);
    } catch (e) {
      console.error("Error deleting contact:", e);
      setShowDeleteModal(false);
      setContactToDelete(null);
    }
  };

  return (
    <div className="container mt-4 w-75">
      {showDeleteModal && (
        <div className="modal show" style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Delete</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowDeleteModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                Are you sure you want to delete this contact? This action cannot be undone.
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowDeleteModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={handleDeleteContact}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {store.contacts.length > 0 ? (
        store.contacts.map((contact) => (
          <div
            key={contact.id}
            className="d-flex align-items-center justify-content-between p-3 mb-3 border rounded shadow-sm"
          >
            <div className="flex-grow-1">
              <h5 className="mb-1">{contact.name}</h5>
              <p className="mb-1">
                <i className="fas fa-map-marker-alt me-2 text-dark"></i>
                {contact.address}
              </p>
              <p className="mb-1">
                <i className="fas fa-phone me-2 text-dark"></i>
                {contact.phone}
              </p>
              <p className="mb-0">
                <i className="fas fa-envelope me-2 text-dark"></i>
                {contact.email}
              </p>
            </div>
            <div className="d-flex align-items-center ms-3 gap-3">
              <i 
                className="fas fa-pen text-dark" 
                role="button" 
                title="Edit"
                onClick={() => openEditModal(contact)}
              ></i>
              <i 
                className="fas fa-trash text-dark" 
                role="button" 
                title="Delete"
                onClick={() => handleDeleteConfirmation(contact.id)}
              ></i>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center">No contacts available. Add a new contact to get started!</p>
      )}
    </div>
  );
};

export default ContactList;