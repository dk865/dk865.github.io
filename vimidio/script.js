document.addEventListener("DOMContentLoaded", () => {
    const visualizerContainer = document.getElementById("visualizer");

    // Create visual elements
    for (let i = 0; i < 64; i++) {
        const element = document.createElement("div");
        element.classList.add("visual-element");
        visualizerContainer.appendChild(element);
    }

    const visualElements = document.querySelectorAll(".visual-element");

    // Function to handle MIDI messages
    function onMIDIMessage(message) {
        const [status, data1, data2] = message.data;
        const command = status >> 4;
        const channel = status & 0xf;
        const note = data1;
        const velocity = data2;

        if (command === 9 && velocity > 0) {
            // Note on
            activateElement(note);
        } else if (command === 8 || (command === 9 && velocity === 0)) {
            // Note off
            deactivateElement(note);
        }
    }

    // Activate visual element
    function activateElement(note) {
        const index = note % visualElements.length;
        visualElements[index].classList.add("active");
    }

    // Deactivate visual element
    function deactivateElement(note) {
        const index = note % visualElements.length;
        visualElements[index].classList.remove("active");
    }

    // Request MIDI access
    if (navigator.requestMIDIAccess) {
        navigator.requestMIDIAccess().then((midiAccess) => {
            const inputs = midiAccess.inputs.values();
            for (let input of inputs) {
                input.onmidimessage = onMIDIMessage;
            }
        }).catch((err) => {
            console.error("Failed to get MIDI access", err);
        });
    } else {
        console.error("Web MIDI API is not supported in this browser.");
    }
});