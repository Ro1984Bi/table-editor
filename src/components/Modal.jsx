import React, { useState } from "react";
import "../css/Modal.css";

function Modal({ closeModal, onSubmit, defaultValue }) {
  const [formState, setFormState] = useState(
    defaultValue || {
      page: "",
      description: "",
      status: "live",
    }
  );

  const [errors, setErrors] = useState("");

  const validateModal = () => {
    if (formState.description && formState.page && formState.status) {
      setErrors("");
      return true;
    } else {
      let errorFields = [];
      for (const [key, value] of Object.entries(formState)) {
        if (!value) {
          errorFields.push(key);
        }
      }
      setErrors(errorFields.join(", "));
      return false;
    }
  };

  const handleChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const handlSubmit = (e) => {
    e.preventDefault();
    if (!validateModal()) return;
    onSubmit(formState);
    closeModal();
  };
  return (
    <div
      className="modal-container"
      onClick={(e) => {
        if (e.target.className === "modal-container") closeModal();
      }}
    >
      <div className="modal">
        <form>
          <div className="form-group">
            <label htmlFor="page">Page</label>
            <input name="page" value={formState.page} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              name="description"
              value={formState.description}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="status">Status</label>
            <select
              name="status"
              value={formState.status}
              onChange={handleChange}
            >
              <option value="live">Live</option>
              <option value="draft">Draft</option>
              <option value="error">Error</option>
            </select>
          </div>
          {errors && (
            <div className="error">{` Please include: ${errors}`}</div>
          )}
          <button type="submit" className="btn" onClick={handlSubmit}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default Modal;
