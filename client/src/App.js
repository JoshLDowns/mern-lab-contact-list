import React, { useState, useEffect } from "react";
import "./App.css";
import EditModal from "./EditModal";
import ContactCard from "./ContactCard";

import { useInput } from "./useInput";

function App() {
  const [contacts, setContacts] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [modal, setModal] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const { value: name, bind: bindName, reset: resetName } = useInput("");
  const { value: phone, bind: bindPhone, reset: resetPhone } = useInput("");
  const { value: email, bind: bindEmail, reset: resetEmail } = useInput("");

  const handleClose = () => {
    setModal(false);
  };

  const handleDelete = (event) => {
    fetch(`/contacts/${event.target.parentElement.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((contacts) => {
        setContacts(contacts);
      });
  };

  const handleEdit = (event) => {
    setCurrentId(event.target.parentElement.id);
    setModal(true);
  };

  const handleForm = (event) => {
    event.preventDefault();
    let postBody = {
      contact: {
        name: name,
        phone: phone,
        email: email,
      },
    };
    fetch("/contacts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postBody),
    })
      .then((res) => res.json())
      .then((contacts) => {
        setContacts(contacts);
        resetName();
        resetPhone();
        resetEmail();
      });
  };

  useEffect(() => {
    if (!contacts) {
      setIsLoading(true);
      fetch("/contacts")
        .then((res) => res.json())
        .then((contacts) => {
          setContacts(contacts);
          setIsLoading(false);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div id="main-wrapper">
      {modal && (
        <EditModal
          id={currentId}
          setContacts={setContacts}
          handleClose={handleClose}
        />
      )}
      <h1>Contacts</h1>
      <form className="contact-form" onSubmit={handleForm}>
        <input
          className="form-input"
          placeholder="Name"
          id="name"
          {...bindName}
        />
        <input
          className="form-input"
          placeholder="Phone"
          id="phone"
          {...bindPhone}
        />
        <input
          className="form-input"
          placeholder="Email"
          id="email"
          {...bindEmail}
        />
        <button type="submit">Submit</button>
      </form>
      {contacts && contacts.length > 0 ? (
        contacts.map((contact) => (
          <ContactCard
            key={contact._id}
            contact={contact}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
          />
        ))
      ) : (
        <p>{isLoading ? "...loading" : "Add a contact!"}</p>
      )}
    </div>
  );
}

export default App;
