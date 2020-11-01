import React, {useState, useEffect} from "react";

import { useInput } from "./useInput";

function EditModal({ id, setContacts, handleClose }) {
  const [currentContact, setCurrentContact] = useState(null);
  const [update, setUpdate] = useState(false);
  const { value: name, setValue: setName, bind: bindName, reset: resetName } = useInput("");
  const { value: phone, setValue: setPhone, bind: bindPhone, reset: resetPhone } = useInput("");
  const { value: email, setValue: setEmail, bind: bindEmail, reset: resetEmail } = useInput("");

  const onClose = () => {
    setCurrentContact(null);
    setUpdate(false);
    handleClose();
  }

  const submitEdit = (event) => {
    event.preventDefault()
    let patchBody = {
      updateObject: {
        name: name,
        phone: phone,
        email: email,
      }
    };
    fetch(`/contacts/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(patchBody)
    })
      .then(res => res.json())
      .then((contacts) => {
        setUpdate(true)
        setContacts(contacts)
        resetName();
        resetPhone();
        resetEmail();
      })
  }

  useEffect(() => {
    if (id && !currentContact) {
      fetch(`/contacts/${id}`)
        .then(res => res.json())
        .then(contact => {
          setCurrentContact(contact)
          setName(contact.name)
          setPhone(contact.phone)
          setEmail(contact.email)
        })
    }
  }, [id, currentContact, setName, setPhone, setEmail])

  return (
    <div id="edit-modal">
      <button className="close-button" onClick={onClose}>X</button>
      {!update ? (
        <form className="contact-form" onSubmit={submitEdit}>
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
      ) : (
        <h2>Successfully Updated!</h2>
      )}
    </div>
  )

}

export default EditModal;