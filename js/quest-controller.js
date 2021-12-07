'use strict';

// NOTE: This is a global used only in the controller
var gLastRes = null;

$(document).ready(init);
$('.btn-start').click(onStartGuessing);
$('.btn-yes').click({ ans: 'yes' }, onUserResponse);
$('.btn-no').click({ ans: 'no' }, onUserResponse);
$('.btn-add-guess').click(onAddGuess);

function init() {
  console.log('Started...');
  createQuestsTree();
}

function onStartGuessing() {
  // DONE: hide the game-start section
  $('.game-start').hide('slow')
  renderQuest();
  // DONE: show the quest section
  $('.quest').show('slow')
}

function renderQuest() {
  // DONE: select the <h2> inside quest and update
  // its text by the currQuest text
  const currQuest = getCurrQuest()
 $('.quest h2').text(currQuest.txt)
}

function onUserResponse(ev) {
  var res = ev.data.ans;
  // If this node has no children
  if (isChildless(getCurrQuest())) {
    if (res === 'yes') {
      // alert('Yes, I knew it!');
      // TODO: improve UX
      $('.quest').hide();
      $('.game-start').show();
      $('.modal-dialog').text('Yes, i Knew it! 😎').show('slow');
      setTimeout(()=> {
        $('.modal-dialog').hide('slow');
      },3000)
      onRestartGame();
    } else {
      // alert('I dont know...teach me!');
      // DONE: hide and show new-quest section
      $('.quest').hide('slow');
      $('.new-quest').show('slow');
    }
  } else {
    // DONE: update the lastRes global var
    gLastRes = res
    moveToNextQuest(res);
    renderQuest();
  }
}

function onAddGuess(ev) {
  ev.preventDefault();
  // DONE: Get the inputs' values
  var newGuess = $('#newGuess').val();
  var newQuest = $('#newQuest').val();
if(!newGuess || !newQuest) {
  $('.modal-dialog').text('NO INPUT FOUND!\n Restarting...').show('slow');
  setTimeout(()=> {
    $('.modal-dialog').hide('slow');
  },3000)
  return onRestartGame()
}

  // DONE: Call the service addGuess
  addGuess(newQuest, newGuess, gLastRes);
  onRestartGame();
}

function onRestartGame() {
  $('.new-quest').hide();
  $('.game-start').show();
  createQuestsTree()
  gLastRes = null;
}
