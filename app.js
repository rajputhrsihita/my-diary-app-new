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

//---------------------------
// Render List View 
//----------------------------

function renderListView() {
// Create main container  
//Create New Entry button 
//Create grid for entries
//If no entries, show empty message 
//If there are entries, create a card for each one 
//Return everything

    const container = document.createElement('div');  //an empty <div> element to hold everything 

    //New Entry Button
    const newEButton = document.createElement('button');  //creates a button 
    newEButton.className = 'btn btn-primary';  //Adds CSS classes for styling, btn is basic button styles and btn-primary is purple gradient styling 
    newEButton.textContent =  '\u270F\uFE0F New Entry'; //Sets the button text to "New Entry"   //previous text is for emoji 
    newEButton.onclick = () => {
        currentView = 'edit';   //switching to edit view 
        editingId = null;    //not editing existing entry
        currentTitle = '';   //clear any old title
        currentContent = '';  //clear any old content 
        render();  //redraw screen
    };
    container.appendChild(newEButton); //adds the button to the container 

    //Grid Entries. This will hold all card entries  
    const grid = document.createElement('div'); //creates another <div> for the grid 
    grid.className = 'entries-grid'; //entries-grid CSS class makes it a grid layout 

    //Empty state 
    if (entries.length === 0) {   //checks if entries array is empty 
        const empty = document.createElement('div');  //creates a <div> for the empty message 
        empty.className = 'empty-state';
        empty.innerHTML = '<p>&#128221 No entries yet. Start writing your first diary entry!</p>';
        grid.appendChild(empty);
    } else { 
        entries.forEach(entry => {   //loops through each entry in your diary. entry is the current item in the loop. Create a card for each entry.   
            const card = document.createElement('div');
            card.className = 'entry-card';

            //Title
            const title = document.createElement('h3'); //heading level 3 
            title.textContent = entry.title;
            card.appendChild(title);

            //Date 
            const date = document.createElement('span'); //span is for small inline text 
            date.className = 'entry-date';
            date.textContent = formatDate(entry.date);
            card.appendChild(date);

            //Preview 
            const preview = document.createElement('p'); //creates a paragraph for the preview 
            preview.className = 'entry-preview';
            const previewText = entry.content.substring(0, 150); //gets the first 150 characters 
            preview.textContent = previewText + (entry.content.length > 150 ? '...' : ''); //adds ... if content is more than 150 words otherwise nothing(no dots) 
            card.appendChild(preview);

            //Actions 
            const actions = document.createElement('div'); //creates a <div> to hold edit and delete buttons 
            actions.className = 'entry-actions';

            const editBtn = document.createElement('button');  
            editBtn.className = 'btn btn-small';
            editBtn.textContent = 'Edit';
            editBtn.onclick = () => {   //when clicked 
                currentView = 'edit';  //switch to edit mode 
                editingId = entry.id; //remember which entry we are editing 
                currentTitle = entry.title; //load this entry's title 
                currentContent = entry.content; //load this entry's content 
                render();//redraw the screen 
            };

            const deleteBtn = document.createElement('button');
            deleteBtn.className = 'btn btn-small btn-danger'; //btn is the basic button style, btn-small is smaller size and btn-danger is red colour 
            deleteBtn.textContent = 'Delete';
            deleteBtn.onclick = () => deleteEntry(entry.id); //when clicked, calls deleteEntry() with entry's ID

            actions.appendChild(editBtn);
            actions.appendChild(deleteBtn);
            card.appendChild(actions);
            grid.appendChild(card);
        });
    }

    container.appendChild(grid);
    return container;
}

//--------------------------------
// Render Edit View 
//--------------------------------
function renderEditView() { 
//Create container
//Create heding 
//Create title input field
//Create content text area 
//Create save button 
//Create delete button 

    const container = document.createElement('div'); //will hold the entire form 
    container.className = 'editor';

    //Title 
    const heading = document.createElement('h2'); //heading level 2 
    heading.textContent = editingId ? 'Edit Entry' : 'New Entry';
    container.appendChild(heading);

    //Title Input
    const titleGroup = document.createElement('div'); //create a container for the label + input 
    titleGroup.className = 'form-group';
    
    const titleLabel = document.createElement('label'); //creates a <label> element. Labels tell users what the input is for.   
    titleLabel.textContent = 'Title';
    titleGroup.appendChild(titleLabel);

    const titleInput = document.createElement('input'); //creates an <input> element. This is where you type the title. <input> is for single line   
    titleInput.type = 'text';
    titleInput.className = 'input';
    titleInput.placeholder = 'Give your entry a title ...'; //placeholder is the grey hint text which appears when empty. Disappears when you start typing  
    titleInput.value = currentTitle; //if creating new then empty, if editing then loads existing title  
    //We need to remember what we typed. 
    titleInput.oninput = (e) => currentTitle = e.target.value; // updates the variables as we type 
    //e.target.value is the text you just typed 
    // currentTitle is to update the variable 
    //(e) => is the arrow function with event parameter. 
    //titleInput.oninput is the event listener that runs every time you type 
    // e is the event object i.e., info about what happened 
    //e.target is the elemnt that triggered the event i.e., titleInput 
    //e.target.value which is the current text in the input     

    titleGroup.appendChild(titleInput);

    container.appendChild(titleGroup);

    //Content Input 
    const contentGroup = document.createElement('div');  //create container + label for content area 
    contentGroup.className = 'form-group';

    const contentLabel = document.createElement('label');
    contentLabel.textContent = 'Your thoughts';
    contentGroup.appendChild(contentLabel);

    const contentInput = document.createElement('textarea'); //creates a <textarea> element. <textarea> is for multiple lines  
    contentInput.className = 'textarea';
    contentInput.placeholder = 'Write about your day, thoughts, feelings ...'; //hint text when textarea is empty 
    contentInput.value = currentContent; //if editing loads existing content, if new then empty 
    contentInput.rows = 15; //sets the height to 15 rows of text. can be resized by users if needed 
    contentInput.oninput = (e) => currentContent = e.target.value; //updates currentContent every time you type 
    contentGroup.appendChild(contentInput);

    container.appendChild(contentGroup);

    //Buttons 
    const btnGroup = document.createElement('div'); //creates a container for the Save and Cancel buttons 
    btnGroup.className = 'editor-actions';

    const saveBtn = document.createElement('button');
    saveBtn.className = 'btn btn-primary';
    saveBtn.textContent = '\u{1F4BE} Save Entry';
    saveBtn.onclick = () => {
        if (!currentTitle.trim() || !currentContent.trim()) {  //checks if title or content is empty. trim() removes spaces from start/end  
            alert('please fill in both title and content');
            return;
        }

        if(editingId) {  //checks if editing an existing entry or creating new 
            updateEntry(editingId, currentTitle, currentContent);
        } else { 
            createEntry(currentTitle, currentContent);
        }

        currentView = 'list'; //switch back to list view 
        editingId = null; //no longer editing 
        currentTitle = ''; //clear title variable. //clear variables so that the next time you click "New Entry", fields will be empty.
        currentContent = ''; //clear content variable 
        render();
    };

    const cancelBtn = document.createElement('button'); //Changes are not saved.  
    cancelBtn.className = 'btn btn-secondary';
    cancelBtn.textContent = 'Cancel';
    cancelBtn.onclick = () => {
        currentView = 'list'; //goes back to list view 
        editingId = null;
        currentTitle = ''; 
        currentContent = '';
        render();
    };

    btnGroup.appendChild(saveBtn);
    btnGroup.appendChild(cancelBtn);
    container.appendChild(btnGroup);

    return container;

}