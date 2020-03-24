import React from "react";

const Persons = ({ shownPersons }) => {
  return (
    <div>
      <h2>Numbers</h2>
      {shownPersons.map(person => (
        <p key={person.name}>
          {person.name} {person.number}
        </p>
      ))}
    </div>
  );
};

export default Persons;
