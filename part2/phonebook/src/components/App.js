import React, { useState, useEffect } from "react";
import SearchPerson from "./SearchPerson";
import PersonForm from "./PersonForm";
import Persons from "./Persons";
import personService from "../services/person";
import Notification from "./Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [shownPersons, setShownPersons] = useState([]);
  const [message, setMessage] = useState({
    type: "init",
    msg: "initial message"
  });
  useEffect(() => {
    personService.getAll().then(allPersons => {
      setPersons(allPersons);
      setShownPersons(allPersons);
    });
  }, []);

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <SearchPerson persons={persons} setShownPersons={setShownPersons} />
      <PersonForm
        persons={persons}
        setPersons={setPersons}
        setShownPersons={setShownPersons}
        setMessage={setMessage}
      />
      <Persons
        shownPersons={shownPersons}
        setShownPersons={setShownPersons}
        setPersons={setPersons}
        persons={persons}
        setMessage={setMessage}
      />
    </div>
  );
};

export default App;
