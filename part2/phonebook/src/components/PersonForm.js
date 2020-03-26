import React, { useState } from "react";
import personService from "../services/person";

const PersonForm = props => {
  const [newPerson, setNewPerson] = useState({
    name: "",
    number: ""
  });
  const handleOnChangeName = event =>
    setNewPerson({ name: event.target.value, number: newPerson.number });

  const handleOnChangeNumber = event =>
    setNewPerson({ name: newPerson.name, number: event.target.value });

  const addPerson = event => {
    event.preventDefault();
    const PersonObject = {
      id: props.persons.length + 1,
      name: newPerson.name,
      number: newPerson.number
    };
    console.log(PersonObject.id);
    if (props.persons.map(elem => elem.name).includes(newPerson.name)) {
      if (
        window.confirm(
          `${newPerson.name} is already added to the phonebook, replace the old number with a new one?`
        )
      ) {
        PersonObject.id = props.persons.filter(
          person => person.name === newPerson.name
        )[0].id;
        props.setPersons(
          props.persons
            .filter(person => person.name !== newPerson.name)
            .concat(PersonObject)
        );
        props.setShownPersons(
          props.persons
            .filter(person => person.name !== newPerson.name)
            .concat(PersonObject)
        );
        personService.update(
          props.persons.filter(person => person.name === newPerson.name)[0].id,
          PersonObject
        );
      }
    } else {
      personService.create(PersonObject).then(person => {
        console.log(`added id ${person.id} to server`);
        props.setPersons(props.persons.concat(PersonObject));
        props.setShownPersons(props.persons.concat(PersonObject));
      });
    }
  };

  return (
    <form onSubmit={addPerson}>
      <h2>add a new</h2>
      <div>
        name: <input value={newPerson.name} onChange={handleOnChangeName} />
      </div>
      <div>
        number:{" "}
        <input value={newPerson.number} onChange={handleOnChangeNumber} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;
