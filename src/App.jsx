import './App.css';
import React, { useState } from 'react'
import { PrimaryData, SecondaryData, EpicData } from './constants/archetypeData';
import { PowerForm } from './components/PowerForm';
import { PowerTable } from './components/PowerTable';
import Button from 'react-bootstrap/Button';

function App() {
  const [archetype, setArchetype] = useState('');
  const [primaryPowerData, setPrimaryPowerData] = useState([]);
  const [secondaryPowerData, setSecondaryPowerData] = useState([]);
  const [epicPowerData, setEpicPowerData] = useState([]);
  const [primaryList, setPrimaryList] = useState([]);
  const [secondaryList, setSecondaryList] = useState([]);
  const [epicList, setEpicList] = useState([]);
  const [chainPowers, setChainPowers] = useState([]);
  const [totalDamage, setTotalDamage] = useState(0);
  const [totalCastTime, setTotalCastTime] = useState(0);
  const [rechargeValidation, setRechargeValidation] = useState();

  const handleArchetypeChange = async (e) => {
    setChainPowers([]);
    setPrimaryList([]);
    setSecondaryList([]);
    setEpicList([]);
    setArchetype(e.target.value);

    let powerNames;
    let powersetDisplayNames;
    fetch(`power_data/${PrimaryData[e.target.value]}/index.json`)
      .then((response) => response.json())
      .then((data) => {
        powersetDisplayNames = data.powerset_display_names;
        setPrimaryList([...powersetDisplayNames])
        if(powersetDisplayNames[0] === 'Street Justice') {
          powersetDisplayNames[0] = 'Brawling'
        }
        return fetch(`power_data/${PrimaryData[e.target.value]}/${powersetDisplayNames[0].toLowerCase().replace(/ +/g, '_')}/index.json`)
      })
      .then((response) => response.json())
      .then((data) => {
          powerNames = data.power_names.map(name => name.split('.')[2])
          let newPowerData = [];
          for(var i = 0; i < powerNames.length; i++) {
            fetch(`power_data/${PrimaryData[e.target.value]}/${powersetDisplayNames[0].toLowerCase().replace(/ +/g, '_')}/${powerNames[i].toLowerCase().replace(/ +/g, '_')}.json`)
              .then((response) => response.json())
              .then((data) => {
                newPowerData.push(data);
              });
          }
          setPrimaryPowerData(newPowerData);
          return fetch(`power_data/${SecondaryData[e.target.value]}/index.json`)
        })      
        .then((response) => response.json())
        .then((data) => {
          powersetDisplayNames = data.powerset_display_names;
          setSecondaryList([...powersetDisplayNames])
          if(powersetDisplayNames[0] === 'Bio Armor') {
            powersetDisplayNames[0] = "Bio Organic Armor";
          }
          return fetch(`power_data/${SecondaryData[e.target.value]}/${powersetDisplayNames[0].toLowerCase().replace(/ +/g, '_')}/index.json`)
        })
        .then((response) => response.json())
        .then((data) => {
            powerNames = data.power_names.map(name => name.split('.')[2]);
            let newPowerData = [];
            for(var i = 0; i < powerNames.length; i++) {
              if(powerNames[i] === "Touch of the Beyond") {
                fetch(`power_data/${SecondaryData[e.target.value]}/${powersetDisplayNames[0].toLowerCase().replace(/ +/g, '_')}/touch_of_fear.json`)
                  .then((response) => response.json())
                  .then((data) => {
                    newPowerData.push(data);
                  });
              } else {
                fetch(`power_data/${SecondaryData[e.target.value]}/${powersetDisplayNames[0].toLowerCase().replace(/ +/g, '_')}/${powerNames[i].toLowerCase().replace(/ +/g, '_')}.json`)
                  .then((response) => response.json())
                  .then((data) => {
                    newPowerData.push(data);
                  });
              }
            }
            setSecondaryPowerData(newPowerData);
            return fetch(`power_data/${EpicData[e.target.value]}/index.json`)
          })
          .then((response) => response.json())
          .then((data) => {
            powersetDisplayNames = data.powerset_display_names;
            setEpicList([...powersetDisplayNames])
            return fetch(`power_data/${EpicData[e.target.value]}/${powersetDisplayNames[0].toLowerCase().replace(/ +/g, '_')}/index.json`)
          })
          .then((response) => response.json())
          .then((data) => {
            powerNames = data.power_names.map(name => name.split('.')[2]);
            let newPowerData = [];
            for(var i = 0; i < powerNames.length; i++) {
              fetch(`power_data/${EpicData[e.target.value]}/${powersetDisplayNames[0].toLowerCase().replace(/ +/g, '_')}/${powerNames[i].toLowerCase().replace(/ +/g, '_')}.json`)
                .then((response) => response.json())
                .then((data) => {
                  newPowerData.push(data);
                });
            }
            setEpicPowerData(newPowerData);
            return fetch(`power_data/${EpicData[e.target.value]}/index.json`)
          })
  }

  const handlePrimaryChange = async (e) => {
    setChainPowers([]);
    let powerNames;
    let powerSetName = e.target.value;

    if(powerSetName === 'Street Justice') {
      powerSetName = "Brawling";
    }
    if(powerSetName === 'Kinetic Melee') {
      powerSetName = 'Kinetic Attack';
    }
    if(powerSetName === 'Spines' && archetype === "Scrapper") {
      powerSetName = 'Quills';
    }
    if(powerSetName === 'Ninja Blade') {
      powerSetName = 'Ninja Sword';
    }
    fetch(`power_data/${PrimaryData[archetype]}/${powerSetName.toLowerCase().replace(/ +/g, '_')}/index.json`)
      .then((response) => response.json())
      .then((data) => {
        powerNames = data.power_names.map(name => name.split('.')[2])
        let newPowerData = [];
        for(var i = 0; i < powerNames.length; i++) {
          fetch(`power_data/${PrimaryData[archetype]}/${powerSetName.toLowerCase().replace(/ +/g, '_')}/${powerNames[i].toLowerCase().replace(/ +/g, '_')}.json`)
            .then((response) => response.json())
            .then((data) => {
              newPowerData.push(data);
            });
        }
        setPrimaryPowerData(newPowerData);
      })     
  }

  const handleSecondaryChange = async (e) => {
    setChainPowers([]);
    let powerNames;
    let powerSetName = e.target.value;

    if(powerSetName === 'Atomic Manipulation') {
      powerSetName = "Radiation Manipulation";
    }
    if(powerSetName === 'Devices') {
      powerSetName = "Gadgets";
    }
    if(powerSetName === 'Martial Combat') {
      powerSetName = "Martial Manipulation";
    }
    if(powerSetName === 'Temporal Manipulation') {
      powerSetName = "Time Manipulation";
    }
    if(powerSetName === 'Bio Armor') {
      powerSetName = "Bio Organic Armor";
    }
    fetch(`power_data/${SecondaryData[archetype]}/${powerSetName.toLowerCase().replace(/ +/g, '_')}/index.json`)
      .then((response) => response.json())
      .then((data) => {
        powerNames = data.power_names.map(name => name.split('.')[2])
        let newPowerData = [];
        for(var i = 0; i < powerNames.length; i++) {
          fetch(`power_data/${SecondaryData[archetype]}/${powerSetName.toLowerCase().replace(/ +/g, '_')}/${powerNames[i].toLowerCase().replace(/ +/g, '_')}.json`)
            .then((response) => response.json())
            .then((data) => {
              newPowerData.push(data);
            });
        }
        setSecondaryPowerData(newPowerData);
      })  
  }

  const handleEpicChange = async (e) => {
    setChainPowers([]);
    let powerNames;
    let powerSetName = e.target.value;

    fetch(`power_data/${EpicData[archetype]}/${powerSetName.toLowerCase().replace(/ +/g, '_')}/index.json`)
    .then((response) => response.json())
    .then((data) => {
      powerNames = data.power_names.map(name => name.split('.')[2])
      let newPowerData = [];
      for(var i = 0; i < powerNames.length; i++) {
        fetch(`power_data/${EpicData[archetype]}/${powerSetName.toLowerCase().replace(/ +/g, '_')}/${powerNames[i].toLowerCase().replace(/ +/g, '_')}.json`)
          .then((response) => response.json())
          .then((data) => {
            newPowerData.push(data);
          });
      }
      setEpicPowerData(newPowerData);
    })  
  }

  const handleCalculateTotalDamage = (e) => {
    let totalDamage = 0
    let totalCastTime = 0;
    for(var i = 0; i < chainPowers.length; i++) {
      totalDamage += chainPowers[i].damage;
      totalCastTime += chainPowers[i].castTime;
    }
    setTotalDamage(totalDamage);
    setTotalCastTime(totalCastTime);
  }

  const handleValidateChain = (e) => {
    e.preventDefault();
    
    let rechargeDurations = [];
    chainPowers.forEach(power => {
      rechargeDurations.push({
        name: power.displayName,
        rechargeTimeRemaining: power.rechargeTime / (1 + power.rechargeEnhancement),
      })
    })

    for(var i = 0; i < chainPowers.length; i++) {
      /* update chain power recharge times */
      for(var k = 0; k < chainPowers.length; k++) {
        if(k <= i) {
          rechargeDurations[k].rechargeTimeRemaining -= chainPowers[i].castTimeBeforeEffect;
        }
      }
    }

    let resultString = '';
    for(var i = 0; i < rechargeDurations.length; i++) {
      if(rechargeDurations[i].rechargeTimeRemaining >= 0) {
        resultString += `Power ${i+1}: ${rechargeDurations[i].name} still has ${rechargeDurations[i].rechargeTimeRemaining.toFixed(1)} seconds of recharge remaining.`
        resultString += "\n";
      } else {
        resultString += `Power ${i+1}: ${rechargeDurations[i].name} is recharged!`
        resultString += "\n";
      }
    }
    setRechargeValidation(resultString);

    console.log(rechargeDurations)
  }

  return (
    <div className="App">
      <PowerForm 
        archetype={archetype}
        primaryList={primaryList}
        secondaryList={secondaryList}
        epicList={epicList}
        handleArchetypeChange={handleArchetypeChange}
        handlePrimaryChange={handlePrimaryChange}
        handleSecondaryChange={handleSecondaryChange}
        handleEpicChange={handleEpicChange}
      />
      <PowerTable
        archetype={archetype}
        chainPowers={chainPowers}
        setChainPowers={setChainPowers}
        primaryPowersetData={primaryPowerData}
        secondaryPowersetData={secondaryPowerData}
        epicPowersetData={epicPowerData}
      />
      <div className="container">
        <Button
          onClick={handleValidateChain}
          className="my-3"
          style={{"marginRight": "5px"}}
          variant="primary"
        >
          Validate Chain Recharge
        </Button>
        <br></br>
        <span style={{whiteSpace: "pre"}}>
          {rechargeValidation}
        </span>
        <Button
          onClick={handleCalculateTotalDamage}
          className="my-3"
          style={{"marginRight": "5px"}}
          variant="danger"
        >
          Calculate Total Damage
        </Button>
        { totalDamage > 0 && (
            <div>
              <span>Total Damage: {totalDamage.toFixed(2)}</span><br></br>
              <span>Total Cast Time: {totalCastTime.toFixed(2)}s</span><br></br>
              <span>DPS: {(totalDamage / totalCastTime).toFixed(2)}</span>
            </div>
          )
        }
      </div>
    </div>
  );
}

export default App;
