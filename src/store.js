export const initialStore = () => {
  return {
    agenda: "",
    contacts: [],
  };
};

export default function storeReducer(store, action) {
  switch (action.type) {
    case "fetchAgenda":
      return {
        ...store,
        agenda: action.payload.agenda || "",
      };

    case "createAgenda":
      return {
        ...store,
        agenda: action.payload.agenda,
      };

    case "fetchContacts":
      return {
        ...store,
        contacts: action.payload.contacts,
      };

    case "addContact":
      return {
        ...store,
        contacts: [...store.contacts, action.payload.contact],
      };

    case "updateContact":
      return {
        ...store,
        contacts: store.contacts.map((contact) =>
          contact.id === action.payload.contact.id
            ? action.payload.contact
            : contact
        ),
      };

    case "deleteContact":
      return {
        ...store,
        contacts: store.contacts.filter(
          (contact) => contact.id !== action.payload.contactId
        ),
      };

    case "deleteAgenda":
      return {
        agenda: "",
        contacts: [],
      };

    default:
      throw Error("Unknown action.");
  }
}
