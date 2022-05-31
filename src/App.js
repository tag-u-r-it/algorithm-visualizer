import './App.css';
import React, { useState, useEffect } from 'react';

function App() {
  const [numbers, setNumbers] = useState([]);
  const [numberCount, setNumberCount] = useState(50);
  const [isSorting, setIsSorting] = useState(false);

  const setNumbersFunction = () =>{
    setNumbers([]);
    for (let index = 0; index < numberCount; index++) {
      let element = {"number": (Math.floor(Math.random() * 500) + 1), "selected": false};
      setNumbers(numbers => [...numbers, element]);
    }
  };

  useEffect(()=>{
    setNumbersFunction();
  }, []);

  const handleChange = (event) =>{
    setNumberCount(event.target.value);
    setNumbersFunction();
  };

  const handleSet = (event) =>{
    event.preventDefault();
    setNumbersFunction();
  };

  const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms))
  const speed = 10;

  const selectionSortFunction = async (event) => {
    event.preventDefault();
    setIsSorting(true)
    let numbers_copy = [...numbers];
    for (let index = 0; index < numbers.length; index++) {
      for (let index2 = 0; index2 < index; index2++) {
        if (numbers_copy[index].number < numbers_copy[index2].number) {
          numbers_copy[index].selected = true;
          numbers_copy[index2].selected = true;
          setNumbers([...numbers_copy]);
          await wait(speed)
          let temp_num = numbers[index].number;
          let temp_num2 = numbers[index2].number;
          numbers_copy[index].number = temp_num2;
          numbers_copy[index2].number = temp_num;
          numbers_copy[index].selected = false;
          numbers_copy[index2].selected = false;
          setNumbers([...numbers_copy]);
        }
        else
        {
          numbers_copy[index].selected = true;
          numbers_copy[index2].selected = true;
          setNumbers([...numbers_copy]);
          await wait(speed)
          numbers_copy[index].selected = false;
          numbers_copy[index2].selected = false;
          setNumbers([...numbers_copy]);
        }
      }
    }
    setIsSorting(false)
  };

  const bubbleSortFunction = async (event) =>{
    event.preventDefault();
    setIsSorting(true);
    let numbers_copy = [...numbers];
    for (let i = 0; i < numbers.length; i++) {
      for (let index = 0; index < numbers.length-1; index++) {
        let index2 = index+1;
        if (numbers_copy[index].number > numbers_copy[index2].number) {
          numbers_copy[index2].selected = true;
          setNumbers([...numbers_copy]);
          await wait(speed)
          let temp_num = numbers[index].number;
          let temp_num2 = numbers[index2].number;
          numbers_copy[index].number = temp_num2;
          numbers_copy[index2].number = temp_num;
          numbers_copy[index].selected = false;
          numbers_copy[index2].selected = false;
        }
        else
        {
          numbers_copy[index].selected = true;
          numbers_copy[index2].selected = true;
          setNumbers([...numbers_copy]);
          await wait(speed)
          numbers_copy[index].selected = false;
          numbers_copy[index2].selected = false;
          setNumbers([...numbers_copy]);
        }
      }
    }
    setIsSorting(false);
  };

  return (
    <div className='container'>
      <h2>ALGORITHM VISUALIZER</h2>
      <div className="bars">
        {numbers.map(x => <div className={x.selected ? "value_bar selected" : "value_bar"} style={{height:x.number, width:(500/numberCount)}} key={Math.random()}></div>)}
      </div>
      <form>
        <input type="range" min="5" value={numberCount} onChange={handleChange} disabled={isSorting ? "true" : ""}></input>
        <button onClick={handleSet} disabled={isSorting ? "true" : ""}>SET</button>
        <button onClick={selectionSortFunction} disabled={isSorting ? "true" : ""}>SELECTION SORT</button>
        <button onClick={bubbleSortFunction} disabled={isSorting ? "true" : ""}>BUBBLE SORT (SLOW!)</button>
      </form>
    </div>
  );
}

export default App;
