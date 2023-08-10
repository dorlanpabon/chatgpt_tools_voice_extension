(()=>{let e=navigator.language||navigator.userLanguage;"es"!=e&&"en"!=e&&(e="en");let t={es:{Bienvenida:"Bienvenido a la herramienta de voz para ChatGPT (ChatGPT Tool Voice).\nDebido a que el chat de ChatGPT no tiene un evento de envio de mensaje, la herramienta solo leera automaticamente cuando se da click en el boton de enviar.",Progresivo:"Progresivo",Frase:"Frase",Desactivado:"Desactivado",Detener:"Detener la lectura",Velocidad:"Velocidad",Tono:"Tono",Configuracion:"Configuracion de voz",NoSoportado:"Lo siento, tu navegador no admite la API de Web Speech",TextoCopiado:"Texto copiado al portapapeles",ProcesandoParaLeer:"Procesando para leer"},en:{Bienvenida:"Welcome to the ChatGPT voice tool (ChatGPT Tool Voice).\nBecause the ChatGPT chat does not have a message sending event, the tool will only read automatically when you click on the send button.",Progresivo:"Progressive",Frase:"Phrase",Desactivado:"Disabled",Detener:"Stop reading",Velocidad:"Speed",Tono:"Tone",Configuracion:"Voice settings",NoSoportado:"Sorry, your browser does not support the Web Speech API",TextoCopiado:"Text copied to clipboard",ProcesandoParaLeer:"Processing to read"}};localStorage.getItem("chatgpt_tool_voice_bienvenida")||!1||(localStorage.setItem("chatgpt_tool_voice_bienvenida",!0),alert(t[e].Bienvenida));let o=localStorage.getItem("speech_automatic")||t[e].Progresivo,n=localStorage.getItem("speech_voice")||"Google español de Estados Unidos",a=localStorage.getItem("speech_lang")||"es-ES",i=localStorage.getItem("speech_rate")||"1",r=localStorage.getItem("speech_pitch")||"1",c=webkitSpeechRecognition;webkitSpeechGrammarList,webkitSpeechRecognitionEvent;const l=["flex","py-3","px-3","items-center","gap-3","rounded-md","hover:bg-gray-500/10","transition-colors","duration-200","text-white","cursor-pointer","text-sm"];let d=document.querySelector("nav");const s=document.createElement("a");s.id="stop-voice",s.textContent=t[e].Detener,s.classList.add(...l),s.addEventListener("click",(()=>{"speechSynthesis"in window&&speechSynthesis.cancel()})),s.innerHTML=`<svg fill="#ffffff" height="1.2rem" width="1.2rem"" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 300.003 300.003" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M150.001,0c-82.838,0-150,67.159-150,150c0,82.838,67.162,150.003,150,150.003c82.843,0,150-67.165,150-150.003 C300.001,67.159,232.846,0,150.001,0z M134.41,194.538c0,9.498-7.7,17.198-17.198,17.198s-17.198-7.7-17.198-17.198V105.46 c0-9.498,7.7-17.198,17.198-17.198s17.198,7.7,17.198,17.198V194.538z M198.955,194.538c0,9.498-7.701,17.198-17.198,17.198 c-9.498,0-17.198-7.7-17.198-17.198V105.46c0-9.498,7.7-17.198,17.198-17.198s17.198,7.7,17.198,17.198V194.538z"></path> </g> </g> </g></svg>  \n    ${t[e].Detener} `,d.appendChild(s);const p=document.createElement("select");p.id="select-read",p.classList.add(...l),p.addEventListener("change",(e=>{o=e.target.value,localStorage.setItem("speech_automatic",o)})),p.value=o,p.style.color="black",p.style.display="none",[t[e].Progresivo,t[e].Frase,t[e].Desactivado].forEach((e=>{const t=document.createElement("option");t.textContent=e,t.value=e,e==o&&(t.selected=!0),p.appendChild(t)})),d.appendChild(p);const C=document.createElement("select");C.id="select-voice",C.classList.add(...l),C.addEventListener("change",(e=>{n=e.target.value,localStorage.setItem("speech_voice",n),a=e.target.options[e.target.selectedIndex].getAttribute("data-voice-lang"),localStorage.setItem("speech_lang",a)})),C.value=n,C.style.color="black",C.style.display="none",speechSynthesis.getVoices(),chargeVoices=()=>{voices=speechSynthesis.getVoices().sort((function(e,t){const o=e.name.toUpperCase(),n=t.name.toUpperCase();return o<n?-1:o==n?0:1})),voices.forEach((e=>{const t=document.createElement("option");t.textContent=e.name,t.value=e.name,t.setAttribute("data-voice-lang",e.lang),e.name==n&&(t.selected=!0),C.appendChild(t)}))},setTimeout(chargeVoices,1e3),d.appendChild(C);const u=document.createElement("div");u.id="div-voice",u.classList.add(...l),u.style.display="none",d.appendChild(u);const h=document.createElement("input");h.id="rate-voice",h.addEventListener("change",(o=>{i=o.target.value,localStorage.setItem("speech_rate",i),v.innerHTML=t[e].Velocidad+": "+i})),h.value=i,h.type="range",h.min="0.5",h.max="2",h.step="0.1",h.value=i,h.style.color="black";const g=document.createElement("div");g.id="div-rate-voice",g.classList.add(...l),u.style.display="none",u.appendChild(g);const v=document.createElement("label");v.id="label-rate-voice",v.textContent=t[e].Velocidad+": "+i,v.setAttribute("for","rate-voice"),g.appendChild(v),g.appendChild(h);const m=document.createElement("input");m.id="pitch-voice",m.addEventListener("change",(o=>{r=o.target.value,localStorage.setItem("speech_pitch",r),f.innerHTML=t[e].Tono+": "+r})),m.value=r,m.type="range",m.min="0",m.max="2",m.step="0.1",m.value=r,m.style.color="black";const L=document.createElement("div");L.id="div-pitch-voice",L.classList.add(...l),u.appendChild(L);const f=document.createElement("label");f.id="label-pitch-voice",f.textContent=t[e].Tono+": "+r,f.setAttribute("for","pitch-voice"),L.appendChild(f),L.appendChild(m);const y=document.createElement("a");y.id="settings-voice",y.textContent=t[e].Configuracion,y.classList.add(...l),y.addEventListener("click",(()=>{"none"==p.style.display?(p.style.display="block",C.style.display="block",u.style.display="block"):(p.style.display="none",C.style.display="none",u.style.display="none")})),y.innerHTML=`<svg viewBox="0 0 24 24"  width="1.3em" height="1.3em"  fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M13.9838 2.54161C14.0711 2.71093 14.0928 2.92777 14.1361 3.36144C14.2182 4.1823 14.2593 4.59274 14.4311 4.81793C14.649 5.10358 15.0034 5.25038 15.3595 5.20248C15.6402 5.16472 15.9594 4.90352 16.5979 4.38113C16.9352 4.10515 17.1038 3.96716 17.2853 3.90918C17.5158 3.83555 17.7652 3.84798 17.9872 3.94419C18.162 4.01994 18.3161 4.17402 18.6243 4.4822L19.5178 5.37567C19.8259 5.68385 19.98 5.83794 20.0558 6.01275C20.152 6.23478 20.1644 6.48415 20.0908 6.71464C20.0328 6.89612 19.8948 7.06478 19.6188 7.4021C19.0964 8.0406 18.8352 8.35984 18.7975 8.64056C18.7496 8.99662 18.8964 9.35102 19.182 9.56893C19.4072 9.74072 19.8176 9.78176 20.6385 9.86385C21.0722 9.90722 21.2891 9.92891 21.4584 10.0162C21.6734 10.1272 21.841 10.3123 21.9299 10.5373C22 10.7145 22 10.9324 22 11.3682V12.6319C22 13.0676 22 13.2855 21.93 13.4626C21.841 13.6877 21.6734 13.8729 21.4583 13.9838C21.289 14.0711 21.0722 14.0928 20.6386 14.1361L20.6386 14.1361C19.818 14.2182 19.4077 14.2592 19.1825 14.4309C18.8967 14.6489 18.7499 15.0034 18.7979 15.3596C18.8357 15.6402 19.0968 15.9593 19.619 16.5976C19.8949 16.9348 20.0328 17.1034 20.0908 17.2848C20.1645 17.5154 20.152 17.7648 20.0558 17.9869C19.98 18.1617 19.826 18.3157 19.5179 18.6238L18.6243 19.5174C18.3162 19.8255 18.1621 19.9796 17.9873 20.0554C17.7652 20.1516 17.5159 20.164 17.2854 20.0904C17.1039 20.0324 16.9352 19.8944 16.5979 19.6184L16.5979 19.6184C15.9594 19.096 15.6402 18.8348 15.3595 18.7971C15.0034 18.7492 14.649 18.896 14.4311 19.1816C14.2593 19.4068 14.2183 19.8173 14.1362 20.6383C14.0928 21.0722 14.0711 21.2891 13.9837 21.4585C13.8728 21.6735 13.6877 21.8409 13.4628 21.9299C13.2856 22 13.0676 22 12.6316 22H11.3682C10.9324 22 10.7145 22 10.5373 21.9299C10.3123 21.841 10.1272 21.6734 10.0162 21.4584C9.92891 21.2891 9.90722 21.0722 9.86385 20.6385C9.78176 19.8176 9.74072 19.4072 9.56892 19.182C9.35101 18.8964 8.99663 18.7496 8.64057 18.7975C8.35985 18.8352 8.04059 19.0964 7.40208 19.6189L7.40206 19.6189C7.06473 19.8949 6.89607 20.0329 6.71458 20.0908C6.4841 20.1645 6.23474 20.152 6.01272 20.0558C5.8379 19.9801 5.6838 19.826 5.37561 19.5178L4.48217 18.6243C4.17398 18.3162 4.01988 18.1621 3.94414 17.9873C3.84794 17.7652 3.8355 17.5159 3.90913 17.2854C3.96711 17.1039 4.10511 16.9352 4.3811 16.5979C4.90351 15.9594 5.16471 15.6402 5.20247 15.3594C5.25037 15.0034 5.10357 14.649 4.81792 14.4311C4.59273 14.2593 4.1823 14.2182 3.36143 14.1361C2.92776 14.0928 2.71093 14.0711 2.54161 13.9838C2.32656 13.8728 2.15902 13.6877 2.07005 13.4627C2 13.2855 2 13.0676 2 12.6318V11.3683C2 10.9324 2 10.7144 2.07008 10.5372C2.15905 10.3123 2.32654 10.1272 2.54152 10.0163C2.71088 9.92891 2.92777 9.90722 3.36155 9.86384H3.36155H3.36156C4.18264 9.78173 4.59319 9.74068 4.81842 9.56881C5.10395 9.35092 5.2507 8.99664 5.20287 8.64066C5.16514 8.35987 4.90385 8.04052 4.38128 7.40182C4.10516 7.06435 3.96711 6.89561 3.90914 6.71405C3.83557 6.48364 3.848 6.23438 3.94413 6.01243C4.01988 5.83754 4.17403 5.68339 4.48233 5.37509L5.37565 4.48177L5.37566 4.48177C5.68385 4.17357 5.83795 4.01947 6.01277 3.94373C6.23478 3.84753 6.48414 3.8351 6.71463 3.90872C6.89612 3.9667 7.06481 4.10472 7.4022 4.38076C8.04061 4.9031 8.35982 5.16427 8.64044 5.20207C8.99661 5.25003 9.35113 5.10319 9.56907 4.81742C9.74077 4.59227 9.78181 4.18195 9.86387 3.36131C9.90722 2.92776 9.9289 2.71098 10.0162 2.5417C10.1271 2.32658 10.3123 2.15898 10.5374 2.07001C10.7145 2 10.9324 2 11.3681 2H12.6318C13.0676 2 13.2855 2 13.4627 2.07005C13.6877 2.15902 13.8728 2.32656 13.9838 2.54161ZM12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z" fill="#c8c8c8"></path> </g></svg> ${t[e].Configuracion}`,d.appendChild(y);var b=new c;b.onresult=function(e){let t=document.querySelector("form div div textarea");var o=e.results[0][0].transcript.toLowerCase();t.value=t.value+" "+o,b.stop()},b.onspeechend=function(){b.stop(),S?.classList.remove("button-stop"),S?.classList.add("button-record")};const x=document.querySelector("form"),S=document.createElement("div");S.id="record-voice",S.classList.add(...l.concat("button-send").concat("button-record")),S.addEventListener("click",(()=>{S.classList.contains("button-record")?navigator.mediaDevices.getUserMedia({audio:!0}).then((function(e){S.classList.remove("button-record"),S.classList.add("button-stop"),b.start()})).catch((function(e){alert("You must allow the use of the microphone to use this feature.")})):(S.classList.remove("button-stop"),S.classList.add("button-record"),b.stop())})),S.innerHTML='<svg fill="#918d8d" width="2em" height="2em" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" stroke="#918d8d"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M25 0C18.921875 0 14 4.785156 14 10.71875L14 11L21.5 11C22.050781 11 22.5 11.449219 22.5 12C22.5 12.550781 22.050781 13 21.5 13L14 13L14 15L21.5 15C22.050781 15 22.5 15.449219 22.5 16C22.5 16.550781 22.050781 17 21.5 17L14 17L14 19L21.5 19C22.050781 19 22.5 19.449219 22.5 20C22.5 20.550781 22.050781 21 21.5 21L14 21L14 23.28125C14 29.214844 18.921875 34 25 34C31.078125 34 36 29.214844 36 23.28125L36 21L28.5 21C27.945313 21 27.5 20.550781 27.5 20C27.5 19.449219 27.945313 19 28.5 19L36 19L36 17L28.5 17C27.945313 17 27.5 16.550781 27.5 16C27.5 15.449219 27.945313 15 28.5 15L36 15L36 13L28.5 13C27.945313 13 27.5 12.550781 27.5 12C27.5 11.449219 27.945313 11 28.5 11L36 11L36 10.71875C36 4.785156 31.078125 0 25 0 Z M 9.8125 17.125C9.402344 17.210938 9.113281 17.582031 9.125 18L9.125 23C9.125 30.714844 14.6875 37.183594 22 38.59375L22 44L28 44L28 38.59375C35.3125 37.183594 40.875 30.714844 40.875 23L40.875 18C40.875 17.515625 40.484375 17.125 40 17.125C39.515625 17.125 39.125 17.515625 39.125 18L39.125 23C39.125 30.800781 32.800781 37.125 25 37.125C17.199219 37.125 10.875 30.800781 10.875 23L10.875 18C10.878906 17.75 10.773438 17.511719 10.589844 17.34375C10.402344 17.175781 10.15625 17.09375 9.90625 17.125C9.875 17.125 9.84375 17.125 9.8125 17.125 Z M 15.5 46C13.585938 46 12.03125 47.5625 12.03125 49.46875L12 50L37.875 49.9375L37.90625 49.46875C37.90625 47.5625 36.351563 46 34.4375 46Z"></path></g></svg>',x.appendChild(S);const w=document.createElement("div");w.id="toast",w.style.cssText="position: fixed; bottom: 0; left: 0; right: 0; padding: 10px; background-color: #10a37f; color: white; font-size: 16px; text-align: center; display: none;";let k=["stop-voice","select-read","select-voice","div-voice","record-voice","settings-voice"];function T(e){if("speechSynthesis"in window){const t=new SpeechSynthesisUtterance(e);for(let e=0;e<voices.length;e++)if(voices[e].name==n){t.voice=voices[e],t.lang=voices[e].lang;break}t.rate=i,t.pitch=r,t.onend=e=>{},t.onmark=e=>{},t.onpause=e=>{},t.onerror=e=>{},t.onresume=e=>{},t.onstart=e=>{},t.onboundary=e=>{},speechSynthesis.speak(t)}else alert(t[language].NoSoportdo)}setInterval((function(){k.forEach((e=>{if(null==document.getElementById(e))if(d=document.querySelector("nav"),"stop-voice"==e)d.appendChild(s);else if("select-read"==e)d.appendChild(p);else if("select-voice"==e)d.appendChild(C);else if("settings-voice"==e)d.appendChild(y);else if("div-voice"==e)d.appendChild(u);else if("record-voice"==e){document.querySelector("form").appendChild(S)}})),document.querySelectorAll(".flex-col.relative.items-end:not(.button-added)").forEach((function(o){let n=document.createElement("button"),a=document.createElement("button");document.createElement("button");n.innerHTML='<svg height="1.5em" width="1.5em"  viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M12.1657 2.14424C12.8728 2.50021 13 3.27314 13 3.7446V20.2561C13 20.7286 12.8717 21.4998 12.1656 21.8554C11.416 22.2331 10.7175 21.8081 10.3623 21.4891L4.95001 16.6248H3.00001C1.89544 16.6248 1.00001 15.7293 1.00001 14.6248L1 9.43717C1 8.3326 1.89543 7.43717 3 7.43717H4.94661L10.3623 2.51158C10.7163 2.19354 11.4151 1.76635 12.1657 2.14424ZM11 4.63507L6.00618 9.17696C5.82209 9.34439 5.58219 9.43717 5.33334 9.43717H3L3.00001 14.6248H5.33334C5.58015 14.6248 5.81823 14.716 6.00179 14.881L11 19.3731V4.63507Z" fill="#acacbe"></path> <path d="M16.0368 4.73124C16.1852 4.19927 16.7368 3.88837 17.2688 4.03681C20.6116 4.9696 23 8.22106 23 12C23 15.779 20.6116 19.0304 17.2688 19.9632C16.7368 20.1117 16.1852 19.8007 16.0368 19.2688C15.8884 18.7368 16.1993 18.1852 16.7312 18.0368C19.1391 17.3649 21 14.9567 21 12C21 9.04332 19.1391 6.63512 16.7312 5.96321C16.1993 5.81477 15.8884 5.2632 16.0368 4.73124Z" fill="#acacbe"></path> <path d="M16.2865 8.04192C15.7573 7.88372 15.2001 8.18443 15.0419 8.71357C14.8837 9.24271 15.1844 9.79992 15.7136 9.95812C16.3702 10.1544 17 10.9209 17 12C17 13.0791 16.3702 13.8456 15.7136 14.0419C15.1844 14.2001 14.8837 14.7573 15.0419 15.2865C15.2001 15.8156 15.7573 16.1163 16.2865 15.9581C17.9301 15.4667 19 13.8076 19 12C19 10.1924 17.9301 8.53333 16.2865 8.04192Z" fill="#acacbe"></path> </g></svg>',n.style.cssText="margin-right: 10px; margin-left: 10px;",n.onclick=function(){document.body.appendChild(w),w.textContent=t[e].ProcesandoParaLeer,w.style.display="block",setTimeout((()=>{w.remove()}),3e3);let n=o.parentElement?.innerHTML.replace(/<pre>[\s\S]*?<\/pre>/g,""),a=document.createElement("div");a.innerHTML=n;let i=a.textContent||a.innerText||"",r=0;if(separador=/([.,])/,textSplit=i?.match(/.+?[.,]|.+/g),textSplitLength=textSplit.length,condicion=r<textSplitLength,condicion){for(let e=r;e<textSplitLength;e++)r++,T(textSplit[e])}},a.innerHTML='<svg fill="#acacbe" height="1.5em" width="1.5em"  version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 64 64" enable-background="new 0 0 64 64" xml:space="preserve" stroke="#acacbe" transform="matrix(-1, 0, 0, 1, 0, 0)rotate(0)"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="Text-files"> <path d="M53.9791489,9.1429005H50.010849c-0.0826988,0-0.1562004,0.0283995-0.2331009,0.0469999V5.0228 C49.7777481,2.253,47.4731483,0,44.6398468,0h-34.422596C7.3839517,0,5.0793519,2.253,5.0793519,5.0228v46.8432999 c0,2.7697983,2.3045998,5.0228004,5.1378999,5.0228004h6.0367002v2.2678986C16.253952,61.8274002,18.4702511,64,21.1954517,64 h32.783699c2.7252007,0,4.9414978-2.1725998,4.9414978-4.8432007V13.9861002 C58.9206467,11.3155003,56.7043495,9.1429005,53.9791489,9.1429005z M7.1110516,51.8661003V5.0228 c0-1.6487999,1.3938999-2.9909999,3.1062002-2.9909999h34.422596c1.7123032,0,3.1062012,1.3422,3.1062012,2.9909999v46.8432999 c0,1.6487999-1.393898,2.9911003-3.1062012,2.9911003h-34.422596C8.5049515,54.8572006,7.1110516,53.5149002,7.1110516,51.8661003z M56.8888474,59.1567993c0,1.550602-1.3055,2.8115005-2.9096985,2.8115005h-32.783699 c-1.6042004,0-2.9097996-1.2608986-2.9097996-2.8115005v-2.2678986h26.3541946 c2.8333015,0,5.1379013-2.2530022,5.1379013-5.0228004V11.1275997c0.0769005,0.0186005,0.1504021,0.0469999,0.2331009,0.0469999 h3.9682999c1.6041985,0,2.9096985,1.2609005,2.9096985,2.8115005V59.1567993z"></path> <path d="M38.6031494,13.2063999H16.253952c-0.5615005,0-1.0159006,0.4542999-1.0159006,1.0158005 c0,0.5615997,0.4544001,1.0158997,1.0159006,1.0158997h22.3491974c0.5615005,0,1.0158997-0.4542999,1.0158997-1.0158997 C39.6190491,13.6606998,39.16465,13.2063999,38.6031494,13.2063999z"></path> <path d="M38.6031494,21.3334007H16.253952c-0.5615005,0-1.0159006,0.4542999-1.0159006,1.0157986 c0,0.5615005,0.4544001,1.0159016,1.0159006,1.0159016h22.3491974c0.5615005,0,1.0158997-0.454401,1.0158997-1.0159016 C39.6190491,21.7877007,39.16465,21.3334007,38.6031494,21.3334007z"></path> <path d="M38.6031494,29.4603004H16.253952c-0.5615005,0-1.0159006,0.4543991-1.0159006,1.0158997 s0.4544001,1.0158997,1.0159006,1.0158997h22.3491974c0.5615005,0,1.0158997-0.4543991,1.0158997-1.0158997 S39.16465,29.4603004,38.6031494,29.4603004z"></path> <path d="M28.4444485,37.5872993H16.253952c-0.5615005,0-1.0159006,0.4543991-1.0159006,1.0158997 s0.4544001,1.0158997,1.0159006,1.0158997h12.1904964c0.5615025,0,1.0158005-0.4543991,1.0158005-1.0158997 S29.0059509,37.5872993,28.4444485,37.5872993z"></path> </g> </g></svg>',a.style.cssText="margin-right: 10px;",a.onclick=function(){const n=o.parentElement.innerText,a=document.createElement("input");document.body.appendChild(a),a.value=n,a.select(),document.execCommand("copy"),document.body.removeChild(a),document.body.appendChild(w),w.textContent=t[e].TextoCopiado,w.style.display="block",setTimeout((()=>{w.remove()}),3e3)},o?.append(n),o?.append(a),o.classList.add("button-added")}));let n=document.querySelectorAll("form button:not(.button-send):not(.justify-center)"),a=Array.from(n).find((e=>""==e.innerText)),i=document.querySelector("form div div textarea:not(.textarea-enter)");const r=()=>{if(o==t[e].Desactivado)return void a?.removeEventListener("click",r);let n=""==document.querySelector("form textarea").value;document.querySelector("form button:not(.justify-center)")?.innerText,document.querySelectorAll(".flex-col.relative.items-end.button-added")?.length,document.querySelector("form button:not(.button-send).justify-center")?.innerText.includes("Stop"),document.querySelector("form button:not(.button-send).justify-center")?.innerText.includes("Regenerate");if(n)return;document.body.appendChild(w),w.textContent=t[e].ProcesandoParaLeer,w.style.display="block",setTimeout((()=>{w.remove()}),3e3);let i=!1,c=0,l=setInterval((()=>{let n=""!=document.querySelector("form button:not(.justify-center)")?.innerText;if(!i){if(buttonStopElement=null!=document.querySelector("form button svg rect"),!buttonStopElement)return;return void(i=!0)}let a=document.querySelectorAll("div.flex.flex-col.items-center div.w-full.border-b"),r=a[a.length-1]?.innerHTML.replace(/<pre>[\s\S]*?<\/pre>/g,""),d=document.createElement("div");d.innerHTML=r;let s,p,C=d.textContent||d.innerText||"";if(C.includes("Try again later."))return void clearInterval(l);let u,h,g=!1;switch(o){case t[e].Progresivo:s=" ",h=C?.split(s),u=h.length-1,p=c<u&&c+10<u;break;case t[e].Frase:s=/([.,])/,h=C?.match(/.+?[.,]|.+/g),u=h.length-1,p=c<u;break;case t[e].Completo:g=!0}if(n){if(g)return;if(p){let e="";for(let t=c;t<u;t++)e+=h[t],c++;T(e)}}else{if(g)return T(C),void clearInterval(l);if(c<h.length){let e="";for(let t=c;t<h.length;t++)e+=h[t],c++;T(e)}clearInterval(l)}}),1e3);a?.removeEventListener("click",r)};handleKeydown=e=>{e.key},a?.classList?.add("button-send"),i?.classList?.add("textarea-enter"),a?.removeEventListener("click",r),i?.removeEventListener("keydown",handleKeydown),a?.addEventListener("click",r),i?.addEventListener("keydown",handleKeydown)}),1e3)})();