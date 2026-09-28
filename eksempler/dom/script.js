const tekstboks=document.getElementById("tekstboks");
const knapp=document.getElementById("knapp");
const avsnitt=document.getElementById("avsnitt");


knapp.addEventListener("click", function() {
    const nyttAvsnitt=document.createElement("p");

    nyttAvsnitt.textContent=tekstboks.value;

    avsnitt.appendChild(nyttAvsnitt);

    nyttAvsnitt.addEventListener("click", function () {

        nyttAvsnitt.remove();
    });

    tekstboks.value="";
});