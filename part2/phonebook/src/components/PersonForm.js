import React, { useState } from "react";

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
      name: newPerson.name,
      number: newPerson.number
    };
    if (props.persons.map(elem => elem.name).includes(newPerson.name)) {
      window.alert(`${newPerson.name} is already added to the phonebook!`);
    } else {
      props.setPersons(props.persons.concat(PersonObject));
      props.setShownPersons(props.persons.concat(PersonObject));
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
