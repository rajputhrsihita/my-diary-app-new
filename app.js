//------------------------------------------
// Data & State
//------------------------------------------

let entries = []; //an empty array that will hold your entires. Each entry is an object : {id, title, content, date}
let currentView = 'list'; //tracks which screen you are on. Either 'list' for showing all entries or 'edit' for writing or editing 
let editingId = null; //stores the id of the entry you are currently editing. null means you are not editing
let currentTitle = ''; //temporarily stores the title you are typing. Updates as you type in the title field 
let currentContent = ''; //temporarily stores the content you are typing. Updates as you type in the text area    
// After clicking "New Entry" our currentView will go in 'edit' mode, we type in our title and content. After we save it our entru will have an id, title, content, and date. After saving our currentView will be back to list and title and content will be empty

//---------------------------------------
// Load & Save Data 
//---------------------------------------
function loadEntries(){
    //Get the saved data from browser storage. Asks browser if there is any saved diary entries. 
    const saved = localStorage.getItem('diaryEntries');
    //If there is saved entries, saved will have a array of id, title, content, and date for every entry.

    //If saved 
    if (saved) { 
        //Converts text to JavaScript array 
        entries = JSON.parse(saved);
    }

}

function saveEntries() { 
    //Convert JavaScript to text 
    //Then save it to browser storage 
    localStorage.setItem('diaryEntries', JSON.stringify(entries));
}

//-----------------------------------
// Create Entry 
//-----------------------------------
// Creates a new diary entry and saves it. 
function createEntry(title, content) {
    const newEntry = { 
        id: Date.now(),  //unique ID
        title: title, 
        content: content, 
        date: new Date().toISOString()  //Current date/time 
    }; 
    entries.unshift(newEntry); //Add to begining. unshift() will add the new entry to the start of the array 
    saveEntries(); 
}

//------------------------------
// Update Entry 
//------------------------------
// Modifies an existing entry when you edit it. Takes 3 inputs: which entry by ID, new title, and new content.
function updateEntry(id, title, content) { 
    const index = entries.findIndex(entry => entry.id === id); //findIndex() searches the array for the entry with matching ID. -1 if not found   
    if (index !== -1) {  //If entry found. Update the entry at that position. Change the title, content, and date.   
        entries[index].title = title;
        entries[index].content = content;
        entries[index].date = new Date().toISOString();
        saveEntries();
    }
}

//--------------------------------
// Delete Entry 
//--------------------------------
// Removes an entry from your diary with confirmation. Takes the id of the entry to delete.  
function deleteEntry(id) { 
    if (confirm('Are you sure you want to delete this entry?')) { 
        entries = entries.filter(entry => entry.id !== id);  //filter() creates a new array with only entries that matches the condition 
        saveEntries();
        render();  //redraw the screen to show the entry is gone
    }
}

//----------------------------
// Format Date 
//----------------------------
//Converts ugly date strings to human readable dates. 
function formatDate(dateString) {
    const date = new Date(dateString)
    const options = {    //tells how to format the date 
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    };
    return date.toLocaleDateString('en-US', options);
}
