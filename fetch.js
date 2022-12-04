async function fetchText() {
    var url = document.URL;
    var id = url.substring(url.lastIndexOf('/') + 1);

    console.log(id)

    let response = await fetch('https://docs.google.com/spreadsheets/d/e/2PACX-1vQgeBFLmTRMPQdzc2CCh7_Z7ljVImEH0OkaJ-i1A0IEwGeAKKoVFFY_NRM3mJuZC3Ewzm6I3QGmJI6f/pubhtml');

    if (response.status === 200) {
      let data = await response.text();
      let container = document.querySelector('.container');
      container.innerHTML = data;
      const tables = document.querySelectorAll("table");
      for (let t = 0; t < tables.length; t++) { 
        const wrapper = document.createElement("div");
        wrapper.classList.add("wrapper");
        wrapper.setAttribute('id', tables[t].children[1].children[0].cells[1].innerHTML.replaceAll(' ', '_'));
        document.body.appendChild(wrapper);
        for (let i = 0; i < tables[t].children[1].children.length; i++) {
          for (let j = 1; j < tables[t].children[1].children[i].cells.length; j++) {
            const newDiv = document.createElement("div");
            if (j == 1 && i == 0){
              newDiv.classList.add("name");
            }
            if (j == 2 && i == 0){
              newDiv.classList.add("class");
            }
            if (j == 1 && i != 0){
              newDiv.classList.add("subject");
            }
            if (j == 2 && i != 0){
              newDiv.classList.add("title");
            }
            if (j == 3 && i != 0){
              newDiv.classList.add("description");
            }
            if (i == 1){
              newDiv.classList.add("hidden");
            }
            newDiv.innerHTML = tables[t].children[1].children[i].cells[j].innerHTML;
            wrapper.appendChild(newDiv);
          }
        }
      }
      window.location.href = id;
    }
}

fetchText();