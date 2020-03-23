import React, { useState } from "react";
import ReactDOM from "react-dom";

const Votes = props => {
  return <div>has {props.votes} votes</div>;
};

const App = props => {
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(new Array(6).fill(0));
  const [mostVoted, setMostVoted] = useState(0);
  const selectNext = () => {
    setSelected(Math.floor(Math.random() * 6));
  };
  const giveVote = () => {
    const newVotes = [...votes];
    newVotes[selected] += 1;
    setVotes(newVotes);
    setMostVoted(newVotes.indexOf(Math.max(...newVotes)));
  };
  return (
    <div>
      <h1>Anecdote of the day</h1>
      {props.anecdotes[selected]}
      <Votes votes={votes[selected]} />
      <p>
        <button onClick={() => giveVote()}>vote</button>

        <button onClick={() => selectNext()}>next anecdote</button>
      </p>
      <div>
        <h1>Anecdote with most votes</h1>
        <p>{props.anecdotes[mostVoted]}</p>
        <Votes votes={votes[mostVoted]} />
      </div>
    </div>
  );
};

const anecdotes = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it."
];

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById("root"));
