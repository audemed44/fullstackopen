import React, { useState, useEffect } from "react";
import SearchPerson from "./SearchPerson";
import PersonForm from "./PersonForm";
import Persons from "./Persons";
import personService from "../services/person";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [shownPersons, setShownPersons] = useState([]);
  useEffect(() => {
    personService.getAll().then(allPersons => {
      setPersons(allPersons);
      setShownPersons(allPersons);
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
      <Persons
        shownPersons={shownPersons}
        setShownPersons={setShownPersons}
        setPersons={setPersons}
        persons={persons}
      />
    </div>
  );
};

export default App;
