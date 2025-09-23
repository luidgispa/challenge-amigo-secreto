//O principal objetivo deste desafio é fortalecer suas habilidades em lógica de programação. Aqui você deverá desenvolver a lógica para resolver o problema.
const REGEX = /[^\p{L}\s]/u
const input = document.getElementById("amigo")
let listaAmigos = []
let listaSorteados = []

function adicionarAmigo() {
    let amigo = input.value.trim()
    if (amigo == "") {
        showMessage("Digite um nome antes de adicionar!")
        clearInput(input)
        triggerAnim()
        return
    }
    // Acessibilidade para filho de Elon Moscas
    if (amigo == "X Æ A-Xii") {
        showMessage("Filho de Elon Moscas adicionado com sucesso!", "success")
        listaAmigos.push(amigo)
        clearInput(input)
        exibirTexto("listaAmigos", amigo, true)
        return
    }
    if (REGEX.test(amigo)) {
        showMessage("Nome inválido, use apenas letras.")
        clearInput(input)
        triggerAnim()
        return
    }
    if (listaAmigos.includes(amigo)) {
        showMessage("Esse amigo já está na lista!")
        triggerAnim()
        clearInput(input)
        return
    }
    showMessage("Amigo adicionado com sucesso!", "success")
    listaAmigos.push(amigo)
    clearInput(input)
    exibirTexto("listaAmigos", amigo, true)
}

function showMessage(text, type = "error") {
    const errorBox = document.getElementById("error-box")
    errorBox.textContent = text
    errorBox.className = `message ${type}`
    setTimeout(() => {
        errorBox.className = "message"
        errorBox.textContent = ""
    }, 2000)
}

function triggerAnim() {
    input.classList.add("shake")
    input.classList.add("input--invalid")
}

input.addEventListener("animationend", () => {
    input.classList.remove("shake");
    input.classList.remove("input--invalid")
});

function exibirTexto(id, friend, isIncrement) {
    let res = document.getElementById(id)
    if (isIncrement) {
        res.innerHTML += `<li>${friend}</li>`
    } else {
        res.innerHTML = `<li>O amigo secreto sorteado é: ${friend}</li>`
    }
}

function clearInput(target) {
    target.value = ""
}

function sortearAmigo() {
    if (listaAmigos.length == 0) {
        // Não há amigos para serem sorteados
        showMessage("Nenhum amigo disponível para sorteio!")
        triggerAnim()
        return
    }
    let rand = Math.floor(Math.random() * listaAmigos.length)
    let amigoSorteado = listaAmigos[rand]
    if (listaSorteados.includes(amigoSorteado)) {
        return sortearAmigo()
    }
    listaSorteados.push(amigoSorteado)
    exibirTexto("resultado", amigoSorteado, false)
    // Elimina os amigos da lista que já foram sorteados
    let ul = document.getElementById("listaAmigos")
    let amigos = ul.getElementsByTagName("li")
    for (let amigo of amigos) {
        if (amigo.textContent === amigoSorteado) {
            amigo.style.textDecoration = "line-through"
            amigo.style.color = "#808080"
            break
        }
    }
    // Zera todas as listas caso não existam mais amigos para serem sorteados
    if (listaAmigos.length == listaSorteados.length) {
        showMessage("Todos os amigos foram sorteados!", "success")
        ul.classList.add("fade-out")
        setTimeout(() => {
            ul.classList.remove("fade-out")
            ul.innerHTML = ""
            listaAmigos = []
            listaSorteados = []
        }, 1000)
        setTimeout(() => {
            document.getElementById("resultado").innerHTML = ""
        }, 3500)
    }
}