import { dataCountriesApi } from "./apis.js";
import { generationCard } from "./card.js"

const avisoCard = document.querySelector(".aviso")
const contadorCard = document.querySelector(".contador")
const contenedor = document.querySelector(".contenedor-cartas");
const cantidadCartas = document.getElementById("cantidad-cartas")
const btnReniciar = document.querySelector(".reniciar")
//Obtiene la cantidad de cartas despues de que se hayan insertados en la función insertCards()
let cards


function insertCards(num){
    for (let index = 0; index < num; index++) {
        const card = generationCard();
        contenedor.insertAdjacentHTML("beforeend", card);
    }
}

//Seleccionar Aleatoriamente los datos de la API
function randomDataSelection(data, num){
    const copyData = []
    let random = 0

    for (let index = 0; index < num; index++) {
        random = Math.floor(Math.random() * data.length);
        copyData.push(data[random])
        copyData.push(data[random])
        data.splice(random,1);
    }

    return copyData
}

//Revolver los datos seleccionados
function random(data){
    const copyData = []
    let random = 0
    let length = data.length

    for (let index = 0; index < length; index++) {
        random = Math.floor(Math.random() * data.length);
        copyData[index] = data[random];
        data.splice(random, 1)
    }
    return copyData
}

function activeCards(cards){
    cards.forEach(element => {
        element.classList.remove("active")
    });
}

function insertsContenetTocards(cards,data){
    const datas = random( randomDataSelection(data, cards.length/2) )

    for (let index = 0; index < cards.length; index++) {
        
        cards[index].children[1].children[0].textContent = datas[index].name.common
        cards[index].children[1].children[1].src = datas[index].flags.png
    }
}

function aviso(){
    let index = 6
    let intervalo = setInterval(() => {
        index--
        contadorCard.textContent = index
        
        if (index === 0) {
            clearInterval(intervalo)
            avisoCard.style.display="none"
            contenedor.style.pointerEvents ="auto"
            activeCards(cards)
        } 
    }, 1000);
}


function addActiveToCards(card, status){

    if (status === "desactive") {
        card.classList.remove("active");
    }else{
        card.classList.add("active")
    }
}

const data = await dataCountriesApi();
function gameInit(){
    let cantidadPorDefecto = cantidadCartas.value;
    insertCards(cantidadPorDefecto);
    cards = document.querySelectorAll(".card");
    insertsContenetTocards(cards, data)

    aviso();
}

gameInit();

let cardUno = undefined
let cardDos = undefined
let point = 0

function game(cardUnoP, cardDosP){
    let contenidoUno = cardUnoP.children[1].children[0].textContent
    let contenidoDos = cardDosP.children[1].children[0].textContent

    if (contenidoUno != contenidoDos) {
        setTimeout(() => {
            addActiveToCards(cardUnoP, "desactive")
            addActiveToCards(cardDosP, "desactive")
            
            cardUno = undefined
            cardDos = undefined
            contenedor.style.pointerEvents ="auto"
        }, 550);
        
    }else{
        point ++;
        if(point === cards.length/2){
            avisoCard.style.display="block"
            contadorCard.textContent ="Game over"
            contenedor.style.pointerEvents ="none"
        }else{
        
            cardUno = undefined
            cardDos = undefined
            contenedor.style.pointerEvents ="auto"
           
        }
    }
}
cards.forEach(element => {

    element.addEventListener("click", (e)=>{
        
        if (cardUno === undefined) {
            cardUno = e.target
            
            addActiveToCards(cardUno)
            console.log(cardUno, "carta Uno")
        }else if(cardUno != undefined  && e.target != cardUno){
            cardDos = e.target
            addActiveToCards(cardDos)
            console.log(cardDos, "carta Dos")

            contenedor.style.pointerEvents ="none"
            game(cardUno, cardDos)
        }
        
    })
     
});

cantidadCartas.addEventListener("change", (e)=>{
    location.reload();
})

btnReniciar.addEventListener("click", ()=>{
    location.reload()
})