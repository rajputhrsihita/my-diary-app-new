//------------------------------------------
// Data & State
//------------------------------------------

let entries = []; //an empty array that will hold your entires. Each entry is an object : {id, title, content, date}
let currentView = 'list'; //tracks which screen you are on. Either 'list' for showing all entries or 'edit' for writing or editing 
let editingId = null; //stores the id of the entry you are currently editing. null means you are not editing
let currentTitle = ''; //temporarily stores the title you are typing. Updates as you type in the title field 
let currentContent = ''; //temporarily stores the content you are typing. Updates as you type in the text area    
// After clicking "New Entry" our currentView will go in 'edit' mode, we type in our title and content. After we save it our entru will have an id, title, content, and date. After saving our currentView will be back to list and title and content will be empty

