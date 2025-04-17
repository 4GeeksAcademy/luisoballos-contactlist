import { useState, useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { ContactList } from "../components/ContactList.jsx";
import { Services, SLUG } from "../services/Services.js";

export const App = () => {
  const { store, dispatch } = useGlobalReducer();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentEditId, setCurrentEditId] = useState(null);
  const [newContact, setNewContact] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    handleFetchAgendas();
  }, []);
  const handleFetchAgendas = async () => {
    try {
      const agendas = Services.fetchAgendas();
      if(agendas.find(agendas.SLUG)) {
        handleFetchAgenda();
      }
    } catch (e) {
      console.error("Error fetching agendas:", e);
    }
  }

  const handleFetchAgenda = async () => {
    try {
      const agenda = await Services.fetchAgenda();
      console.log("Agenda fetched: ", agenda);
      dispatch({ type: "fetchAgenda", contacts: agenda.contacts });

      if (agenda?.slug !== SLUG) {
        handleCreateAgenda();
      }
    } catch (e) {
      console.error("Error fetching agenda:", e);
      handleCreateAgenda();
    }
  };

  const handleCreateAgenda = async () => {
    try {
      const agenda = await Services.createAgenda();
      dispatch({ type: "createAgenda", payload: { agenda } });
    } catch (e) {
      console.error("Error creating agenda:", e);
    }
  };

  const handleDeleteAgenda = async () => {
    try {
      await Services.deleteAgenda();
      dispatch({ type: "deleteAgenda" });
    } catch (e) {
      console.error("Error deleting agenda:", e);
    }
  };

  const handleAddContact = async (e) => {
    e.preventDefault();
    try {
      const createdContact = await Services.addContact(newContact);
      dispatch({
        type: "addContact",
        payload: { contact: createdContact },
      });
      resetFormAndCloseModal();
    } catch (e) {
      console.error("Error adding contact:", e);
    }
  };

  const handleUpdateContact = async (contactId, updatedData) => {
    try {
      const updatedContact = await Services.updateContact(contactId, updatedData);
      dispatch({
        type: "updateContact",
        payload: { contact: updatedContact },
      });
    } catch (e) {
      console.error("Error updating contact:", e);
    }
  };

  const handleSubmitUpdate = async (e) => {
    e.preventDefault();
    try {
      await handleUpdateContact(currentEditId, newContact);
      resetFormAndCloseModal();
    } catch (e) {
      console.error("Error updating contact:", e);
    }
  };

  const openEditModal = (contact) => {
    setIsEditMode(true);
    setCurrentEditId(contact.id);
    setNewContact({
      name: contact.name,
      email: contact.email,
      phone: contact.phone,
      address: contact.address,
    });
    setIsModalOpen(true);
  };

  const resetFormAndCloseModal = () => {
    setIsModalOpen(false);
    setIsEditMode(false);
    setCurrentEditId(null);
    setNewContact({ name: "", email: "", phone: "", address: "" });
  };

  const openAddContactModal = () => {
    resetFormAndCloseModal();
    setIsModalOpen(true);
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center bg-secondary text-white p-3 rounded">
        Luis Oballos' Contact List
      </h1>

      <div className="d-flex justify-content-center mb-3">
        <button onClick={openAddContactModal} className="btn btn-primary">
          Add New Contact
        </button>
      </div>
      <ContactList openEditModal={openEditModal} />
      {isModalOpen && (
        <div className="modal show" style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {isEditMode ? "Edit Contact" : "Add New Contact"}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={resetFormAndCloseModal}
                ></button>
              </div>
              <form onSubmit={isEditMode ? handleSubmitUpdate : handleAddContact}>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">Full Name</label>
                    <input
                      type="text"
                      className="form-control"
                      value={newContact.name}
                      onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      value={newContact.email}
                      onChange={(e) => setNewContact({ ...newContact, email: e.target.value })}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Phone</label>
                    <input
                      type="text"
                      className="form-control"
                      value={newContact.phone}
                      onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Address</label>
                    <input
                      type="text"
                      className="form-control"
                      value={newContact.address}
                      onChange={(e) => setNewContact({ ...newContact, address: e.target.value })}
                      required
                    />
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="submit" className="btn btn-primary">
                    {isEditMode ? "Save Changes" : "Add Contact"}
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={resetFormAndCloseModal}
                  >
                    Close
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      <div className="d-flex justify-content-center align-items-center gap-3 my-3">
        <button onClick={handleFetchAgenda} className="btn btn-secondary">
          Refresh Agenda
        </button>
        <button onClick={handleDeleteAgenda} className="btn btn-danger">
          Delete Agenda
        </button>
      </div>
    </div>
  );
};

export default App;