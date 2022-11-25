const ATTACK_VALUE = 10;
const PLAYER_DAMAGE_TO_MONSTER = ATTACK_VALUE;
const MONSTER_DAMAGE_TO_PLAYER = ATTACK_VALUE;
const STRONG_ATTACK_VALUE = 20;
const HEAL_VALUE = 10;
// const enteredLifeValue = prompt('Enter The Life You Want:');

// Global Const
const MODE_ATTACK = "ATTACK";
const MODE_STRONG_ATTACK = "STRONG";
const MODE_HEALING = "HEAL";
// Battle Log
const LOG_EVENT_PLAYER = "PLAYER ATTACK";
const LOG_EVENT_MONSTER = "MONSTER ATTACK";
const LOG_EVENT_STRONG_ATTACK = "STRONG ATTACK";
const LOG_EVENT_HEAL = "HEAL";
const LOG_EVENT_GAME_OVER = "GAME OVER";
let battlelog = [];

// let userLifeInput = prompt("Choose life you want:");
let userLifeInput = prompt("Choose your life value:");
let userEnteredValue = parseInt(userLifeInput);
let chosenMaxLife;
// let chosenMaxLife = parseInt(enteredLifeValue);
let monsterHealthBar2 = chosenMaxLife;
let playerHealthBar2 = chosenMaxLife;
let hasBonusLife = true;
let theDecider;
let logEvent;
// let status;
// let whoWins;

function getMaxLifeValue() {
    if (isNaN(userEnteredValue) || userEnteredValue <= 0 || userEnteredValue > 100) {
        userEnteredValue = 100;
        throw { message: `hey yow son of a bitch you don't listen to me!`};
    }
    return userEnteredValue;
}

try {
    chosenMaxLife = getMaxLifeValue();
} catch (error) {
    console.log(error);
    chosenMaxLife = 100;
    alert("You input a wrong number!");
}

// let chosenMaxLife = getMaxLifeValue();
// The conditional thing to check these things down.
// if (isNaN(chosenMaxLife) || chosenMaxLife <= 0 || chosenMaxLife > 100) {
//     chosenMaxLife = 100;
// }

adjustHealthBars(chosenMaxLife);

function WriteToLog(event, value, _whoWin, finalMonsterHealth, finalPlayerHealth) {
    let logEntry;
    // Switch-case
    switch (event) {
        case LOG_EVENT_PLAYER:
            logEntry = {
            event: event,
            value: value,
            finalPlayerHealth: finalPlayerHealth
            };
        break;
        case LOG_EVENT_STRONG_ATTACK:
            logEntry = {
            event: event,
            value: value,
            finalMonsterHealth: finalMonsterHealth,
            finalPlayerHealth: finalPlayerHealth
        };
        break;
        case LOG_EVENT_MONSTER:
             logEntry = {
            event: event,
            value: value,
            finalMonsterHealth: finalMonsterHealth,
            finalPlayerHealth: finalPlayerHealth
        };
        break;
        case LOG_EVENT_HEAL:
             logEntry = {
            event: event,
            value: value,
            finalMonsterHealth: finalMonsterHealth,
            finalPlayerHealth: finalPlayerHealth
        };
        break;
        case LOG_EVENT_GAME_OVER:
             logEntry = {
            event: event,
            whoWin: _whoWin, 
            finalMonsterHealth: finalMonsterHealth,
            finalPlayerHealth: finalPlayerHealth
        };
        break;
        default:
            return
    }

    // if (event === LOG_EVENT_PLAYER) {
    //     logEntry = {
    //         event: event,
    //         value: value,
    //         finalPlayerHealth: finalPlayerHealth
    //     };
    // } else if (event === LOG_EVENT_STRONG_ATTACK) {
    //     logEntry = {
    //         event: event,
    //         value: value,
    //         finalMonsterHealth: finalMonsterHealth,
    //         finalPlayerHealth: finalPlayerHealth
    //     };
    // } else if (event === LOG_EVENT_MONSTER) {
    //     logEntry = {
    //         event: event,
    //         value: value,
    //         finalMonsterHealth: finalMonsterHealth,
    //         finalPlayerHealth: finalPlayerHealth
    //     };
    // } else if (event === LOG_EVENT_HEAL) {
    //     logEntry = {
    //         event: event,
    //         value: value,
    //         finalMonsterHealth: finalMonsterHealth,
    //         finalPlayerHealth: finalPlayerHealth
    //     };
    // }  else if (event === LOG_EVENT_GAME_OVER) {
    //     logEntry = {
    //         event: event,
    //         whoWin: _whoWin, 
    //         finalMonsterHealth: finalMonsterHealth,
    //         finalPlayerHealth: finalPlayerHealth
    //     };
    // }
    battlelog.push(logEntry);
}

function onClickReset() {
    monsterHealthBar2 = chosenMaxLife;
    playerHealthBar2 = chosenMaxLife;
    resetGame(chosenMaxLife);
}

function endRound() {
    const initialPlayerHealth = playerHealthBar2;
    const damageToPlayer = dealPlayerDamage(theDecider);
    playerHealthBar2 -= damageToPlayer;

   if (playerHealthBar2 <= 0 && hasBonusLife) {
       hasBonusLife = false;
       removeBonusLife();
       playerHealthBar2 = initialPlayerHealth;
       setPlayerHealth(initialPlayerHealth);
       alert("Bonus life applied!");
   }
        WriteToLog(LOG_EVENT_PLAYER, damageToPlayer, chosenMaxLife);

   if (monsterHealthBar2 <= 0 && playerHealthBar2 > 0) {
       alert('You won!');
        // onClickReset();
        WriteToLog(LOG_EVENT_GAME_OVER, "PLAYER WON", monsterHealthBar2, chosenMaxLife);
    } else if (playerHealthBar2 <= 0 && monsterHealthBar2 > 0) {
        alert('You lost!');
        // onClickReset();
        WriteToLog(LOG_EVENT_GAME_OVER, "MONSTER WON", monsterHealthBar2, chosenMaxLife);
    } else if (monsterHealthBar2 <= 0 && playerHealthBar2 <= 0) {
        alert("It's a fucking draw!");
        // onClickReset();
        WriteToLog(LOG_EVENT_GAME_OVER, "A DRAW", monsterHealthBar2, chosenMaxLife);
    }

}

function deciderFuncForMons(mode) {
    // Ternary Operator
    theDecider = mode === MODE_ATTACK ? ATTACK_VALUE: STRONG_ATTACK_VALUE;
    // theDecider = mode === MODE_HEALING ? HEAL_VALUE: null;
    logEvent = mode === MODE_ATTACK ? LOG_EVENT_PLAYER: LOG_EVENT_STRONG_ATTACK;
    logEvent = mode === MODE_HEALING ? LOG_EVENT_HEAL: null;
    // let logEvent;
    // if (mode === MODE_ATTACK) {
    //     theDecider = ATTACK_VALUE;
    //     logEvent = LOG_EVENT_PLAYER
    //     WriteToLog(logEvent, theDecider, chosenMaxLife);
    // } else if (mode === MODE_STRONG_ATTACK) {
    //     theDecider = STRONG_ATTACK_VALUE;
    //     logEvent = LOG_EVENT_STRONG_ATTACK
    // }
     if (mode === MODE_HEALING) {
        theDecider = HEAL_VALUE;
        increasePlayerHealth(theDecider);
        logEvent = LOG_EVENT_HEAL;
    }


    const damageToMonster = dealMonsterDamage(theDecider);
    monsterHealthBar2 -= damageToMonster;
    endRound();
    WriteToLog(logEvent, damageToMonster, monsterHealthBar2, chosenMaxLife);
}


function attackButton() {
    deciderFuncForMons(MODE_ATTACK);

}

function strongestAttack() {
    deciderFuncForMons(MODE_STRONG_ATTACK);
}

function onClickHeal() {
    deciderFuncForMons(MODE_HEALING);
    endRound();
}

function onClickLog() {
    // for (let i = 0; i < 4; i++) {
    //     console.log(i);
    // }
    // for (let i = 15; i > 1; i--) {
    //     console.log(i);
    // }
    // for (let i = 0; i < 10; i++) {
    //     console.log(battlelog[i]);
    // }
    // let i = 0;
    // for (const logEntry of battlelog){
    //     console.log(logEntry);
    //     console.log(`#${i}`);
    //     // i++
    //     for (const key in logEntry) {
    //         console.log(logEntry[key]);
    //         i++
    //     }
    // }
    let i = 0;
    outsideLoop: do {
        console.log(i);
     for (let ii = 0; ii < 10; ii++) {
        if (ii === 5) {
            // break outsideLoop;
            return;
        }
        console.log(`This is the number of variable i: ${ii}`);
    }
    i++
    break;
 } while (i < 5);
    // console.log(battlelog);
    // let i = 0;
    // do {
    //     console.log("Rafael");
    //     i++;
    // } while (i < 3);
}

attackBtn.addEventListener('click', attackButton);
strongAttackBtn.addEventListener('click', strongestAttack);
healBtn.addEventListener('click', onClickHeal);
resetBtn.addEventListener('click', onClickReset);
logBtn.addEventListener('click', onClickLog);
lifeValue.addEventListener('click', getMaxLifeValue);