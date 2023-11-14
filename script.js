// let speech = new webkitSpeechRecognition();

// let Voices = [];
// let VoiceSelect = document.querySelector("select");

// document.querySelector("button").addEventListener("Click", (e) =>{
//     e.preventDefault();
//     speech.text = document.querySelector("textarea").value;
//     window.speechSynthesis.speak(speech);
// })

// window.speechSynthesis.onvoiceschanged = () => {
//     Voices = window.speechSynthesis.getVoices();
//     speech.voice = Voices[0];

//     Voices.forEach((voice,i) => (VoiceSelect.options[i] = new Option(voice.name,i)));
// }

// VoiceSelect.addEventListener("click", () => {
//     speech.voice = Voices[VoiceSelect.value];
// })


const TextArea = document.querySelector("textarea");
const Button = document.querySelector("button");
const VoiceList = document.querySelector("select");

let synth = speechSynthesis;
let isSpeaking = true;

function textTospeech(text) {
  let utternance = new SpeechSynthesisUtterance(text);

  for (let voice of synth.getVoices()) {
    if (voice.name === VoiceList.value) {
      utternance.voice = voice;
    }
  }

  speechSynthesis.speak(utternance);
}

Button.addEventListener("click", (e) => {
  e.preventDefault();

  if (TextArea.value !== "") {
    if (!synth.speaking) {
      textTospeech(TextArea.value);
    }
  }
});

function voices() {
  for (let voice of synth.getVoices()) {
    let selected = voice.name === "Google US English" ? "selected" : "";
    let option = `<option value = "${voice.name}" ${selected} > ${voice.name}(${voice.lang}) </option>`;
    VoiceList.insertAdjacentHTML("beforeend", option);
  }
}

synth.addEventListener("voiceschanged", voices);
