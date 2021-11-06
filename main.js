// Print new note

function showNote(details, date, time, placeInArray, firstNoteFade) {
  event.preventDefault();

  const divText = document.getElementById("content");

  let div = document.createElement("DIV");

  divText.appendChild(div);

  if (firstNoteFade === "firstNote") {
    div.classList = "note fade-in";
  } else {
    div.classList = "note";
  }

  let textnote = document.createElement("TEXTAREA");
  textnote.classList = "textnote bg-transparent border-0";
  div.appendChild(textnote);

  let closeBtn = document.createElement("BUTTON");
  closeBtn.classList = "btn-close hide";
  closeBtn.type = "button";
  closeBtn.ariaLabel = "Close";
  div.appendChild(closeBtn);

  let footernote = document.createElement("P");
  footernote.classList = "footernote";
  div.appendChild(footernote);

  textnote.innerText = details;
  footernote.innerText = `${date}
   ${time}`;

  closeBtn.addEventListener("click", function () {
    // div.remove();
    deleteNoteFromStorage(placeInArray);
  });
}

// Storage

function addNoteToStorage() {
  event.preventDefault();
  const details = document.getElementById("details");
  const date = document.getElementById("date");
  const time = document.getElementById("time");

  if (details.value.length === 0) {
    alert("Please fill in your task!");
    return;
  }

  if (date.value.length === 0) {
    alert("Don't forget the date!");
    return;
  }

  let newNote = {
    text: details.value,
    date: date.value,
    time: time.value,
  };

  const savedNotesArrayJson = localStorage.getItem("storeNotes");
  let notesArray =
    savedNotesArrayJson === null ? [] : JSON.parse(savedNotesArrayJson);
  notesArray.push(newNote);

  const notesArrayJson = JSON.stringify(notesArray);
  localStorage.setItem("storeNotes", notesArrayJson);

  const firstNoteFade = "firstNote";

  showNote(
    details.value,
    date.value,
    time.value,
    notesArray.length,
    firstNoteFade
  );
  reloadTimer();
}

// Upload Storage

function uploadNotes() {
  // const divText = document.getElementById("content");
  const savedNotesArrayJson = localStorage.getItem("storeNotes");

  if (savedNotesArrayJson === null) {
    return;
  } else {
    const notesArray = JSON.parse(savedNotesArrayJson);
    for (let i = 0; i < notesArray.length; i++) {
      showNote(notesArray[i].text, notesArray[i].date, notesArray[i].time, i);
    }
  }
}

function deleteNoteFromStorage(placeInArray) {
  const savedNotesArrayJson = localStorage.getItem("storeNotes");
  const notesArray = JSON.parse(savedNotesArrayJson);

  notesArray.splice(placeInArray, 1);

  const notesArrayJson = JSON.stringify(notesArray);
  localStorage.setItem("storeNotes", notesArrayJson);
  location.reload();
}

function reloadTimer() {
  setTimeout(function () {
    location.reload();
  }, 1000);
}
