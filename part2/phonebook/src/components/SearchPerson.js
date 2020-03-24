import React from "react";

const SearchPerson = props => {
  const handleSearchFilterOnChange = event => {
    const filteredPersons = props.persons.filter(item =>
      item.name.toLowerCase().includes(event.target.value)
    );
    props.setShownPersons(filteredPersons);
  };
  return (
    <div>
      <p>
        filter shown with
        <input onChange={handleSearchFilterOnChange} />
      </p>
    </div>
  );
};

export default SearchPerson;
