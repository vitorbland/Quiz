const $botaoInicio = document.querySelector(".inicio-quiz") 
const $proxQuestao = document.querySelector(".prox-questao")
const $questoesContainer = document.querySelector(".questoes-container")
const $questaoText = document.querySelector(".questao")
const $respContainer = document.querySelector(".resp-container")
const $resp = document.querySelectorAll(".resp")


let questaoIndex = 0
let totalAcertos = 0

$botaoInicio.addEventListener("click", iniciarJogo)
$proxQuestao.addEventListener("click", displayProxQuestao)


function iniciarJogo()
{
    $botaoInicio.classList.add("hide")
    $questoesContainer.classList.remove("hide")
    displayProxQuestao()
}

function displayProxQuestao()
{
    resetar()

    if(questoes.lenght === questaoIndex)
    {
        return fimJogo()
    }

    $questaoText.textContent = questoes[questaoIndex].questao
    questoes[questaoIndex].resp.forEach(resp => 
        {
            const novaResp = document.createElement("button")
            novaResp.classList.add("button", "resp")
            novaResp.textContent = resp.text
            if (resp.correto)
            {
                novaResp.dataset.correto = resp.correto
            }
            $respContainer.appendChild(novaResp)

            novaResp.addEventListener("click", selectResp)
        })
}

function resetar()
{
    while($respContainer.firstChild)
    {
        $respContainer.removeChild($respContainer.firstChild)
    }

    document.body.removeAttribute("class")
    $proxQuestao.classList.add("hide")

}

function selectResp(event)
{
    const respClick = event.target

    if (respClick.dataset.correto)
    {
        document.body.classList.add("correto")

        totalAcertos++
    }
    else
    {
        document.body.classList.add("incorreto")
    }

    document.querySelectorAll(".resp").forEach(button =>
        {
            if(button.dataset.correto)
            {
                button.classList.add("correto")
            }
            else
            {
                button.classList.add("incorreto")
            }

            button.disabled = true
        })

        $proxQuestao.classList.remove("hide")
        questaoIndex++
}

function fimJogo()
{
    const totalQuestoes = questoes.lenght
    const desempenho = Math.floor(totalAcertos * 100 / totalQuestoes)

    let mensagem = ""

    switch(true)
    {
        case(desempenho >= 90):
        mensagem = "VOCÊ ENTENDE MESMO DE FUTEBOL!!!"
        break;

        case(desempenho >= 70):
        mensagem = "SHOW DE BOLA!!!"
        break;

        case(desempenho >= 50):
        mensagem = "ATÉ QUE FOI BEM!!!"
        break;

        default:
            mensagem = "TA PRECISANDO ESTUDAR MAIS EM!!! KKKKK"
    }

    $questoesContainer.innerHTML =
    `
    <p class="mensagem-final">
    VOCÊ PONTUOU ${totalAcertos} / ${totalQuestoes}!!!
    <span>Resultado: ${mensagem}</span>
    </p>
    <button onclick=window.location.reload() class="button">
        Refazer Teste
    </button>
    `
}

const questoes = [
{
    questao: "Qual foi o ultimo time brasileiro a conquistar o Mundial de clubes?",
    resp:
    [
        { text: "Palmeiras", correto: false},
        { text: "Flamengo", correto: false},
        { text: "Corinthians", correto: true},
        { text: "São Paulo", correto: false}
    ]
},

{
    questao: "Qual o verdadeiro nome do 'Rei Pelé' ?",
    resp:
    [
        { text: "Edson Arantes do Nascimento", correto: true},
        { text: "Roberto Nascimento Arantes", correto: false},
        { text: "Carlos Arantes Junior", correto: false},
        { text: "José Arantes do Nascimento", correto: false}
    ]
},

{
    questao: "Qual foi a ultima seleção a consagrar campeã Mundial?",
    resp:
    [
        { text: "Holanda", correto: false},
        { text: "Espanha", correto: false},
        { text: "França", correto: false},
        { text: "Argentina", correto: true}
    ]
},

{
    questao: "Em qual ano a seleção brasileira de futebol conquistou o 'Tetra'?",
    resp:
    [
        { text: "4 de Julho de 1954", correto: false},
        { text: "13 de Setembro 1952", correto: false},
        { text: "17 de julho de 1994", correto: true},
        { text: "10 de Junho de 1934", correto: false}
    ]
}
]
