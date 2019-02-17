'use strict'

let notes = getSavedNotes();

const filters = {
    searchText : '',
    sortBy:'byEdited'
}

renderNotes(notes, filters);

document.querySelector('#create-note').addEventListener('click',(e) => {
    const noteId = uuidv4();
    notes.push({
        id:noteId,
        createdAt:moment().valueOf(),
        updatedAt:moment().valueOf(),
        title:'',
        body:''
    })
    saveNotes(notes);
    location.assign(`./edit.html#${noteId}`)
})

document.querySelector('#search-text').addEventListener('input', (e) => {
  filters.searchText = e.target.value;
  renderNotes(notes,filters);
})

document.querySelector('#filter-by').addEventListener('change', (e) => {
    filters.sortBy = e.target.value;
    console.log(e.target.value)
    renderNotes(notes, filters)
})

window.addEventListener('storage', (e) => {
    if (e.key === 'notes'){
        notes = JSON.parse(e.newValue);
        renderNotes(notes,filters);
    }
})

