import React, { useState, useEffect } from "react";
import "./App.css";
import "@aws-amplify/ui-react/styles.css";
import { API , Predictions } from "aws-amplify";
import {
  Button,
  Flex,
  Heading,
  Text,
  TextField,
  View,
  withAuthenticator,
} from "@aws-amplify/ui-react";
import { listNotes } from "./graphql/queries";
import {
  createNote as createNoteMutation,
  deleteNote as deleteNoteMutation,
} from "./graphql/mutations";

const App = ({ signOut }) => {
  const [notes, setNotes] = useState([]);
  const [response, setResponse] = useState("Please upload a screenshot :)");
  const [noteName, setNoteName] = useState("");
  
  useEffect(() => {
    fetchNotes();
  }, []);
  
  async function identify(event) {
    setResponse("Finding text...");
    const { target: { files }} = event;
    const file = files[0];
    const data = await Predictions.identify({
      text: { source: { file }, format: "PLAIN"} // PLAIN, FORM, TABLE, ALL
    }) 
    setResponse(data.text.fullText)
  }
  
  async function fetchNotes() {
    const apiData = await API.graphql({ query: listNotes });
    const notesFromAPI = apiData.data.listNotes.items;
    setNotes(notesFromAPI);
  }

  async function createNote(event) {
    event.preventDefault();
    const form = new FormData(event.target);
    const data = {
      name: noteName,
      description: form.get("description"),
    };
    await API.graphql({
      query: createNoteMutation,
      variables: { input: data },
    });
    fetchNotes();
    setNoteName("");
    event.target.reset();
  }

  async function deleteNote({ id }) {
    const newNotes = notes.filter((note) => note.id !== id);
    setNotes(newNotes);
    await API.graphql({
      query: deleteNoteMutation,
      variables: { input: { id } },
    });
  }

  return (
    <View className="App">
      <h1>My Screenshot App</h1>
      <View as="form" margin="3rem 0" onSubmit={createNote}>
        <Flex direction="column" justifyContent="center">
          <input
            type="file" onChange={identify}
            name="name"
            placeholder="Note Name"
            label="Note Name"
            labelHidden
            variation="quiet"
            required
          />
            <TextField
          name="name"
          placeholder="Note Name"
         label="Note Name"
          labelHidden
          value={noteName}
          onChange={(event) => setNoteName(event.target.value)}
          variation="quiet"
          required
          />

            <textarea
            name="description"
            placeholder="Extracted Text"
            label="Extracted Text"
            labelHidden
            variation="quiet"
            value={response} // set the value of the input box to the state variable
            onChange={(event) => setResponse(event.target.value)} // update the state variable when the input is edited
            required
          />
          <Button type="submit" variation="primary">
            Upload screenshot
          </Button>
        </Flex>
      </View>
      <h2>Current Notes</h2>
      <View margin="3rem 0">
        {notes.map((note) => (
          <Flex
            key={note.id || note.name}
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <Text as="strong" fontWeight={700}>
              {note.name}
            </Text>
            <Text as="span">{note.description}</Text>
            <Button variation="link" onClick={() => deleteNote(note)}>
              Delete note
            </Button>
          </Flex>
        ))}
      </View>
      <Button onClick={signOut}>Sign Out</Button>
    </View>
  );
};

export default withAuthenticator(App);
