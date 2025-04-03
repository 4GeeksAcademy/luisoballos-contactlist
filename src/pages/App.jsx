import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import ContactList from "../components/ContactList";
import { Services } from "../services/Services.js";
import { useState, useEffect } from "react";

export const App = () => {
  const { store, dispatch } = useGlobalReducer();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newContact, setNewContact] = useState({
    full_name: "",
    email: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    handleFetchAgenda().catch((error) =>
      console.error("Fetch agenda error:", error)
    );
  }, []);

  const handleFetchAgenda = async () => {
    try {
      const agenda = await Services.fetchAgenda();
      dispatch({ type: "fetchAgenda", payload: { agenda } });
    } catch (error) {
      console.error("Error fetching agenda:", error);
    }
  };

const handleAddContact = async (e) => {
	e.preventDefault();
	try {
	  const createdContact = await Services.addContact(newContact);
	  dispatch({ 
		type: "addContact", 
		payload: { contact: createdContact } 
	  });
	  setNewContact({ full_name: "", email: "", phone: "", address: "" });
	  setIsModalOpen(false);
	  await handleFetchContacts(); // Refresh the list
	} catch (error) {
	  console.error("Error adding contact:", error);
	}
  };
  
  const handleUpdateContact = async (contactId, updatedData) => {
	try {
	  const updatedContact = await Services.updateContact(contactId, updatedData);
	  dispatch({
		type: "updateContact",
		payload: { contact: updatedContact }
	  });
	} catch (error) {
	  console.error("Error updating contact:", error);
	}
  };
  
  const handleDeleteContact = async (contactId) => {
	try {
	  await Services.deleteContact(contactId);
	  dispatch({
		type: "deleteContact",
		payload: { contactId: contactId }
	  });
	} catch (error) {
	  console.error("Error deleting contact:", error);
	}
  };

  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Contact List</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="btn btn-primary"
        >
          Add New Contact
        </button>
      </div>

      <ContactList contacts={store.contacts} />

      {isModalOpen && (
        <div className="modal show" style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add New Contact</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setIsModalOpen(false)}
                ></button>
              </div>
              <form onSubmit={handleAddContact}>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">Full Name</label>
                    <input
                      type="text"
                      className="form-control"
                      value={newContact.full_name}
                      onChange={(e) =>
                        setNewContact({ ...newContact, full_name: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                      type="text"
                      className="form-control"
                      value={newContact.email}
                      onChange={(e) =>
                        setNewContact({ ...newContact, email: e.target.value })
                      }
                      required
                    />
                  </div>
				  <div className="mb-3">
                    <label className="form-label">Phone</label>
                    <input
                      type="text"
                      className="form-control"
                      value={newContact.phone}
                      onChange={(e) =>
                        setNewContact({ ...newContact, phone: e.target.value })
                      }
                      required
                    />
                  </div>
				  <div className="mb-3">
                    <label className="form-label">Address</label>
                    <input
                      type="text"
                      className="form-control"
                      value={newContact.address}
                      onChange={(e) =>
                        setNewContact({ ...newContact, address: e.target.value })
                      }
                      required
                    />
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="submit" className="btn btn-primary">
                    Add Contact
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setIsModalOpen(false)}
                  >
                    Close
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;