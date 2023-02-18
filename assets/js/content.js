(() => {

    let speech_automatic = localStorage.getItem("speech_automatic") || "Progresivo";
    let speech_voice = localStorage.getItem("speech_voice") || "Google español de Estados Unidos";
    let speech_lang = localStorage.getItem("speech_lang") || "es-ES";
    let speech_rate = localStorage.getItem("speech_rate") || "1";
    let speech_pitch = localStorage.getItem("speech_pitch") || "1";

    let SpeechRecognition = webkitSpeechRecognition;
    let SpeechGrammarList = webkitSpeechGrammarList;
    let SpeechRecognitionEvent = webkitSpeechRecognitionEvent;

    const classList = ["flex", "py-3", "px-3", "items-center", "gap-3", "rounded-md", "hover:bg-gray-500/10", "transition-colors", "duration-200", "text-white", "cursor-pointer", "text-sm"];
    // Selecciona el elemento nav
    let navElement = document.querySelector("nav");

    // Crea un nuevo elemento y agregale contenido
    const nuevoElemento = document.createElement("a");
    nuevoElemento.id = "stop-voice";
    nuevoElemento.textContent = "Stop Voice";
    nuevoElemento.classList.add(...classList);
    // Agrega un evento al elemento nuevo
    nuevoElemento.addEventListener("click", () => {
        if ('speechSynthesis' in window) {
            speechSynthesis.cancel();
        }
    });
    nuevoElemento.innerHTML = `<svg fill="#ffffff" height="1.2rem" width="1.2rem"" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 300.003 300.003" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M150.001,0c-82.838,0-150,67.159-150,150c0,82.838,67.162,150.003,150,150.003c82.843,0,150-67.165,150-150.003 C300.001,67.159,232.846,0,150.001,0z M134.41,194.538c0,9.498-7.7,17.198-17.198,17.198s-17.198-7.7-17.198-17.198V105.46 c0-9.498,7.7-17.198,17.198-17.198s17.198,7.7,17.198,17.198V194.538z M198.955,194.538c0,9.498-7.701,17.198-17.198,17.198 c-9.498,0-17.198-7.7-17.198-17.198V105.46c0-9.498,7.7-17.198,17.198-17.198s17.198,7.7,17.198,17.198V194.538z"></path> </g> </g> </g></svg>  Stop Voice `;
    navElement.appendChild(nuevoElemento);


    // Agrega un evento al elemento select con Progresivo, Frase, Completo, Desactivado
    const selectElement = document.createElement("select");
    selectElement.id = "select-read";
    selectElement.classList.add(...classList);
    selectElement.addEventListener("change", (event) => {
        speech_automatic = event.target.value;
        localStorage.setItem("speech_automatic", speech_automatic);
    });
    selectElement.value = speech_automatic;
    //Color black, hover white
    selectElement.style.color = "black";
    selectElement.style.display = "none";
    //se quita "Completo",, ya que tiene problemas de limites de caracteres y no se puede leer
    let options = ["Progresivo", "Frase", "Desactivado"];
    options.forEach((option) => {
        const optionElement = document.createElement("option");
        optionElement.textContent = option;
        optionElement.value = option;
        //SELECTED
        if (option == speech_automatic) {
            optionElement.selected = true;
        }
        selectElement.appendChild(optionElement);
    });
    navElement.appendChild(selectElement);

    // Agrega el elemento Select voices
    const selectVoicesElement = document.createElement("select");
    selectVoicesElement.id = "select-voice";
    selectVoicesElement.classList.add(...classList);
    selectVoicesElement.addEventListener("change", (event) => {
        speech_voice = event.target.value;
        localStorage.setItem("speech_voice", speech_voice);
        speech_lang = event.target.options[event.target.selectedIndex].getAttribute("data-voice-lang");
        localStorage.setItem("speech_lang", speech_lang);
    });
    selectVoicesElement.value = speech_voice;
    //Color black, hover white
    selectVoicesElement.style.color = "black";
    selectVoicesElement.style.display = "none";
    speechSynthesis.getVoices();
    chargeVoices = () => {
        voices = speechSynthesis.getVoices().sort(function (a, b) {
            const aname = a.name.toUpperCase();
            const bname = b.name.toUpperCase();
            if (aname < bname) {
                return -1;
            } else if (aname == bname) {
                return 0;
            } else {
                return +1;
            }
        });
        //alert("Cargando voces, por favor espere..." + voices.length);
        voices.forEach((voice) => {
            //dalidate is localService true
            //if (!voice.localService) { return; }
            console.log(voice.name);
            const optionElement = document.createElement("option");
            optionElement.textContent = voice.name;
            optionElement.value = voice.name;
            //data-voice-lang
            optionElement.setAttribute("data-voice-lang", voice.lang);
            //SELECTED
            if (voice.name == speech_voice) {
                optionElement.selected = true;
            }
            selectVoicesElement.appendChild(optionElement);
        });
    }
    setTimeout(chargeVoices, 1000);
    navElement.appendChild(selectVoicesElement);
    //Crear div con label y input range, label y input pitch
    const divElement = document.createElement("div");
    divElement.id = "div-voice";
    divElement.classList.add(...classList);
    divElement.style.display = "none";
    navElement.appendChild(divElement);



    // Agrega el elemento Rate
    const rateElement = document.createElement("input");
    rateElement.id = "rate-voice";
    //rateElement.classList.add(...classList);
    rateElement.addEventListener("change", (event) => {
        speech_rate = event.target.value;
        localStorage.setItem("speech_rate", speech_rate);
        labelRateElement.innerHTML = "Rate: " + speech_rate;
    });
    rateElement.value = speech_rate;
    //type range
    rateElement.type = "range";
    //<input type="range" min="0.5" max="2" value="1" step="0.1" id="rate">
    rateElement.min = "0.5";
    rateElement.max = "2";
    rateElement.step = "0.1";
    rateElement.value = speech_rate;
    //Color black, hover white
    rateElement.style.color = "black";

    //div para label y input range
    const divRateElement = document.createElement("div");
    divRateElement.id = "div-rate-voice";
    divRateElement.classList.add(...classList);
    divElement.style.display = "none";
    divElement.appendChild(divRateElement);

    // Agrega el elemento Label Rate
    const labelRateElement = document.createElement("label");
    labelRateElement.id = "label-rate-voice";
    //labelRateElement.classList.add(...classList);
    labelRateElement.textContent = "Rate: " + speech_rate;
    //for
    labelRateElement.setAttribute("for", "rate-voice");
    divRateElement.appendChild(labelRateElement);
    divRateElement.appendChild(rateElement);





    // Agrega el elemento Pitch
    const pitchElement = document.createElement("input");
    pitchElement.id = "pitch-voice";
    //pitchElement.classList.add(...classList);
    pitchElement.addEventListener("change", (event) => {
        speech_pitch = event.target.value;
        localStorage.setItem("speech_pitch", speech_pitch);
        labelPitchElement.innerHTML = "Pitch: " + speech_pitch;
    });
    pitchElement.value = speech_pitch;
    //<input type="range" min="0" max="2" value="1" step="0.1" id="pitch">
    pitchElement.type = "range";
    pitchElement.min = "0";
    pitchElement.max = "2";
    pitchElement.step = "0.1";
    pitchElement.value = speech_pitch;
    //Color black, hover white
    pitchElement.style.color = "black";

    //div para label y input pitch
    const divPitchElement = document.createElement("div");
    divPitchElement.id = "div-pitch-voice";
    divPitchElement.classList.add(...classList);
    divElement.appendChild(divPitchElement);

    // Agrega el elemento Label Pitch
    const labelPitchElement = document.createElement("label");
    labelPitchElement.id = "label-pitch-voice";
    //labelPitchElement.classList.add(...classList);
    labelPitchElement.textContent = "Pitch: " + speech_pitch;
    //for
    labelPitchElement.setAttribute("for", "pitch-voice");
    divPitchElement.appendChild(labelPitchElement);
    divPitchElement.appendChild(pitchElement);



    // Agrega el elemento settings al nav
    const settingsElement = document.createElement("a");
    settingsElement.id = "settings-voice";
    settingsElement.textContent = "Settings";
    settingsElement.classList.add(...classList);
    settingsElement.addEventListener("click", () => {
        if (selectElement.style.display == "none") {
            selectElement.style.display = "block";
            selectVoicesElement.style.display = "block";
            divElement.style.display = "block";
        } else {
            selectElement.style.display = "none";
            selectVoicesElement.style.display = "none";
            divElement.style.display = "none";

        }
    });
    navElement.appendChild(settingsElement);

    //<button class="button-send"><svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4 mr-1" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg></button>


    var recognition = new SpeechRecognition();
    recognition.onresult = function (event) {

        let textareaEnter = document.querySelector("form div div textarea");
        var speechResult = event.results[0][0].transcript.toLowerCase();
        console.log('Speech received: ' + speechResult + '.');
        textareaEnter.value = textareaEnter.value + " " + speechResult;

        recognition.stop();
    }
    recognition.onspeechend = function () {
        recognition.stop();
        recordElement?.classList.remove("button-stop");
        recordElement?.classList.add("button-record");
        console.log('Speech has stopped being detected.');
    }
    // Agregar elemento record al form
    const formElement = document.querySelector("form");
    const recordElement = document.createElement("div");
    recordElement.id = "record-voice";
    recordElement.classList.add(...classList.concat("button-send").concat("button-record"));
    recordElement.addEventListener("click", () => {
        if (recordElement.classList.contains("button-record")) {

            //Solicitar permiso para usar el micrófono
            navigator.mediaDevices.getUserMedia({ audio: true })
                .then(function (stream) {
                    recordElement.classList.remove("button-record");
                    recordElement.classList.add("button-stop");
                    recognition.start();
                    console.log('You let me use your mic!');
                })
                .catch(function (err) {
                    console.log('You must allow the use of the microphone.');
                    alert("You must allow the use of the microphone to use this feature.");
                });

        } else {
            recordElement.classList.remove("button-stop");
            recordElement.classList.add("button-record");
            recognition.stop();
        }
    });
    //icon record
    recordElement.innerHTML = `<svg fill="#918d8d" width="2em" height="2em" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" stroke="#918d8d"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M25 0C18.921875 0 14 4.785156 14 10.71875L14 11L21.5 11C22.050781 11 22.5 11.449219 22.5 12C22.5 12.550781 22.050781 13 21.5 13L14 13L14 15L21.5 15C22.050781 15 22.5 15.449219 22.5 16C22.5 16.550781 22.050781 17 21.5 17L14 17L14 19L21.5 19C22.050781 19 22.5 19.449219 22.5 20C22.5 20.550781 22.050781 21 21.5 21L14 21L14 23.28125C14 29.214844 18.921875 34 25 34C31.078125 34 36 29.214844 36 23.28125L36 21L28.5 21C27.945313 21 27.5 20.550781 27.5 20C27.5 19.449219 27.945313 19 28.5 19L36 19L36 17L28.5 17C27.945313 17 27.5 16.550781 27.5 16C27.5 15.449219 27.945313 15 28.5 15L36 15L36 13L28.5 13C27.945313 13 27.5 12.550781 27.5 12C27.5 11.449219 27.945313 11 28.5 11L36 11L36 10.71875C36 4.785156 31.078125 0 25 0 Z M 9.8125 17.125C9.402344 17.210938 9.113281 17.582031 9.125 18L9.125 23C9.125 30.714844 14.6875 37.183594 22 38.59375L22 44L28 44L28 38.59375C35.3125 37.183594 40.875 30.714844 40.875 23L40.875 18C40.875 17.515625 40.484375 17.125 40 17.125C39.515625 17.125 39.125 17.515625 39.125 18L39.125 23C39.125 30.800781 32.800781 37.125 25 37.125C17.199219 37.125 10.875 30.800781 10.875 23L10.875 18C10.878906 17.75 10.773438 17.511719 10.589844 17.34375C10.402344 17.175781 10.15625 17.09375 9.90625 17.125C9.875 17.125 9.84375 17.125 9.8125 17.125 Z M 15.5 46C13.585938 46 12.03125 47.5625 12.03125 49.46875L12 50L37.875 49.9375L37.90625 49.46875C37.90625 47.5625 36.351563 46 34.4375 46Z"></path></g></svg>`;


    formElement.appendChild(recordElement);





    let elementsOptions = ["stop-voice", "select-read", "select-voice", "div-voice", "record-voice", "settings-voice"];


    function getTime() {
        let date = new Date();
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let seconds = date.getSeconds();
        let time = `${hours}:${minutes}:${seconds}`;
        return time;
    }

    setInterval(function () {

        //validar si los elementos ya estan creados si no crearlos
        elementsOptions.forEach((element) => {
            //console.log(element);
            let elementExists = document.getElementById(element);
            //console.log(elementExists);
            if (elementExists != null) { return; }
            navElement = document.querySelector("nav");
            if (element == "stop-voice") {
                navElement.appendChild(nuevoElemento);
            } else if (element == "select-read") {
                navElement.appendChild(selectElement);
            } else if (element == "select-voice") {
                navElement.appendChild(selectVoicesElement);
            } else if (element == "settings-voice") {
                navElement.appendChild(settingsElement);
            } else if (element == "div-voice") {
                navElement.appendChild(divElement);
            } else if (element == "record-voice") {
                const formElement = document.querySelector("form");
                formElement.appendChild(recordElement);
            }
        });



        //add button to voice, copy and share
        var elements = document.querySelectorAll(
            ".flex-col.relative.items-end:not(.button-added)"
        );
        elements.forEach(function (element) {
            let button1 = document.createElement("button");
            let button2 = document.createElement("button");
            let button3 = document.createElement("button");
            //add icon text to voice
            button1.innerHTML = `<svg height="1.5em" width="1.5em"  viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M12.1657 2.14424C12.8728 2.50021 13 3.27314 13 3.7446V20.2561C13 20.7286 12.8717 21.4998 12.1656 21.8554C11.416 22.2331 10.7175 21.8081 10.3623 21.4891L4.95001 16.6248H3.00001C1.89544 16.6248 1.00001 15.7293 1.00001 14.6248L1 9.43717C1 8.3326 1.89543 7.43717 3 7.43717H4.94661L10.3623 2.51158C10.7163 2.19354 11.4151 1.76635 12.1657 2.14424ZM11 4.63507L6.00618 9.17696C5.82209 9.34439 5.58219 9.43717 5.33334 9.43717H3L3.00001 14.6248H5.33334C5.58015 14.6248 5.81823 14.716 6.00179 14.881L11 19.3731V4.63507Z" fill="#acacbe"></path> <path d="M16.0368 4.73124C16.1852 4.19927 16.7368 3.88837 17.2688 4.03681C20.6116 4.9696 23 8.22106 23 12C23 15.779 20.6116 19.0304 17.2688 19.9632C16.7368 20.1117 16.1852 19.8007 16.0368 19.2688C15.8884 18.7368 16.1993 18.1852 16.7312 18.0368C19.1391 17.3649 21 14.9567 21 12C21 9.04332 19.1391 6.63512 16.7312 5.96321C16.1993 5.81477 15.8884 5.2632 16.0368 4.73124Z" fill="#acacbe"></path> <path d="M16.2865 8.04192C15.7573 7.88372 15.2001 8.18443 15.0419 8.71357C14.8837 9.24271 15.1844 9.79992 15.7136 9.95812C16.3702 10.1544 17 10.9209 17 12C17 13.0791 16.3702 13.8456 15.7136 14.0419C15.1844 14.2001 14.8837 14.7573 15.0419 15.2865C15.2001 15.8156 15.7573 16.1163 16.2865 15.9581C17.9301 15.4667 19 13.8076 19 12C19 10.1924 17.9301 8.53333 16.2865 8.04192Z" fill="#acacbe"></path> </g></svg>`;
            // margin-right: 10px; margin-left: 10px;
            button1.style.cssText = "margin-right: 10px; margin-left: 10px;";
            button1.onclick = function () {
                //print text
                console.log("speech:", element.parentElement.innerText);
                let textHtml = element.parentElement?.innerHTML.replace(/<pre>[\s\S]*?<\/pre>/g, "");
                let temporal = document.createElement("div");
                temporal.innerHTML = textHtml;
                let textLast = temporal.textContent || temporal.innerText || "";

                let textCountSpeak = 0;
                separador = /([.,])/;
                textSplit = textLast?.match(/.+?[.,]|.+/g);
                textSplitLength = textSplit.length;
                condicion = textCountSpeak < textSplitLength;

                if (condicion) {
                    //Obtener el texto de las 10 palabras
                    let textSend = "";
                    for (let i = textCountSpeak; i < textSplitLength; i++) {
                        //textSend += textSplit[i] + separador;
                        textCountSpeak++;
                        leerTexto(textSplit[i]);
                    }
                    //if (speech_automatic == 'Frase') { textCountSpeak--; }
                    //Enviar el texto
                }


            };
            button2.innerHTML = `<svg fill="#acacbe" height="1.5em" width="1.5em"  version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 64 64" enable-background="new 0 0 64 64" xml:space="preserve" stroke="#acacbe" transform="matrix(-1, 0, 0, 1, 0, 0)rotate(0)"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="Text-files"> <path d="M53.9791489,9.1429005H50.010849c-0.0826988,0-0.1562004,0.0283995-0.2331009,0.0469999V5.0228 C49.7777481,2.253,47.4731483,0,44.6398468,0h-34.422596C7.3839517,0,5.0793519,2.253,5.0793519,5.0228v46.8432999 c0,2.7697983,2.3045998,5.0228004,5.1378999,5.0228004h6.0367002v2.2678986C16.253952,61.8274002,18.4702511,64,21.1954517,64 h32.783699c2.7252007,0,4.9414978-2.1725998,4.9414978-4.8432007V13.9861002 C58.9206467,11.3155003,56.7043495,9.1429005,53.9791489,9.1429005z M7.1110516,51.8661003V5.0228 c0-1.6487999,1.3938999-2.9909999,3.1062002-2.9909999h34.422596c1.7123032,0,3.1062012,1.3422,3.1062012,2.9909999v46.8432999 c0,1.6487999-1.393898,2.9911003-3.1062012,2.9911003h-34.422596C8.5049515,54.8572006,7.1110516,53.5149002,7.1110516,51.8661003z M56.8888474,59.1567993c0,1.550602-1.3055,2.8115005-2.9096985,2.8115005h-32.783699 c-1.6042004,0-2.9097996-1.2608986-2.9097996-2.8115005v-2.2678986h26.3541946 c2.8333015,0,5.1379013-2.2530022,5.1379013-5.0228004V11.1275997c0.0769005,0.0186005,0.1504021,0.0469999,0.2331009,0.0469999 h3.9682999c1.6041985,0,2.9096985,1.2609005,2.9096985,2.8115005V59.1567993z"></path> <path d="M38.6031494,13.2063999H16.253952c-0.5615005,0-1.0159006,0.4542999-1.0159006,1.0158005 c0,0.5615997,0.4544001,1.0158997,1.0159006,1.0158997h22.3491974c0.5615005,0,1.0158997-0.4542999,1.0158997-1.0158997 C39.6190491,13.6606998,39.16465,13.2063999,38.6031494,13.2063999z"></path> <path d="M38.6031494,21.3334007H16.253952c-0.5615005,0-1.0159006,0.4542999-1.0159006,1.0157986 c0,0.5615005,0.4544001,1.0159016,1.0159006,1.0159016h22.3491974c0.5615005,0,1.0158997-0.454401,1.0158997-1.0159016 C39.6190491,21.7877007,39.16465,21.3334007,38.6031494,21.3334007z"></path> <path d="M38.6031494,29.4603004H16.253952c-0.5615005,0-1.0159006,0.4543991-1.0159006,1.0158997 s0.4544001,1.0158997,1.0159006,1.0158997h22.3491974c0.5615005,0,1.0158997-0.4543991,1.0158997-1.0158997 S39.16465,29.4603004,38.6031494,29.4603004z"></path> <path d="M28.4444485,37.5872993H16.253952c-0.5615005,0-1.0159006,0.4543991-1.0159006,1.0158997 s0.4544001,1.0158997,1.0159006,1.0158997h12.1904964c0.5615025,0,1.0158005-0.4543991,1.0158005-1.0158997 S29.0059509,37.5872993,28.4444485,37.5872993z"></path> </g> </g></svg>`;
            button2.style.cssText = "margin-right: 10px;";
            button2.onclick = function () {
                //copy to clipboard
                console.log("copy to clipboard", element.innerText);

                const texto = element.parentElement.innerText;
                const input = document.createElement("input");
                document.body.appendChild(input);
                input.value = texto;
                input.select();
                document.execCommand("copy");
                document.body.removeChild(input);
                //alert("Texto copiado al portapapeles: " + texto);
            };


            element?.append(button1);
            element?.append(button2);
            console.log(element);
            element.classList.add("button-added");
        });


        //boton para enviar
        let buttons = document.querySelectorAll("form button:not(.button-send):not(.justify-center)");
        let buttonWithTextSend = Array.from(buttons).find((button) => button.innerText == "");
        let textareaEnter = document.querySelector("form div div textarea:not(.textarea-enter)");
        //Funcion para dar click en el boton de enviar y poder remover el listener
        const handleClick = () => {


            //Delete listener
            console.log(getTime(), "button send");

            //Validar speech_automatic para que no se envie el mensaje
            if (speech_automatic == 'Desactivado') {
                buttonWithTextSend?.removeEventListener("click", handleClick); return;
            }
            console.log("Antes de validar textArea", speech_automatic)
            let text = document.querySelector("form textarea").value == "";
            console.log("text", text)
            let validateProgress = document.querySelector("form button:not(.justify-center)")?.innerText != ".";
            console.log("validateProgress", validateProgress)
            let countElements = document.querySelectorAll(".flex-col.relative.items-end.button-added")?.length;
            console.log("countElements", countElements)
            let buttonStopExist = document.querySelector("form button:not(.button-send).justify-center")?.innerText.includes("Stop") || false;
            console.log("buttonStopExist", buttonStopExist)
            let buttonRegenerateExist = document.querySelector("form button:not(.button-send).justify-center")?.innerText.includes("Regenerate") || false;
            console.log("buttonRegenerateExist", buttonRegenerateExist)
            //si text es vacio y validate es diferente de punto y countElements 0, seguir
            //si text es diferente de vacio y validate diferente de punto, no seguir

            if ((text) || (!text && !validateProgress) || buttonStopExist) { return; }

            console.log("Despues de validar textArea", speech_automatic)
            //variable buton stop, encontrado, para detener el intervalo
            let buttonStop = false;
            let textCountSpeak = 0;

            let interval = setInterval(() => {
                //si ecuentra el boton .button-stop seguir hasta cuando deje de existir
                let elementInternal = document.querySelector("form button:not(.justify-center)");
                let existElement = elementInternal?.innerText != "";

                if (!buttonStop) {
                    buttonStopElement = document.querySelector("form button svg rect") != null;
                    if (!buttonStopElement) return;
                    buttonStop = true;
                    console.log(getTime(), "button stop", buttonStop);
                    return;
                }
                //Obtener el texto del ultimo elemento .flex-col.relative.items-end ultimo elemento
                let elementsAll = document.querySelectorAll("div.flex.flex-col.items-center div.w-full.border-b");
                let elementLast = elementsAll[elementsAll.length - 1];

                //Se evita que se lea el texto de un codigo
                let textHtml = elementLast?.innerHTML.replace(/<pre>[\s\S]*?<\/pre>/g, "");
                let temporal = document.createElement("div");
                temporal.innerHTML = textHtml;
                let textLast = temporal.textContent || temporal.innerText || "";
                //let textLast = elementLast?.innerText;
                if (textLast.includes("Try again later.")) {
                    clearInterval(interval);
                    return;
                }

                let separador;
                let condicion;
                let completo = false;
                let textSplitLength;
                let textSplit;
                //Leer dependiendo de speech_automatic 
                switch (speech_automatic) {
                    case 'Progresivo':
                        //Validar si se pueden enviar 10 palabras, asi suscesivamente
                        separador = " ";
                        textSplit = textLast?.split(separador);
                        textSplitLength = textSplit.length - 1;
                        condicion = textCountSpeak < textSplitLength && textCountSpeak + 10 < textSplitLength;
                        break;
                    case 'Frase':
                        //Validar si se pueden enviar 10 palabras, asi suscesivamente
                        separador = /([.,])/;
                        textSplit = textLast?.match(/.+?[.,]|.+/g);
                        textSplitLength = textSplit.length - 1;
                        condicion = textCountSpeak < textSplitLength;
                        break;
                    case 'Completo':
                        //Validar si se pueden enviar 10 palabras, asi suscesivamente
                        completo = true;
                        break;
                }

                //si buttonStop es true y el boton de enviar ya no existe, detener el intervalo
                if (existElement) {
                    if (completo) { return; } //Si es completo no enviar nada aqui, esperar a que se envie el mensaje cuando se oculte el boton de stop
                    //Validar si se pueden enviar 10 palabras, asi suscesivamente
                    if (condicion) {
                        //Obtener el texto de las 10 palabras
                        let textSend = "";
                        for (let i = textCountSpeak; i < textSplitLength; i++) {
                            textSend += textSplit[i];
                            textCountSpeak++;
                        }
                        //if (speech_automatic == 'Frase') { textCountSpeak--; }
                        //Enviar el texto
                        leerTexto(textSend);
                    }
                    return;
                }

                if (completo) { //Si es completo enviar el mensaje completo y detener el intervalo
                    //Enviar el texto
                    leerTexto(textLast);
                    //Detener el intervalo
                    clearInterval(interval);
                    return;
                }

                //Si textCountSpeak es menor a textLast split, enviar el texto
                if (textCountSpeak < textSplit.length) {
                    //Obtener el texto de las 10 palabras
                    let textSend = "";
                    for (let i = textCountSpeak; i < textSplit.length; i++) {
                        textSend += textSplit[i];
                        textCountSpeak++;
                    }
                    //Enviar el texto
                    leerTexto(textSend);
                }
                //Detener el intervalo
                clearInterval(interval);
            }, 1000);
            //Remover el listener
            buttonWithTextSend?.removeEventListener("click", handleClick);

        }
        handleKeydown = (e) => {
            if (e.key == "Enter") {
                //get innerText
                //e.preventDefault();
                handleClick();
            }
        }
        buttonWithTextSend?.classList?.add("button-send");
        textareaEnter?.classList?.add("textarea-enter");
        buttonWithTextSend?.removeEventListener("click", handleClick);
        textareaEnter?.removeEventListener("keydown", handleKeydown);
        buttonWithTextSend?.addEventListener("click", handleClick);
        textareaEnter?.addEventListener("keydown", handleKeydown);

    }, 1000);

    function leerTexto(texto) {
        if ('speechSynthesis' in window) {
            const mensaje = new SpeechSynthesisUtterance(texto);
            for (let i = 0; i < voices.length; i++) {
                if (voices[i].name == speech_voice) {
                    mensaje.voice = voices[i];
                    mensaje.lang = voices[i].lang;
                    break;
                }
            }
            mensaje.rate = speech_rate;
            mensaje.pitch = speech_pitch;

            mensaje.onend = (event) => {
                console.log("onend");
                console.log(event);
            }

            mensaje.onmark = (event) => {
                console.log("onmark");
                console.log(event);
            }

            mensaje.onpause = (event) => {
                console.log("onpause");
                console.log(event);
            }

            mensaje.onerror = (event) => {
                console.log("onerror");
                console.log(event);
            }

            mensaje.onresume = (event) => {
                console.log("onresume");
                console.log(event);
            }

            mensaje.onstart = (event) => {
                console.log("onstart");
                console.log(event);
            }
            mensaje.onboundary = (event) => {
                console.log("onboundary");
                console.log(event.name);
            }
            console.log("mensaje", mensaje)
            speechSynthesis.speak(mensaje);
        } else {
            console.log("Lo siento, tu navegador no admite la API de Web Speech");
        }
    }
})();