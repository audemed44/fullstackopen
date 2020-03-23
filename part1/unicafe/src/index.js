import React, { useState } from "react";
import ReactDOM from "react-dom";

const Button = props => {
  return <button onClick={props.handleClick}>{props.text}</button>;
};

const Statistic = props => {
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  );
};

const Statistics = props => {
  if (props.good === 0 && props.neutral === 0 && props.bad === 0)
    return (
      <div>
        <h1>statistics</h1>
        <p>No feedback given</p>
      </div>
    );

  return (
    <div>
      <h1>statistics</h1>
      <table>
        <tbody>
          <Statistic text="good" value={props.good} />
          <Statistic text="neutral" value={props.neutral} />
          <Statistic text="bad" value={props.bad} />
          <Statistic text="average" value={props.avg} />
          <Statistic text="positive" value={props.positive} />
        </tbody>
      </table>
    </div>
  );
};

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [allFeedback, setAll] = useState([]);

  const calculateAverage = props => {
    let sum = 0;
    let count = 0;
    props.forEach(element => {
      sum += element;
      count += 1;
    });
    return sum / count;
  };

  const calculatePositive = allFeedback => {
    let sum = 0;
    let count = 0;
    allFeedback.forEach(element => {
      if (element > 0) sum += 1;
      count += 1;
    });
    return (sum / count) * 100;
  };

  const handleClick = props => {
    if (props === "good") {
      setGood(good + 1);
      setAll([...allFeedback, 1]);
    } else if (props === "neutral") {
      setNeutral(neutral + 1);
      setAll(allFeedback.concat(0));
    } else {
      setBad(bad + 1);
      setAll(allFeedback.concat(-1));
    }
  };

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={() => handleClick("good")} text="good" />
      <Button handleClick={() => handleClick("neutral")} text="neutral" />
      <Button handleClick={() => handleClick("bad")} text="bad" />
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        avg={calculateAverage(allFeedback)}
        positive={calculatePositive(allFeedback).toString() + " %"}
      />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
