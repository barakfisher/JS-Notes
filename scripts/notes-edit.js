'use strict'

const noteId = location.hash.substring(1);
let notes = getSavedNotes();
const bodyElement = document.querySelector('#note-body');
const titleElement = document.querySelector('#note-title');
const dateElement = document.querySelector('#last-edited');

let note = notes.find((note)=> note.id === noteId);

if (!note){
    location.assign('./index.html');
}
 bodyElement.value = note.body;
 titleElement.value = note.title;
 dateElement.textContent = generateLastEdited(note.updatedAt)

titleElement.addEventListener('input', (e)=>{
    note.title = e.target.value;
    note.updatedAt = moment().valueOf();
    dateElement.textContent = generateLastEdited(note.updatedAt)
    saveNotes(notes)
})
bodyElement.addEventListener('input', (e)=>{
    note.body = e.target.value;
    note.updatedAt = moment().valueOf();
    dateElement.textContent = generateLastEdited(note.updatedAt)
    saveNotes(notes)
})

document.querySelector('#remove-note').addEventListener('click', ()=>{
    removeNote(note.id);
    saveNotes(notes)
    location.assign('./index.html')
})



window.addEventListener('storage', (e) => {
    if (e.key === 'notes'){
        notes = JSON.parse(e.newValue)
        note = notes.find((note)=> note.id === noteId );
        
        if (!note){
            location.assign('./index.html');
        }
        
         bodyElement.value = note.body;
         titleElement.value = note.title;
         dateElement.textContent = generateLastEdited(note.updatedAt);
    }
})