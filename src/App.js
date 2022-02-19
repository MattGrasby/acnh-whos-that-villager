import { useEffect, useState } from "react";
import './App.css';
import { fetchVillager } from "./api/fetchVillager.js";
import { randomNumber, shuffle } from "./utils.js";
import Header from './components/Header';
import VillagerOptions from './components/VillagerOptions';
import VillagerCard from './components/VillagerCard';

function App() {
  const [correctKey, setCorrectKey] = useState(randomNumber(0, 3));
  const [roundCount, setRoundCount] = useState(0);
  const [villagers, setVillagers] = useState([]);

  const incrementRound = () => {
    setRoundCount(roundCount + 1);
    setVillagers([]);
    setCorrectKey(randomNumber(0, 3))
  }

  const checkIfCorrect = (correct) => {
    if(correct === 1) {
      alert(`You got it! ${name} is the correct villager.`);
      incrementRound();
    } else {
      alert("Wrong! You're a fake Animal Crossing fan.");
    }
  }

  const fetchVillagers = () => {
    fetchVillager(randomNumber(1, 312)).then((villagerData) => {
      var newVillager = { 'name' : villagerData['name'], 'catchPhrase' : villagerData['catch-phrase'], 'imageUri' : villagerData['image_uri'], 'correct' : (correctKey === 0 ? 1 : 0) }
      setVillagers(villagers => [...villagers, newVillager]);
    });
    fetchVillager(randomNumber(1, 312)).then((villagerData) => {
      var newVillager = { 'name' : villagerData['name'], 'catchPhrase' : villagerData['catch-phrase'], 'imageUri' : villagerData['image_uri'], 'correct' : (correctKey === 1 ? 1 : 0) }
      setVillagers(villagers => [...villagers, newVillager]);
    });
    fetchVillager(randomNumber(1, 312)).then((villagerData) => {
      var newVillager = { 'name' : villagerData['name'], 'catchPhrase' : villagerData['catch-phrase'], 'imageUri' : villagerData['image_uri'], 'correct' : (correctKey === 2 ? 1 : 0) }
      setVillagers(villagers => [...villagers, newVillager]);
    });
  }

  

  useEffect(() => {
    fetchVillagers();
  }, [roundCount]);

  return (
    <div className="App">
      <Header/>
      <div>
        {villagers.length === 3 ? villagers.find(villager => (villager.correct === 1)).catchPhrase : 'Loading...'}
      </div>
      <div>
        - who says this?
      </div>
      <div className="villagerOptions">      
        {villagers.length === 3 ? villagers.map(villager => (
          <VillagerCard key={villager.name['name-USen']} name={villager.name['name-USen']} picture={villager.imageUri} correct={villager.correct} check={checkIfCorrect}/>
        )) : 'Loading...'}
      </div>
      <button onClick={incrementRound}>New Round</button>
    </div>
  );
}

export default App;
