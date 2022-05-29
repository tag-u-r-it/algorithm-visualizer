import './App.css';
import React, { useState, useEffect } from 'react';

function App() {
  const [numbers, setNumbers] = useState([]);
  const [numberCount, setNumberCount] = useState(50);
  const [isSorting, setIsSorting] = useState(false);

  useEffect(()=>{
    for (let index = 0; index < numberCount; index++) {
      let element = {"number": (Math.floor(Math.random() * 500) + 1), "selected": false};
      setNumbers(numbers => [...numbers, element]);
    }
  }, []);

  const handleChange = (event) =>{
    setNumberCount(event.target.value);
  };

  const handleSet = (event) =>{
    event.preventDefault();
    setNumbers([]);
    for (let index = 0; index < numberCount; index++) {
      let element = {"number": (Math.floor(Math.random() * 500) + 1), "selected": false};
      setNumbers(numbers => [...numbers, element]);
    }
  };

  const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms))

  const sortFunction = async (event) => {
    event.preventDefault();
    setIsSorting(true)
    let numbers_copy = [...numbers];
    for (let index = 0; index < numbers.length; index++) {
      for (let index2 = 0; index2 < index; index2++) {
        if (numbers_copy[index].number < numbers_copy[index2].number) {
          numbers_copy[index].selected = true;
          numbers_copy[index2].selected = true;
          setNumbers([...numbers_copy]);
          await wait(10)
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
          await wait(10)
          numbers_copy[index].selected = false;
          numbers_copy[index2].selected = false;
          setNumbers([...numbers_copy]);
        }
      }
    }
    setIsSorting(false)
  };

  return (
    <div className='container'>
      <div className="bars">
        {numbers.map(x => <div className='value_bar' class={x.selected ? "value_bar selected" : "value_bar"} style={{height:x.number}} key={Math.random()}></div>)}
      </div>
      <form>
        <input value={numberCount} onChange={handleChange}></input>
        <button onClick={handleSet} disabled={isSorting ? "true" : ""}>SET</button>
        <button onClick={sortFunction} disabled={isSorting ? "true" : ""}>SORT</button>
      </form>
    </div>
  );
}

export default App;
