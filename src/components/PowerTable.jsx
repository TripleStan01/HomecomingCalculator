import React, { useState } from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import { PowerRow } from './PowerRow';
import { isInCritStrikesWindow } from '../utility/critStrikes';

export const PowerTable = (props) => {
  const handleAddPrimaryPowerClick = () => {
    let currentChainPowers = [...props.chainPowers];

    let castTimeBeforeEffect = 0;
    if(props.primaryPowersetData[0].custom_fx.length === 0) {
      castTimeBeforeEffect = props.primaryPowersetData[0].fx.frames_before_hit / 30;
    } else {
      castTimeBeforeEffect = props.primaryPowersetData[0].custom_fx[0].fx.frames_before_hit / 30;
    }
    
    const newChainPower = {
      name: props.primaryPowersetData[0].name,
      displayName: props.primaryPowersetData[0].display_name,
      category: "primary",
      damageEnhancement: 0,
      rechargeEnhancement: 0,
      standardProcs: 0,
      purpleProcs: 0,
      damage: 0,
      castTime: props.primaryPowersetData[0].activation_time,
      castTimeBeforeEffect: castTimeBeforeEffect,
      enduranceCost: props.primaryPowersetData[0].endurance_cost,
      rechargeTime: props.primaryPowersetData[0].recharge_time,
      rechargeTime: props.primaryPowersetData[0].recharge_time,
      powerIsRecharged: false,
      displayScrapperCriticalDamage: true,
      displayScrappersStrikeATO: false,
      displayStealthCrit: false,
      isCritStrikes: false,
      powerIsInCritStrikesWindow: isInCritStrikesWindow(currentChainPowers, currentChainPowers.length - 1),
      comboLevel: 0,
      targetsHit: 1,
      maxTargetsHit: props.primaryPowersetData[0].max_targets_hit,
      numberOfTeammates: 0,
      assassinsFocusStacks: 0,
    }

    props.setChainPowers([...currentChainPowers, newChainPower]);
  }

  const handleAddSecondaryPowerClick = () => {
    let currentChainPowers = [...props.chainPowers];

    let castTimeBeforeEffect = 0;
    if(props.secondaryPowersetData[0].custom_fx.length === 0) {
      castTimeBeforeEffect = props.secondaryPowersetData[0].fx.frames_before_hit / 30;
    } else {
      castTimeBeforeEffect = props.secondaryPowersetData[0].custom_fx[0].fx.frames_before_hit / 30;
    }

    const newChainPower = {
      name: props.secondaryPowersetData[0].name,
      displayName: props.secondaryPowersetData[0].display_name,
      category: "secondary",
      damageEnhancement: 0,
      rechargeEnhancement: 0,
      standardProcs: 0,
      purpleProcs: 0,
      damage: 0,
      castTime: props.secondaryPowersetData[0].activation_time,
      castTimeBeforeEffect: castTimeBeforeEffect,
      enduranceCost: props.secondaryPowersetData[0].endurance_cost,
      rechargeTime: props.secondaryPowersetData[0].recharge_time,
      powerIsRecharged: false,
      displayScrapperCriticalDamage: true,
      displayScrappersStrikeATO: true,
      isCritStrikes: false,
      powerIsInCritStrikesWindow: isInCritStrikesWindow(currentChainPowers, currentChainPowers.length - 1),
      comboLevel: 0,
      targetsHit: 1,
      maxTargetsHit: props.secondaryPowersetData[0].max_targets_hit,
      numberOfTeammates: 0,
      assassinsFocusStacks: 0,
    }

    props.setChainPowers([...currentChainPowers, newChainPower]);
  }

  const handleAddCritStrikesPowerClick = () => {
    let currentChainPowers = [...props.chainPowers];

    let castTimeBeforeEffect = 0;
    if(props.primaryPowersetData[0].custom_fx.length === 0) {
      castTimeBeforeEffect = props.primaryPowersetData[0].fx.frames_before_hit / 30;
    } else {
      castTimeBeforeEffect = props.primaryPowersetData[0].custom_fx[0].fx.frames_before_hit / 30;
    }

    const newChainPower = {
      name: props.primaryPowersetData[0].name,
      displayName: props.primaryPowersetData[0].display_name,
      category: "primary",
      damageEnhancement: 0,
      rechargeEnhancement: 0,
      standardProcs: 0,
      purpleProcs: 0,
      damage: 0,
      castTime: props.primaryPowersetData[0].activation_time,
      castTimeBeforeEffect: castTimeBeforeEffect,
      enduranceCost: props.primaryPowersetData[0].endurance_cost,
      rechargeTime: props.primaryPowersetData[0].recharge_time,
      powerIsRecharged: false,
      isCritStrikes: true,
      displayScrapperCriticalDamage: true,
      displayScrappersStrikeATO: false,
      comboLevel: 0,
      targetsHit: 1,
      maxTargetsHit: props.primaryPowersetData[0].max_targets_hit,
      numberOfTeammates: 0,
      assassinsFocusStacks: 0,
    }

    currentChainPowers[props.chainPowers.length] = newChainPower;
    props.setChainPowers([...currentChainPowers]);
  }

  const handleAddEpicPowerClick = () => {
    let currentChainPowers = [...props.chainPowers];

    let castTimeBeforeEffect = 0;
    if(props.epicPowersetData[0].custom_fx.length === 0) {
      castTimeBeforeEffect = props.epicPowersetData[0].fx.frames_before_hit / 30;
    } else {
      castTimeBeforeEffect = props.epicPowersetData[0].custom_fx[0].fx.frames_before_hit / 30;
    }

    const newChainPower = {
      name: props.epicPowersetData[0].name,
      displayName: props.epicPowersetData[0].display_name,
      category: "epic",
      damageEnhancement: 0,
      rechargeEnhancement: 0,
      standardProcs: 0,
      purpleProcs: 0,
      damage: 0,
      castTime: props.epicPowersetData[0].activation_time,
      castTimeBeforeEffect: castTimeBeforeEffect,
      enduranceCost: props.epicPowersetData[0].endurance_cost,
      rechargeTime: props.epicPowersetData[0].recharge_time,
      powerIsRecharged: false,
      isCritStrikes: false,
      displayScrapperCriticalDamage: true,
      displayScrappersStrikeATO: false,
      comboLevel: 0,
      targetsHit: 1,
      maxTargetsHit: props.epicPowersetData[0].max_targets_hit,
      numberOfTeammates: 0,
      assassinsFocusStacks: 0,
    }

    currentChainPowers[props.chainPowers.length] = newChainPower;
    props.setChainPowers([...currentChainPowers]);
  }

  return (
    <Container className="mt-3">
      {
        props.chainPowers.length > 0 ? (
          props.chainPowers.map((power, i) => {
            if(power.category === 'primary') {
              return (
                <PowerRow
                  key={i}
                  row={i}
                  category='primary'
                  archetype={props.archetype}
                  power={power}
                  primaryPowersetData={props.primaryPowersetData}
                  secondaryPowersetData={props.secondaryPowersetData}
                  epicPowersetData={props.epicPowersetData}
                  chainPowers={props.chainPowers}
                  setChainPowers={props.setChainPowers}
                  isCritStrikes={power.isCritStrikes}
                />
              )
            } else if(power.category === 'secondary') {
              return (
                <PowerRow
                  key={i}
                  row={i}
                  category='secondary'
                  archetype={props.archetype}
                  power={power}
                  primaryPowersetData={props.primaryPowersetData}
                  secondaryPowersetData={props.secondaryPowersetData}
                  epicPowersetData={props.epicPowersetData}
                  chainPowers={props.chainPowers}
                  setChainPowers={props.setChainPowers}
                  isCritStrikes={power.isCritStrikes}
                />
              )
            } else if(power.category === 'epic') {
              return (
                <PowerRow
                  key={i}
                  row={i}
                  category='epic'
                  archetype={props.archetype}
                  power={power}
                  primaryPowersetData={props.primaryPowersetData}
                  secondaryPowersetData={props.secondaryPowersetData}
                  epicPowersetData={props.epicPowersetData}
                  chainPowers={props.chainPowers}
                  setChainPowers={props.setChainPowers}
                  isCritStrikes={power.isCritStrikes}
                />
              )
            }
          })
        ) : (
          <Row><span>No Powers</span></Row>
        )
      }
      <Button
        onClick={handleAddPrimaryPowerClick}
        className="my-3"
        style={{"marginRight": "5px"}}
        variant="dark"
      >
        Add Primary Power
      </Button>
      <Button
        onClick={handleAddSecondaryPowerClick}
        className="my-3"
        style={{"marginRight": "5px"}}
        variant="dark"
      >
        Add Secondary Power
      </Button>
      <Button
        onClick={handleAddEpicPowerClick}
        className="my-3"
        style={{"marginRight": "5px"}}
        variant="dark"
      >
        Add Epic Power
      </Button>
      {
        props.archetype === "Scrapper" && (
          <Button
            onClick={handleAddCritStrikesPowerClick}
            className="my-3"
            style={{"marginRight": "5px"}}
            variant="danger">
              Add Critical Strikes Power
          </Button>
        )
      }
    </Container>
  )
}