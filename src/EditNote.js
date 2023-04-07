import React, { useState } from 'react';
const EditNoteForm = ({ editingNote, onClose, onUpdate }) => {
  const [name, setName] = useState(editingNote.name);
  const [description, setDescription] = useState(editingNote.description);

  const handleUpdate = () => {
    onUpdate({
      id: editingNote.id,
      name,
      description
    });
    onClose();
  };

  return (
    <div>
      <h2>Edit Note</h2>
      <form onSubmit={handleUpdate}>
        <label htmlFor="edit-note-name">Name:</label>
        <input
          id="edit-note-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <br />
        <label htmlFor="edit-note-description">Description:</label>
        <textarea
          id="edit-note-description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <br />
        <button type="submit">Save Changes</button>
        <button type="button" onClick={onClose}>
          Cancel
        </button>
      </form>
    </div>
  );
};
export default EditNoteForm;