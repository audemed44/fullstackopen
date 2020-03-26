import React from "react";
import personService from "../services/person";

const Persons = ({
  shownPersons,
  setShownPersons,
  setPersons,
  persons,
  setMessage
}) => {
  const handleOnClick = event => {
    const id = event.target.id;
    if (
      window.confirm(
        `Delete ${
          persons.filter(person => person.id === parseInt(id))[0].name
        }?`
      )
    ) {
      personService.remove(event.target.id).then(resp => {
        setShownPersons(
          shownPersons.filter(person => person.id !== parseInt(id))
        );
        setPersons(persons.filter(person => person.id !== parseInt(id)));
      });
    }
  };

  return (
    <div>
      <h2>Numbers</h2>
      {shownPersons.map(person => (
        <p key={person.id}>
          {person.name} {person.number}
          <button id={person.id} onClick={handleOnClick}>
            delete
          </button>
        </p>
      ))}
    </div>
  );
};

export default Persons;
