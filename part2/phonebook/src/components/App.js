import React, { useState } from "react";
import SearchPerson from "./SearchPerson";
import PersonForm from "./PersonForm";
import Persons from "./Persons";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456" },
    { name: "Ada Lovelace", number: "39-44-5323523" },
    { name: "Dan Abramov", number: "12-43-234345" },
    { name: "Mary Poppendieck", number: "39-23-6423122" }
  ]);
  const [shownPersons, setShownPersons] = useState(persons);

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
