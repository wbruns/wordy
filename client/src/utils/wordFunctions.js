export function getWord() {
    const word_bank = [
        "family",
        "offense",
        "sugar",
        "mouth",
        "addition",
        "escape",
        "patience",
        "reach",
        "movie",
        "admire"];

    let todays_word = word_bank[Math.floor(Math.random() * word_bank.length)];

    todays_word = todays_word.split('');

    const word_length = todays_word.length;

    const current_word = [];

    for (let i = 0; i < word_length; i++) {
        current_word.push('-')
    };

    return { todays_word, current_word }
};

// This checks to see if at least one letter matches the user's input. If it does, then it returns true.
export function checkLetters(array, letter) {
  return array.some(function (solution) {
    return letter === solution;
  });
};