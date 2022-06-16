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
    setNumbersFunction();
  };

  const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms))
  const speed = 10;

  const selectionSortFunction = async (event) => {
    setIsSorting(true)
    let numbers_copy = [...numbers];
    for (let index = 0; index < numbers.length; index++) {
      for (let index2 = 0; index2 < index; index2++) {
        numbers_copy[index].selected = true;
        numbers_copy[index2].selected = true;
        setNumbers([...numbers_copy]);
        await wait(speed)
        if (numbers_copy[index].number < numbers_copy[index2].number) {
          let temp_num = numbers[index].number;
          let temp_num2 = numbers[index2].number;
          numbers_copy[index].number = temp_num2;
          numbers_copy[index2].number = temp_num;
        }
        numbers_copy[index].selected = false;
        numbers_copy[index2].selected = false;
        setNumbers([...numbers_copy]);
      }
    }
    setIsSorting(false)
  };

  const bubbleSortFunction = async (event) =>{
    setIsSorting(true);
    let numbers_copy = [...numbers];
    for (let i = 0; i < numbers.length; i++) {
      for (let index = 0; index < numbers.length-1; index++) {
        let index2 = index+1;
        numbers_copy[index2].selected = true;
        setNumbers([...numbers_copy]);
        await wait(speed)
        if (numbers_copy[index].number > numbers_copy[index2].number) {
          let temp_num = numbers[index].number;
          let temp_num2 = numbers[index2].number;
          numbers_copy[index].number = temp_num2;
          numbers_copy[index2].number = temp_num;
        }
        numbers_copy[index].selected = false;
        numbers_copy[index2].selected = false;
      }
    }
    setIsSorting(false);
  };

  const gnomeSortFunction = async (event) =>{
    setIsSorting(true);
    let numbers_copy = [...numbers];
    let index = 0;
    while (index < numbers_copy.length-1) {
        let index2 = 0;
        if (index < numbers.length-1) {
          index2 = index+1;
        }
        else{
          index2 = numbers_copy.length-1;
        }
        let index_temp = index;
        let index_temp2 = index2;
        numbers_copy[index].selected = true;
        numbers_copy[index2].selected = true;
        setNumbers([...numbers_copy]);
        await wait(speed)
        if (numbers_copy[index].number > numbers_copy[index2].number) {
          let temp_num = numbers[index].number;
          let temp_num2 = numbers[index2].number;
          numbers_copy[index].number = temp_num2;
          numbers_copy[index2].number = temp_num;
          if (index !== 0) {
            index--;
          }
        }
        else
        {
          index++;
        }
        numbers_copy[index_temp].selected = false;
        numbers_copy[index_temp2].selected = false;
    }
    setIsSorting(false);
  };

  return (
    <div className='container'>
      <h2>ALGORITHM VISUALIZER</h2>
      <div className='panel'>
        <button onClick={handleSet} disabled={isSorting}>SET</button>
        <button onClick={selectionSortFunction} disabled={isSorting}>SELECTION SORT</button>
        <button onClick={bubbleSortFunction} disabled={isSorting}>BUBBLE SORT</button>
        <button onClick={gnomeSortFunction} disabled={isSorting}>GNOME SORT</button>
      </div>
      <div>
        BAR COUNT
        <input type="range" min="5" value={numberCount} onChange={handleChange} disabled={isSorting}></input>
        {numberCount}
      </div>
      <div className="bars">
        {numbers.map(x => <div className={x.selected ? "value_bar selected" : "value_bar"} style={{height:x.number, width:(500/numberCount), marginTop:500-x.number}} key={Math.random()}></div>)}
      </div>
    </div>
  );
}

export default App;