const addBtn = document.getElementById("addBtn")
const main = document.getElementById("main")

//add event listner in button
addBtn.addEventListener(
  "click",
  () => {
    addNote()
  }
)
const saveNotes = () => {
  const notes = document.querySelectorAll(".note textarea");
  console.log(notes);
  const data = [];
  notes.forEach(
    (note) => {
      data.push(note.value)
    }
  )

  if (data.length === 0) {
    localStorage.removeItem("notes")
  } else {
    localStorage.setItem("notes", JSON.stringify(data))
  }
}


const addNote = (text = "") => {
  const note = document.createElement("div");
  note.classList.add("note")
  note.innerHTML = `
    <div class="toolbar">
         <i class="save fas fa-save"></i>
         <i class="trash fas fa-trash"></i> 
    </div>
    <textarea>${text}</textarea>
    `;

  note.querySelector(".trash").addEventListener(
    "click",
    () => {
      note.remove()
      saveNotes()
    }
  )
  note.querySelector(".save").addEventListener(
    "click",
    () => {
      saveNotes()
    }
  )
  note.querySelector("textarea").addEventListener(
    "focusout",
    () => {
      saveNotes()
    }
  )
  main.appendChild(note);
  saveNotes()
}

//self function

(
  function () {
    const lsNotes = JSON.parse(localStorage.getItem("notes"));
    if (lsNotes === null) {
      addNote()
    } else {
      lsNotes.forEach(
        (lsNote) => {
          addNote(lsNote)
        }
      )
    }

  }
)()