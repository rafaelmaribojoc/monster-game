const monsterHealthBar = document.getElementById('monster-health');
const playerHealthBar = document.getElementById('player-health');
const bonusLifeEl = document.getElementById('bonus-life');

const attackBtn = document.getElementById('attack-btn');
const strongAttackBtn = document.getElementById('strong-attack-btn');
const healBtn = document.getElementById('heal-btn');
const logBtn = document.getElementById('log-btn');
const resetBtn = document.getElementById('reset-btn');
const lifeValue = document.getElementById('life-value');
// const resetBtn = document.getElementById('reset-btn');



function adjustHealthBars(maxLife) {
  monsterHealthBar.max = maxLife;
  monsterHealthBar.value = maxLife;
  playerHealthBar.max = maxLife;
  playerHealthBar.value = maxLife;
}

function dealMonsterDamage(damage) {
  const dealtDamage = Math.floor(Math.random() * damage);
  monsterHealthBar.value = +monsterHealthBar.value - dealtDamage;
  return dealtDamage;
}

function dealPlayerDamage(damage) {
  const dealtDamage = Math.floor(Math.random() * damage);
  playerHealthBar.value = +playerHealthBar.value - dealtDamage;
  return dealtDamage;
}

function increasePlayerHealth(healValue) {
  let healValue2;
  if (playerHealthBar2 >= chosenMaxLife - healValue) {
    alert("You can't heal more than your normal health.");
    healValue2 = chosenMaxLife - playerHealthBar2;
  } else {
    healValue2 = healValue;
  }
  playerHealthBar.value = +playerHealthBar.value + healValue;
  playerHealthBar2 += healValue;
}

function resetGame(value) {
  playerHealthBar.value = value;
  monsterHealthBar.value = value;
  // playerHealthBar2 = value;
  // monsterHealthBar2 = value;
}

function removeBonusLife() {
  bonusLifeEl.parentNode.removeChild(bonusLifeEl);
}

function setPlayerHealth(health) {
  playerHealthBar.value = health;
}
