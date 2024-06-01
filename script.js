document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById("input");
    const submitButton = document.getElementById("submit");
    const playButton = document.getElementById("play");

    submitButton.addEventListener('click', () => {
        const word = input.value.trim();
        if (word) {
            fetchAndDisplayWordDetails(word);
        } else {
            alert("Please enter a word.");
        }
    });

    async function fetchAndDisplayWordDetails(word) {
        try {
            const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
            const data = await res.json();
            console.log(data);

            if (data.length > 0) {
                const definition = data[0].meanings[0].definitions[0].definition;
                console.log(definition);
                const dictionary = document.getElementById("definition");
                dictionary.innerHTML = `The Definition is: ${definition}`;
                const sound = data[0].phonetics[0]?.audio;
                console.log(sound);

                if (sound) {
                    playButton.onclick = () => {
                        const audio = new Audio(sound);
                        audio.play();
                    };
                    playButton.innerHTML = 'Play Pronunciation';
                    playButton.disabled = false;
                } else {
                    console.log('No pronunciation available.');
                    playButton.innerHTML = 'No pronunciation available';
                    playButton.disabled = true;
                }
            } else {
                console.log('Word not found in the dictionary.');
                const dictionary = document.getElementById("definition");
                dictionary.innerHTML = 'Word not found.';
                playButton.innerHTML = 'No pronunciation available';
                playButton.disabled = true;
            }
        } catch (error) {
            console.error('Error fetching word details:', error);
        }
    }
});
