import { axiosLoggedIn, axiosWithoutAuth } from "@/api";

export const ContactsService = {
  // Get all contacts
  getAllContacts: () => {
    return axiosWithoutAuth.get("/contacts");
  }, // Get all contacts
  getContact: (id) => {
    return axiosWithoutAuth.get(`/contacts/${id}`);
  },
  // Create a new contact
  createContact: (data) => {
    return axiosLoggedIn.post("/contacts", data);
  },

  // Update an existing contact
  updateContact: ({ id, payload }) => {
    return axiosLoggedIn.put(`/contacts/${id}`, payload);
  },

  // Delete a contact by ID
  deleteContact: (id) => {
    return axiosLoggedIn.delete(`/contacts/${id}`);
  },
};
