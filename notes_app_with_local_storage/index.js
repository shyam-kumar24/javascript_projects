const input = document.querySelector('.input');
const inputBtn = document.querySelector('.input-button');
const notesDiv = document.querySelector('.notes-div');
const alertPara = document.querySelector('.alert-para');

let ID = 1;
let editMode = false;
let editNoteId = null;

// Function to store notes in localStorage
function setItemInLocalStorage(notesArr) {
    localStorage.setItem('noteItems', JSON.stringify(notesArr));
}

// Function to retrieve notes from localStorage
function getItemFromLocalStorage() {
    const retrievedNotes = JSON.parse(localStorage.getItem('noteItems')) || [];
    notesDiv.innerHTML = ''; // Clear existing notes in DOM

    retrievedNotes.forEach((note) => createNotes(note.text, note.id)); // Rebuild UI
}

// Function to create note element
function createNotes(text, id) {
    const noteBundler = document.createElement('div');
    noteBundler.classList.add('note-bundler');
    noteBundler.dataset.id = id;

    const notePara = document.createElement('span');
    notePara.textContent = text;
    noteBundler.appendChild(notePara);

    const editBtn = document.createElement('button');
    const deleteBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    deleteBtn.textContent = 'Delete';

    // Delete functionality
    deleteBtn.addEventListener('click', () => {
        let notesArr = JSON.parse(localStorage.getItem('noteItems')) || [];
        notesArr = notesArr.filter((note) => note.id !== id); // Remove note
        setItemInLocalStorage(notesArr); // Update localStorage
        noteBundler.remove(); // Remove from DOM
    });

    // Edit functionality
    editBtn.addEventListener('click', () => {
        input.value = text;
        inputBtn.textContent = 'Update';
        editMode = true;
        editNoteId = id;
    });

    const editDeleteBtnBundler = document.createElement('div');
    editDeleteBtnBundler.classList.add('edit-delete-bundler');
    editBtn.classList.add('edit');
    deleteBtn.classList.add('delete');

    editDeleteBtnBundler.appendChild(editBtn);
    editDeleteBtnBundler.appendChild(deleteBtn);
    noteBundler.appendChild(editDeleteBtnBundler);

    notesDiv.appendChild(noteBundler);
}

// Input button event listener
inputBtn.addEventListener('click', () => {
    if (input.value.trim() !== '' && !editMode) {
        alertPara.textContent = '';

        let notesArr = JSON.parse(localStorage.getItem('noteItems')) || [];

        const noteBundler = {
            text: input.value.trim(),
            id: ID++
        };

        notesArr.push(noteBundler);
        setItemInLocalStorage(notesArr);
        createNotes(noteBundler.text, noteBundler.id);
    } 
    else if (editMode) {
        let notesArr = JSON.parse(localStorage.getItem('noteItems')) || [];

        // Update the correct note
        notesArr = notesArr.map((note) => {
            if (note.id === editNoteId) {
                return { text: input.value.trim(), id: note.id }; // Update note text
            }
            return note;
        });

        setItemInLocalStorage(notesArr);
        getItemFromLocalStorage(); // Refresh the UI

        editMode = false;
        editNoteId = null;
        inputBtn.textContent = 'Add';
    } 
    else {
        alertPara.textContent = 'Please provide input to proceed!';
    }

    input.value = '';
});

// Load stored notes when the page loads
getItemFromLocalStorage();
