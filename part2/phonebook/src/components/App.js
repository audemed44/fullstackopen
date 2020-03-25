import React, { useState, useEffect } from "react";
import SearchPerson from "./SearchPerson";
import PersonForm from "./PersonForm";
import Persons from "./Persons";
import axios from "axios";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [shownPersons, setShownPersons] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:3001/persons").then(response => {
      setPersons(response.data);
      setShownPersons(response.data);
    });
  }, []);

  return (
    <div>
      <h2>Phonebook</h2>
      <SearchPerson persons={persons} setShownPersons={setShownPersons} />
      <PersonForm
        persons={persons}
        setPersons={setPersons}
        setShownPersons={setShownPersons}
      />
      <Persons shownPersons={shownPersons} />
    </div>
  );
};

export default App;
