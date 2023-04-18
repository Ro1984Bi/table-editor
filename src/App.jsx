import { useState } from "react";
import "./App.css";
import Modal from "./components/Modal";
import Table from "./components/Table";

function App() {
  const [modalOpen, setModalOpen] = useState(false);

  const [rows, setRows] = useState([
    { page: "Page 1", description: "This is the first page", status: "live" },
    { page: "Page 2", description: "This is the second page", status: "draft" },
    { page: "Page 3", description: "This is the third page", status: "error" },
  ]);

  const [rowToEdit, setRowToEdit] = useState(null);

  const handleEdit = (index) => {
    setRowToEdit(index);
    setModalOpen(true);
  };

  const handleDeleteRow = (targetIndex) => {
    setRows(rows.filter((_, index) => index !== targetIndex));
  };
  const handleSubmit = (newRow) => {
    rowToEdit === null
      ? setRows([...rows, newRow])
      : setRows(
          rows.map((currentRow, index) => {
            if (index !== rowToEdit) return currentRow;

            return newRow;
          })
        );
  };
  return (
    <div className="App">
      <Table rows={rows} deleteRow={handleDeleteRow} editRow={handleEdit} />
      <button className="btn" onClick={() => setModalOpen(true)}>
        Add
      </button>
      {modalOpen && (
        <Modal
          closeModal={() => {
            setModalOpen(false);
            setRowToEdit(null)
          }}
          onSubmit={handleSubmit}
          defaultValue={rowToEdit !== null && rows[rowToEdit]}
        />
      )}
    </div>
  );
}

export default App;
