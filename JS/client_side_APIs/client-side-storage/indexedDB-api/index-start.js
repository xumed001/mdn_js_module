// Create needed constants
const list = document.querySelector('ul');
const titleInput = document.querySelector('#title');
const bodyInput = document.querySelector('#body');
const form = document.querySelector('form');
const submitBtn = document.querySelector('form button');


// Database object
let db

const openRequest = window.indexedDB.open('notes_db', 1)

openRequest.addEventListener('error', () => 
    console.error('Database failed to open')
)

openRequest.addEventListener('success', () => {
    console.log('Database opened successfully')

    db = openRequest.result

    displayData()
})

openRequest.addEventListener('upgradeneeded', (e) => {
    db = e.target.result

    const objectStore = db.createObjectStore('notes_os', {
       keyPath: 'id',
       autoIncrement: true, 
    })

    objectStore.createIndex('title', 'title', { unique: false})
    objectStore.createIndex('body', 'body', { unique: false})
    console.log('Database setup complete')
})


form.addEventListener('submit', addData)

function addData(e) {
    e.preventDefault()

    const newItem = { title: titleInput.value, body: bodyInput.value}

    const transaction = db.transaction(['notes_os'], 'readwrite')

    const objectStore = transaction.objectStore('notes_os')

    const addRequest = objectStore.add(newItem)

    addRequest.addEventListener('success', () => {
        titleInput.value = ''
        bodyInput.value = ''
    })

    transaction.addEventListener('complete', () => {
        console.log('Transaction completed: database modification finished')
        displayData()
    })

    transaction.addEventListener('error', () => 
        console.log('Transaction not opened due to error')
    )
}


function displayData() {
    while(list.firstChild){
        list.removeChild(list.firstChild)
    }

    const objectStore = 
        db.transaction('notes_os').objectStore('notes_os')
    objectStore.openCursor().addEventListener('success', (e) => {
        const cursor = e.target.result

        if(cursor) {
            const listItem = document.createElement('li')
            const h3 = document.createElement('h3')
            const para = document.createElement('p')

            listItem.appendChild(h3)
            listItem.appendChild(para)
            list.appendChild(listItem)

            h3.textContent = cursor.value.title
            para.textContent = cursor.value.body

            listItem.setAttribute('data-note-id', cursor.value.id)

            const deleteBtn = document.createElement('button')
            listItem.appendChild(deleteBtn)
            deleteBtn.textContent = 'Delete'

            deleteBtn.addEventListener('click', deleteItem)

            cursor.continue()
        } else {
            if(!list.firstChild) {
                const listItem =  document.createElement('li')
                listItem.textContent = 'No notes stored.'
                list.appendChild(listItem)
            }
            console.log('Notes all displated')
        }
    })
}

// Define the deleteItem() function
function deleteItem(e) {
    // retrieve the name of the task we want to delete. We need
    // to convert it to a number before trying to use it with IDB; IDB key
    // values are type-sensitive.
    const noteId = Number(e.target.parentNode.getAttribute("data-note-id"));
  
    // open a database transaction and delete the task, finding it using the id we retrieved above
    const transaction = db.transaction(["notes_os"], "readwrite");
    const objectStore = transaction.objectStore("notes_os");
    const deleteRequest = objectStore.delete(noteId);
  
    // report that the data item has been deleted
    transaction.addEventListener("complete", () => {
      // delete the parent of the button
      // which is the list item, so it is no longer displayed
      e.target.parentNode.parentNode.removeChild(e.target.parentNode);
      console.log(`Note ${noteId} deleted.`);
  
      // Again, if list item is empty, display a 'No notes stored' message
      if (!list.firstChild) {
        const listItem = document.createElement("li");
        listItem.textContent = "No notes stored.";
        list.appendChild(listItem);
      }
    });
  }
  