export const SLUG = "luisoballos";
const BASE_URL = `https://playground.4geeks.com/contact/agendas/${SLUG}`;

export const Services = {
  fetchAgenda: async () => {
    try {
      const request = await fetch(BASE_URL);
      const response = await request.json();
      return response;
    } catch (e) {
      console.log("Error fetching agenda: ", e);
        return [];
    }
  },

  createAgenda: async () => {
    try {
      const request = await fetch(BASE_URL, {
        method: "POST",
      });
      return [];
    } catch (e) {
      console.error("Error creating agenda: ", e);
    }
  },

  fetchContacts: async () => {
    try {
      const request = await fetch(`${BASE_URL}/contacts`);
      const response = await request.json();
      return response.contacts || [];
    } catch (e) {
      console.error("Error fetching contacts: ", e);
        return [];
    }
  },

  addContact: async (contact) => {
    try {
      const request = await fetch(`${BASE_URL}/contacts`, {
        method: "POST",
        body: JSON.stringify(contact),
        headers: { "Content-Type": "application/json" },
      });
      const newContact = await request.json();
      return newContact;
    } catch (e) {
      console.error("Error adding contact: ", e);
    }
  },

  updateContact: async (contact) => {
    try {
      const request = await fetch(`${BASE_URL}/contacts/${contact.id}`, {
        method: "PUT",
        body: JSON.stringify(contact),
        headers: { "Content-Type": "application/json" },
      });
      const updatedContact = await request.json();
      return updatedContact;
    } catch (e) {
      console.error("Error updating contact: ", e);
    }
  },

  deleteContact: async (contact) => {
    try {
      const request = await fetch(`${BASE_URL}/contacts/${contact.id}`, {
        method: "DELETE",
      });
      return request.ok;
    } catch (e) {
      console.error("Error removing task: ", e);
      return false;
    }
  },

  deleteAgenda: async () => {
    try {
      const request = await fetch(BASE_URL, {
        method: "DELETE",
      });
      return request.ok;
    } catch (e) {
      console.error("Error deleting agenda: ", e);
    }
  },
};