var gQuestsTree;
var gCurrQuest;
var gPrevQuest = null;
const STORAGE_KEY = 'questDB';

function createQuestsTree() {
     gQuestsTree = loadFromStorage(STORAGE_KEY);
    if(!gQuestsTree){
        gQuestsTree = createQuest('Male?');
        gQuestsTree.yes = createQuest('Painter?');
        gQuestsTree.no = createQuest('Queen?');
        gQuestsTree.yes.yes = createQuest('Picasso');
        gQuestsTree.yes.no = createQuest('Gandhi');
        gQuestsTree.no.yes = createQuest('Cleopatra');
        gQuestsTree.no.no = createQuest('Rita');
}
gQuestsTree = gQuestsTree;
gCurrQuest = gQuestsTree;
gPrevQuest = null;

_saveQuestsToStorage();
}

function createQuest(txt) {
    return {
        txt: txt,
        yes: null,
        no: null
    }
}

function isChildless(node) {
    return (node.yes === null && node.no === null)
}

function moveToNextQuest(res) {
    // DONE: update the gPrevQuest, gCurrQuest global vars
    gPrevQuest = gCurrQuest;
    gCurrQuest = gCurrQuest[res]
}

function addGuess(newQuestTxt, newGuessTxt, lastRes) {
    // TODO: Create and Connect the 2 Quests to the quetsions tree
    var oppRes = (lastRes === 'yes') ? 'no' : 'yes'
    var newQuest = createQuest(newQuestTxt)
    newQuest.yes = createQuest(newGuessTxt);
    newQuest.no = gCurrQuest;
    gPrevQuest[lastRes] = newQuest
    _saveQuestsToStorage()
    gCurrQuest = gQuestsTree
}

function getCurrQuest() {
    return gCurrQuest
}

function _saveQuestsToStorage() {
    saveToStorage(STORAGE_KEY, gQuestsTree);
}
