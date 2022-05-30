// This checks to see if at least one letter matches the user's input. If it does, then it returns true.
function checkLetters(array, letter) {
  return array.some(function (solution) {
    return letter === solution;
  });
}

checkLetters(todays_word, input);

if (checkLetters === true) {
  // If letter matches one from "todays_word", then it will push that letter to the "current_word" array at that index
  for (i = 0; i < todays_word.length; i++) {
    if (input === todays_word[i]) {
      current_word.splice(i, 1, input);
    }
  }

  // Push the letter into the correct_letters_guessed array
  correct_letters_guessed.push(input);

  if (todays_word === current_word) {
    // End the game - WIN!!
    // have a modal pop up?
  }
} else {
  // Push the letter into the incorrect_letters_guessed array
  incorrect_letters_guessed.push(input);
  // Change the image
  imageIndex = imageIndex + 1;
  if (incorrect_letters_guessed.length === 7) {
    // End the game - LOSE
    // have a modal pop up?
  }
}
