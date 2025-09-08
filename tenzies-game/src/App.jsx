import { useState } from 'react'
import Die from "./Die"
import  { nanoid }  from "nanoid"
import Confetti from "react-confetti"
function App() {
  const [dice, setDice] = useState(generateAllNewDice())
  
  function hold(id) {
     setDice(oldDice => oldDice.map(die => {
            return die.id === id? {...die, isHeld: !die.isHeld}: die
     })
     )
   }
 
   const gameWon =
    dice.every(die => die.isHeld) && dice.every (die => die.value === dice[0].value)
   

  function generateAllNewDice() {
      return new Array(10)
          .fill(0)
          .map(() => ({
            value: Math.ceil(Math.random()*6), 
            isHeld: false,
            id: nanoid()
          }))
  }
  const diceElement = dice.map((diceObj) => (
    <Die 
      key={diceObj.id} 
      id= {diceObj.id}
      value={diceObj.value} 
      isHeld={diceObj.isHeld}
      hold={hold} 
       />
  ));
  
  function rollDice() {
    if(gameWon) {
      setDice(generateAllNewDice)
    } else {
      setDice(oldDice => oldDice.map(die => {
        return !die.isHeld ? {...die, value: Math.ceil(Math.random()*6)} : die
      }))
    }
  }

 

  return (
    <main>
      {gameWon && <Confetti />}
        <h1 className='tenzie-title'>Tenzies</h1>
        <p className="instructions">
          Roll until all dice are the same. Click each die to freeze it at its
          current value between rolls.
        </p>

      <div className="dice-container">{diceElement}</div>
      <button onClick={rollDice} className="roll-dice">
        {gameWon ? "New Game" : "Roll"}
      </button>
    </main>
  );
}

export default App
