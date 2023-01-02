const textArea = document.querySelector("textarea");
const btn = document.querySelector("button");
let theVoice = document.querySelector("select");
let synth = speechSynthesis;
isSpeaking = true;

voices();
function voices() {
  for (let voice of synth.getVoices()) {
    let selected = voice.name === "Google US English" ? "selected" : "";
    let option = ` <option value="${voice.name}" ${selected}>${voice.name} (${voice.lang})</option>`;
    theVoice.insertAdjacentHTML("beforeend", option);
  }
}
synth.addEventListener("voiceschanged", voices);

function textToSpeech(text) {
  let utternance = new SpeechSynthesisUtterance(text);
  for (let voice of synth.getVoices()) {
    if (voice.name === theVoice.value) {
      utternance.voice = voice;
    }
  }
  synth.speak(utternance);
}

btn.addEventListener("click", (e) => {
  if (textArea.value !== "") {
    if (!synth.speaking) {
      textToSpeech(textArea.value);
    }
    if (textArea.value.length > 80) {
      if (isSpeaking) {
        synth.resume();
        isSpeaking = false;
        btn.innerText = "Pause Speech";
      } else {
        synth.pause();
        isSpeaking = true;
        btn.innerText = "Resume Speech";
      }
      setInterval(() => {
        if (!synth.speaking && !isSpeaking) {
          isSpeaking = true;
          btn.innerText = "Convert to Speech";
        }
      });
    } else {
      btn.innerText = "Convert to Speech";
    } 
  }
});
