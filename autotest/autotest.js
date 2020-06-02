let questionIndex = 1;

let questions = [
  /*{ id: 01, points: 0, type: "tbc", selection: null, title: "#01", description: "Indique su sexo." },
  { id: 02, points: 0, type: "tbc", selection: null, title: "#02", description: "Ingrese su edad." },
  { id: 03, points: 0, type: "tbc", selection: null, title: "#03", description: "Ingrese su Provincia." },
  { id: 04, points: 0, type: "tbc", selection: null, title: "#04", description: "Ingrese su Ciudad." },*/
  { id: 01, points: 3, type: "toogle", selection: null, title: "#01", description: "¿Tuvo o tiene fiebre mayor a 37,5 grados?" },
  { id: 02, points: 3, type: "toogle", selection: null, title: "#02", description: "¿Sufrió o sufre de dolor muscular o articular en las últimas 96 hs (4 días)?" },
  { id: 03, points: 3, type: "toogle", selection: null, title: "#03", description: "¿Tuvo o tiene náuseas o vómitos?" },
  { id: 04, points: 3, type: "toogle", selection: null, title: "#04", description: "¿Tiene erupciones, marcas o manchas en la piel producto de alguna picadura de mosquito?" },
  { id: 05, points: 1, type: "toogle", selection: null, title: "#05", description: "¿Siente algún dolor o molestia en la vista?" },
  { id: 06, points: 1, type: "toogle", selection: null, title: "#06", description: "¿Tuvo o tiene fuertes dolores de cabeza?" },
  { id: 07, points: 1, type: "toogle", selection: null, title: "#07", description: "¿Tuvo o tiene sangrado en encías o nariz? " },
  { id: 08, points: 1, type: "toogle", selection: null, title: "#08", description: "¿Tuvo o tiene derrames en la piel, moretones, u otras manifestaciones hemorrágicas?" }
];

function closeQuestion(elem) {

  let card = document.querySelector("#card");
  card.style.display = "none";
  card.classList.remove("fade-in");
}

function nextQuestion(elem) {

  this.processSelection();

  questionIndex = questionIndex += 1;
  if (questionIndex <= questions.length)
    this.showQuestion(questionIndex);
  else
    this.showResults();
}

function showQuestion(elem) {

  questionIndex = parseInt(elem);
  let question = questions.find(q => q.id === questionIndex)

  let card = document.querySelector("#card");
  let cardTitle = document.querySelector("#card-title");
  let cardDesc = document.querySelector("#card-desc");
  let cardSelection = document.querySelector("#card-selection"); 
  let cardButton = document.querySelector("#card-btn");
  
  card.style.display = "block";
  card.classList.add("fade-in");
  cardTitle.innerHTML = question.title;
  cardDesc.innerHTML = question.description;
  cardSelection.innerHTML = this.buildSelection(question.type, question.selection)
  cardButton.style.display = "block";
};

function buildSelection(type, selection) {

  // html += '<button class="selection-btn" onclick="processSelection(1)">SI &nbsp;<i class="far fa-check-square"></i></button>';
  // html += '<button class="selection-btn" onclick="processSelection(0)">NO &nbsp;<i class="far fa-window-close"></i></button>';

  let html = '';

  if (type === "tbc") {
    html += '<< a confirmar >>';
  }

  if (type === "toogle") {
    let checked = (selection === true) ? 'checked' : '';
    html += `<toggle-switch ${checked}></toggle-switch>`;
    // html += `<toggle-switch ${checked} onchange="processSelection()"></toggle-switch>`;
    // html += `<toggle-switch ${checked} onchange="processSelection(this)"></toggle-switch>`;
  }

  // console.log(html);
  return html;
}

function processSelection() {

  // let checked = value.childNodes[3].childNodes[1].checked;
  let toggleSwitch = document.querySelector("#toggleSwitch");
  if (toggleSwitch === null) { return; }

  let question = questions.find(q => q.id === questionIndex);
  question.selection = toggleSwitch.checked ? true : false;
  // console.log(questions);
}

function showResults() {

  // let card = document.querySelector("#card");
  let cardTitle = document.querySelector("#card-title");
  let cardDesc = document.querySelector("#card-desc");
  let cardSelection = document.querySelector("#card-selection"); 
  let cardButton = document.querySelector("#card-btn");
  
  cardTitle.innerHTML = "Resultados";
  cardDesc.innerHTML = this.processAnswers();
  cardSelection.innerHTML = "";
  cardButton.style.display = "none";
}

function processAnswers() {

  let description = "";
  
  // check completed questions (first 4 question doesn't compute)
  let aux = "";
  questions.forEach(q => {
    if (q.id >= 5 && q.selection === null) { aux += ` ${ q.title },`; }
  });
  if (aux !== "") { return "Faltan contestar las preguntas:" + aux.replace(/.$/, "."); }

  // calculate points
  const reducer = (result, question) => (question.selection) ? result + question.points : result;
  const points = questions.reduce(reducer, 0);

  // clean answers
  questions.forEach(q => q.selection = null);

  // response
  let reference = '</br></br></br><p>Referencia:</p>'
  reference += '<p>puntaje menor a 6 -> Riesgo bajo.</p>';
  reference += '<p>puntaje igual a 6 -> Riesgo medio.</p>';
  reference += '<p>puntaje mayor a 6 -> Riesgo alto.</p>';
  
  if (points < 6)       { return `<p>Su puntaje ${ points }: Riesgo bajo.</p><p>Sin recomendaciones. ${ reference }</p>`; }
  else if (points == 6) { return `<p>Su puntaje ${ points }: Riesgo medio.</p><p style="color:red;">Se recomienda una consulta médica preventiva. ${ reference }</p>`; }
  else if (points > 6)  { return `<p>Su puntaje ${ points }: Riesgo alto.</p><p style="color:red;">Se recomienda que se acerque a una guardia médica. ${ reference }</p>`; }
}
