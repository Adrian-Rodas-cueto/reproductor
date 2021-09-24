const lista = [
    {
        title: "sigo aqui",
        file: "sigo_aqui.mp3",
        cover: "no-man.png"
    },

    {
        title: "el problema",
        file: "El_problema.mp3",
        cover: "arjona.jpg"
    },

    {
        title: "lagrimas desordenadas",
        file: "Lágrimas_desordenadas.mp3",
        cover: "Folder.jpg"
    }
]
//variables
let aux = 0
let pausar=false
let marcador=null
let li = [null, null, null]
//capturar elementos del dom
const canciones = document.getElementById("canciones")
const audio = document.getElementById("audio")
const cover = document.getElementById("cover")
const title =document.getElementById("title")
const pause = document.getElementById("pause/play")
const play = document.getElementById("play")
const siguiente = document.getElementById("siguiente")
const anterior = document.getElementById("anterior")
const barra = document.getElementById("barra")
const barraPadre = document.getElementById("barraPadre")
//cargar lista de canciones 
function loaderlist () {
    lista.forEach((cancion, indice)=>{
        //crear li
        const li =document.createElement("li")
        // crear link
        const link = document.createElement("a")
        //llenar link
        link.innerText= cancion.title
        link.href = "#"
        link.id = (aux++ + "")
        //capturar click
        link.addEventListener("click", ()=> cargar(indice))
        //meter link dentro de li
        li.appendChild(link)
        //meter li dentro de ul
        canciones.appendChild(li)
    }    
    )
}
//capturar el progreso de la cancion
audio.addEventListener("timeupdate", barraprogreso)
//capturar el click de la barra 
barraPadre.addEventListener("click", setprogress)
//cargar cancion
function cargar (indice) {
    if (marcador!=indice) {
        marcador = indice
        //cargar auidio
        audio.src = ("./canciones/" + lista[indice].file)
        audio.play()
        pausar=true
        //cargar foto
        cover.src = ("./imagenes/" + lista[indice].cover)
        title.innerText = lista[indice].title 
        //clase activa
        claseActiva( indice)
        play.classList.remove("fa-play")
        play.classList.add("fa-pause")
    }
}
//poner clase activa
function claseActiva ( indice) {
    for (let i = 0; i < li.length; i++) {
        if (li[i].getAttribute("class")=="activa") {
            li[i].removeAttribute("class")
        }
    }
    li[indice].setAttribute("class", "activa")
}

//pausar cancion
pause.addEventListener("click", ()=>{
    if (pausar) {
        play.classList.remove("fa-pause")
        play.classList.add("fa-play")
        audio.pause()
        pausar = false
    }else if (audio.getAttribute("src")== '') {
        cargar(0, li[0])
        play.classList.remove("fa-play")
        play.classList.add("fa-pause")
    }
    else{
        play.classList.remove("fa-play")
        play.classList.add("fa-pause")
        audio.play()
        pausar = true
    }
})
//cancion siguiente
siguiente.addEventListener("click", ()=> {
    next(marcador)
} )
function next (indice) {
    audio.src = "./canciones/" + lista[indice+1].file
    audio.play()
    cover.src = "./imagenes/" + lista[indice+1].cover
    title.innerText = lista[indice+1].title
    claseActiva(indice+1)
    if (marcador!=2) {
        marcador++
    }
}
// cancion anterior 
anterior.addEventListener("click", ()=>{
    back(marcador)
})
function back (indice) {
    audio.src = "./canciones/" + lista[indice-1].file
    audio.play()
    cover.src = "./imagenes/" + lista[indice-1].cover
    title.innerText = lista[indice-1].title
    claseActiva(indice-1)
    if (marcador!=0) {
        marcador--
    }
}

// barra de progreso
function barraprogreso(event) {
   const {duration, currentTime} = event.srcElement
   barra.style.width = (currentTime*100/duration + "%")
}
//hacer la barra clicable
function setprogress (event) {
    const totalwidth = this.offsetWidth
    const progreso = event.offsetX
    audio.currentTime = (progreso*audio.duration/totalwidth)
}
// cambiar cancion al terminar 
audio.addEventListener("ended", () =>{
        next(marcador)
    }
)
//correr
loaderlist()
//capturar los link
for (let i = 0; i < li.length; i++) {
    li[i] = document.getElementById((i+""))
}
