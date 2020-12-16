const db = firebase.firestore();

async function getQuotes() {
  document.getElementById("quotes-wrapper").innerHTML = "";
  const quotesRef = db.collection("quotes");
  const docs = await quotesRef.get();
  docs.forEach((doc) => {
    const quote = doc.data();
    const template = /*html*/ `
    <div class="quote">
      <blockquote>
        <p>${quote.text}</p>
        <p class="cite">${quote.author}</p>
      </blockquote>
    </div>`;
    const el = document.createElement("div");
    document.getElementById("quotes-wrapper").appendChild(el);
    el.outerHTML = template;
  });
}

async function handleSubmit(e) {
  // Don't allow the form to submit (refreshing the page)
  e.preventDefault();

  // Get references to the fields.
  const textField = document.querySelector("#text-field");
  const authorField = document.querySelector("#author-field");

  // Get their values.
  const text = textField.value;
  const author = authorField.value;
  if (text.trim().length === 0 || author.trim().length === 0) {
    alert("Please fill in both quote and author.");
    return;
  }

  // Add the quote to the database.
  const quotesRef = db.collection("quotes");
  await quotesRef.add({
    text,
    author,
  });

  // Empty out the fields
  textField.value = "";
  authorField.value = "";

  // Manually refresh the quotes.
  getQuotes();
}

getQuotes();
document.querySelector("form").addEventListener("submit", handleSubmit);
