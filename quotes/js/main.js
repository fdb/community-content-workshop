const db = firebase.firestore();

async function getQuotes() {
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

getQuotes();
