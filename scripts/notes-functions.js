'use strict'

// rea exsisting notes from local storage
const getSavedNotes = () =>{
    const notesJSON = localStorage.getItem('notes');
    try{
        return notesJSON ? JSON.parse(notesJSON) : [];
    } catch (e){
        return []
    }
}

//remove a note from the list
const removeNote = (id) =>{
    const noteIndex = notes.findIndex((note) => note.id === id )    
    if(noteIndex > -1){
        notes.splice(noteIndex, 1);
    }
}

// generate the dom structure for a single note
const generateNoteDOM = (note) => {
    const noteElement = document.createElement('a');
    const textElement = document.createElement('p')
    const statusElement = document.createElement('p')

    //setup the note title text
    if (note.title.length > 0){
        textElement.textContent = note.title;
    } else {
        textElement.textContent = 'Unnamed note'
    }
    textElement.classList.add('list-item__title')
    noteElement.appendChild(textElement)
    
    //setup the link 
    noteElement.setAttribute('href',`/edit.html#${note.id}`)
    noteElement.classList.add('list-item')

    // setup status message
    statusElement.textContent = generateLastEdited(note.updatedAt)
    statusElement.classList.add('list-item__subtitle')
    noteElement.appendChild(statusElement)
    return noteElement;
}

// sort the notes by one of the ways
const sortNotes = (notes, sortBy) =>{
    
    if (sortBy === 'byEdited'){
        return notes.sort( (a,b) => {
           if (a.updatedAt > b.updatedAt){
                return -1;
            } else if (a.updatedAt > b.updatedAt){
                return 1;
            } else {
                return 0;
            }
        })
    } else if (sortBy === 'byCreatedAt'){
        return notes.sort( (a, b) => {
            if (a.createdAt < b.createdAt){
                return -1;
            } else if (a.createdAt > b.createdAt){
                return 1;
            } else {
                return 0;
            }
        })
    } else if (sortBy === 'byABC') {
        return notes.sort( (a, b) => {
            if(a.title.toLowerCase() < b.title.toLowerCase()){
                return -1;
            } else if (a.title.toLowerCase() > b.title.toLowerCase()){
                return 1;
            } else {
                return 0;
            }
        })
    } else {
        return notes;
    }
}

//render app notes
const renderNotes = (notes, filters) => {
    const notesElement = document.querySelector('#notes')
    notes = sortNotes(notes, filters.sortBy);
    const filteredNotes = notes.filter( (note) => note.title.toLowerCase().includes(filters.searchText.toLowerCase()))
    notesElement.innerHTML = ''
    if (filteredNotes.length > 0){
        filteredNotes.forEach( (note) => {
            const noteElement = generateNoteDOM(note);
            notesElement.appendChild(noteElement)
        })    
    } else {
        const emptyMsg = document.createElement('p')
        emptyMsg.classList.add('empty-message')
        emptyMsg.textContent = 'No notes to show'
        notesElement.appendChild(emptyMsg)
    }
    
    
}

//save notes to local storage
const saveNotes = (notes)=>{
    localStorage.setItem('notes', JSON.stringify(notes))
}

// Generate the last edited message
const generateLastEdited = (updatedAt) =>{
    return `last edited: ${moment(updatedAt).fromNow()}`
}