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
    //If there is saved entries, saved will have a list of id, title, content, and date for every entry.

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
