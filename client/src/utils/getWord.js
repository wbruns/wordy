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

    const todays_word = word_bank[Math.floor(Math.random() * word_bank.length)];

    const word_length = todays_word.split('').length;

    const current_word = [];

    for (let i = 0; i < word_length; i++) {
        current_word.push('-')
    };

    return { todays_word, current_word }
};