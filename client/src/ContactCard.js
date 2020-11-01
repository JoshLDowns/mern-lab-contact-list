import React from "react";

function ContactCard({ contact, handleDelete, handleEdit }) {
  return (
    <div className="contact" key={contact._id}>
      <div className="controls" id={contact._id}>
        <button className="contact-button" onClick={handleEdit}>
          EDIT
        </button>
        <button className="contact-button" onClick={handleDelete}>
          X
        </button>
      </div>
      <p>{contact.name}</p>
      <p>{contact.phone}</p>
      <p>{contact.email}</p>
    </div>
  );
}

export default ContactCard;
