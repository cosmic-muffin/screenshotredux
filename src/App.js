import React, { useState, useEffect } from "react";
import "./App.css";
import "@aws-amplify/ui-react/styles.css";
import { API , Predictions } from "aws-amplify";
import {
  Collection,
  Button,
  Card,
  Flex,
  Heading,
  Text,
  TextField,
  View,
  withAuthenticator,
  ThemeProvider,
} from "@aws-amplify/ui-react";
import { listNotes } from "./graphql/queries";
import {
  createNote as createNoteMutation,
  deleteNote as deleteNoteMutation,
} from "./graphql/mutations";


const App = ({ signOut }) => {
  const [notes, setNotes] = useState([]);
  const [response, setResponse] = useState("");
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
      description: response,
      //description: form.get("description"),
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
  <ThemeProvider>
    <View className="App" style={{ backgroundColor: 'var(--background-color)' }}>
      <Heading
        level={1}
        style={{
          color: 'var(--primary-color)',
          fontFamily: 'Montserrat, sans-serif',
          fontWeight: 'bold',
          textTransform: 'uppercase',
          letterSpacing: '0.2rem',
          textAlign: 'center',
          margin: '1rem auto',
        }}
      >
        ScreenshotRedux
      </Heading>
      

    <span style={{ fontSize: "4rem", }}> &#129412;</span>

      <View as="form" margin="3rem 0" onSubmit={createNote}>
  <Flex direction="column" justifyContent="center" gap={4}>
    
          <label htmlFor="file-upload" className="file-label">
            Click me to find screenshot &#128269;
          </label>
          
          <input
            type="file"
            id="file-upload"
            onChange={identify}
            className="file-input"
          />
        
          <TextField
            name="Note name"
            placeholder="What is this?"
            value={noteName}
            onChange={(event) => setNoteName(event.target.value)}
            style={{ width: '35%' }}
            required
          />
          
          <textarea
            name="Note.description aka extracted text"
            placeholder="Cool extracted screenshot text here"
            variation="quiet"
            value={response}
            onChange={(event) => setResponse(event.target.value)}
            style={{ width: '35%', margin: 'auto', textAlign: 'center' }}
            required
          />
        
              <Button
        type="submit"
        variation="primary"
        style={{ width: '35%', margin: 'auto', textAlign: 'center' }}
      >
        Save me! &#128640;
      </Button>

        </Flex>
      </View>

      <Heading level={2} style={{ color: 'var(--primary-color)' }}>
        &#127881;Things to Do &#127881;
      </Heading>

      <View margin="3rem 0">
        <Collection
          type="grid"
          items={notes}
          templateColumns="repeat(auto-fit, minmax(300px, 1fr))"
        >
          {(note, index) => (
            <Card
              key={note.id || note.name}
              style={{
                maxWidth: 300,
                backgroundColor: 'white',
                borderRadius: 8,
                boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
                minHeight: 'auto',
                margin: '10px',
              }}
            >
              <View padding={3}>
                <Heading level={2} style={{ marginBottom: 0 }}>
                  {note.name}
                </Heading>
                <Text style={{ color: '#888', fontSize: 14 }}>
                  {note.description}
                </Text>
                <Button
                  variation="primary"
                  onClick={() => deleteNote(note)}
                  style={{ marginTop: 10 }}
                >
                  Delete note
                </Button>
              </View>
            </Card>
          )}
        </Collection>
      </View>

      <Button onClick={signOut} className="orangebutton">Sign Out</Button>
    </View>
  </ThemeProvider>
);
};


export default withAuthenticator(App);
