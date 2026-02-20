document.addEventListener("DOMContentLoaded", () => {

    const addNoteBtn = document.getElementById("addNote");
    const notesContainer = document.getElementById("notesContainer");
    const quoteText = document.getElementById("quoteText");

    const quotes = [
        "Small progress is still progress.",
        "Stay consistent, not perfect.",
        "Dream big, start small.",
        "Code. Debug. Repeat.",
        "Your future self will thank you.",
        "Focus on growth, not comparison."
    ];

    // Show random quote
    quoteText.textContent =
        quotes[Math.floor(Math.random() * quotes.length)];

    let notes = JSON.parse(localStorage.getItem("notes")) || [];

    function saveNotes() {
        localStorage.setItem("notes", JSON.stringify(notes));
    }

    function renderNotes() {
        notesContainer.innerHTML = "";

        notes.forEach((noteText, index) => {

            const noteDiv = document.createElement("div");
            noteDiv.classList.add("note");

            const textarea = document.createElement("textarea");
            textarea.value = noteText;

            textarea.addEventListener("input", () => {
                notes[index] = textarea.value;
                saveNotes();
            });

            const deleteBtn = document.createElement("button");
            deleteBtn.textContent = "Delete";

            deleteBtn.addEventListener("click", () => {
                notes.splice(index, 1);
                saveNotes();
                renderNotes();
            });

            noteDiv.appendChild(textarea);
            noteDiv.appendChild(deleteBtn);
            notesContainer.appendChild(noteDiv);
        });
    }

    addNoteBtn.addEventListener("click", () => {
        notes.push("");
        saveNotes();
        renderNotes();
    });

    renderNotes();
});