import { useState } from "react";
import { Badge, Card } from '@aws-amplify/ui-react';

const Spacing = ({ notes, setNotes }) => {
  const [badgeName, setBadgeName] = useState("");
  const [selectedNote, setSelectedNote] = useState(null);

  const handleNewBadgeSubmit = (event) => {
    event.preventDefault();
    const newBadge = {
      name: badgeName,
      description: "This is a new note",
    };
    setNotes([...notes, newBadge]);
    setBadgeName("");
  };

  const handleBadgeClick = (note) => {
    setSelectedNote(note);
  };

  return (
    <>
      <form onSubmit={handleNewBadgeSubmit}>
        <input
          type="text"
          value={badgeName}
          onChange={(event) => setBadgeName(event.target.value)}
          placeholder="Badge Name"
          required
        />
        <button type="submit">Add Badge</button>
      </form>

      {notes.map((note) => (
        <Badge
          key={note.id || note.name}
          onClick={() => handleBadgeClick(note)}
        >
          {note.name}
        </Badge>
      ))}

      {selectedNote && (
        <Card>
          <h3>{selectedNote.name}</h3>
          <p>{selectedNote.description}</p>
        </Card>
      )}
    </>
  );
};

export default Spacing;

