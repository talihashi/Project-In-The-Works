
const baseURL = "http://localhost:4202"
//console.log(baseURL)
const firstDropdown = document.querySelector('#firstList')
const secondDropdown = document.querySelector('#secondList')
const wallet1Btn = document.querySelector('#wallet1btn')
const wallet2Btn = document.querySelector('#wallet2btn')
const wallet1input =  document.querySelector('#wallet1')
const wallet2input = document.querySelector('#wallet2')

const player1Card = document.getElementById('player1Card')
const player2Card = document.getElementById('player2Card')
const fightBtn = document.getElementById('fightbtn')
const resetBtn = document.getElementById('resetbtn')
const getRandomBtn = document.getElementById('getRandomBtn')
const fightDetails = document.getElementById('fightDetails')

let player1selection = []
let player2selection = []

function attack () {
    return Math.floor(Math.random() * (10 - 4) + 4)
}
function defense () {
    return Math.floor(Math.random() * (7 - 3) + 3)
}
function luck () {
    return Math.floor(Math.random() * (3 - 1) + 1)
}

const postNfts = (walletId, player) => {
    axios.post(`${baseURL}/nfts`, {walletId})
    .then(res => {
        const {ownedNfts} = res.data
        console.log(ownedNfts)
        const dropdown = document.createElement(`select`)
        ownedNfts.forEach(nft => {
            const nftOption = document.createElement(`option`)
            nftOption.onclick = () => {
                if(player === 1 && player1selection.length < 3) {
                    player1selection.push(nft)
                    console.log(player1selection)
                } else if (player === 2 && player2selection.length < 3) {
                    player2selection.push(nft)
                    console.log(player2selection)
                } else {
                    alert("You can only select 3!")
                }
                player1Card.innerHTML = ""
                for(let i = 0; i < player1selection.length; i++) {
                   const nft1Image = player1selection[i].media[0].thumbnail
                   const nft1Title = player1selection[i].title
                   const nftCard = document.createElement('div')
                   nftCard.className = "card"
                    nftCard.innerHTML += ` 
                            <div class="img">
                                <img src="${nft1Image}" alt="Nft image"/>
                            </div>
                            <div class="details">
                            <h4>${nft1Title}</h4>
                            <ul class="player1stats">
                                <li>Attack: ${attack()}</li>
                                <li>Defense: ${defense()}</li>
                                <li>Luck: ${luck()}</li>
                            </ul>
                            </div>
                    `
                    console.log([player1selection[1]])
                    player1Card.appendChild(nftCard)
                    
                }

                player2Card.innerHTML = ""
                for(let i = 0; i < player2selection.length; i++) {
                   const nft2Image = player2selection[i].media[0].thumbnail
                   const nft2Title = player2selection[i].title
                   const nftCard = document.createElement('div')
                   nftCard.className = "card"
                    nftCard.innerHTML += `
                            <div class="img">
                                <img src="${nft2Image}" alt="Nft image"/>
                            </div>
                            <div class="details">
                            <h4>${nft2Title}</h4>
                            <ul class="player2stats">
                                <li>Attack: ${attack()}</li>
                                <li>Defense: ${defense()}</li>
                                <li>Luck: ${luck()}</li>
                            </ul>
                            </div>
                    `
                    player2Card.appendChild(nftCard)
                }
                if(player1selection.length === 3 && player2selection.length ===3) {
                    fightBtn.style.display = 'unset'
                }
            }
            nftOption.textContent = nft.title
            dropdown.appendChild(nftOption)
        })

        if(player === 1) {
            firstDropdown.appendChild(dropdown)
        } else {
            secondDropdown.appendChild(dropdown)
        }
    })
}

const sendNfts = () => {
    let body = {
        nfts: [...player1selection, ...player2selection]
    }
    console.log(body)
    axios.post(`${baseURL}/nft`, body)
        .then((res) => {
            console.log(res.data)
        }).catch(err => console.log(err))
}

const getRandomNft = () => {
    axios.get(`${baseURL}/nfts`)
        .then((res) => {
            let randomNfts = res.data
            for(let i=0; i<randomNfts.length; i++) {
                if(i<3) {
                    player1selection.push(randomNfts[i])
                } else {
                    player2selection.push(randomNfts[i])
                }
            }
            player1Card.innerHTML = ""
                for(let i = 0; i < player1selection.length; i++) {
                   const nft1Image = player1selection[i].media[0].thumbnail
                   const nft1Title = player1selection[i].title
                   const nftCard = document.createElement('div')
                   nftCard.className = "card"
                    nftCard.innerHTML += ` 
                            <div class="img">
                                <img src="${nft1Image}" alt="Nft image"/>
                            </div>
                            <div class="details">
                            <h4>${nft1Title}</h4>
                            <ul class="player1stats">
                                <li>Attack: ${attack()}</li>
                                <li>Defense: ${defense()}</li>
                                <li>Luck: ${luck()}</li>
                            </ul>
                            </div>
                    `
                    player1Card.appendChild(nftCard)
                }

                player2Card.innerHTML = ""
                for(let i = 0; i < player2selection.length; i++) {
                   const nft2Image = player2selection[i].media[0].thumbnail
                   const nft2Title = player2selection[i].title
                   const nftCard = document.createElement('div')
                   nftCard.className = "card"
                    nftCard.innerHTML += `
                            <div class="img">
                                <img src="${nft2Image}" alt="Nft image"/>
                            </div>
                            <div class="details">
                            <h4>${nft2Title}</h4>
                            <ul class="player2stats">
                                <li>Attack: ${attack()}</li>
                                <li>Defense: ${defense()}</li>
                                <li>Luck: ${luck()}</li>
                            </ul>
                            </div>
                    `
                    player2Card.appendChild(nftCard)
                }
                if(player1selection.length === 3 && player2selection.length ===3) {
                    fightBtn.style.display = 'unset'
                }
        })
}

const fight = () => {
    let player1stats = document.querySelectorAll('.player1stats')
    let player2stats = document.querySelectorAll('.player2stats')
    let player1StatObj = {}
    let player2StatObj = {}
    for(let i=0; i<player1stats.length; i++){
        let statList = player1stats[i].children
        player1StatObj[i] = {}
        for(let j = 0; j<statList.length; j++){
            let statArr = statList[j].textContent.split(": ")
            player1StatObj[i][statArr[0]] = statArr[1]
        }
    }
    console.log(player1StatObj[2])

    for(let i=0; i<player2stats.length; i++){
        let statList = player2stats[i].children
        player2StatObj[i] = {}
        for(let j = 0; j<statList.length; j++){
            let statArr = statList[j].textContent.split(": ")
            player2StatObj[i][statArr[0]] = statArr[1]
        }
    }
    console.log(player2StatObj[0])
    for(let i=0; i<3; i++){
        let title2 = player2selection[i].title
        let title1 = player1selection[i].title
        if(player1StatObj[i].Defense < player2StatObj[i].Defense){
            player2StatObj[i].Defense = parseInt(player1StatObj[i].Attack) - (parseInt(player2StatObj[i].Defense) + parseInt(player2StatObj[i].Luck))
        } else {
            player1StatObj[i].Defense = parseInt(player2StatObj[i].Attack) - (parseInt(player1StatObj[i].Defense) + parseInt(player1StatObj[i].Luck))
        }
        if(player2StatObj[i].Defense <= 0) {
            fightDetails.innerHTML +=`
                <p>${title2} fought an honorous battle, but they were slain by ${title1}.</p>
            `
        } else if(player1StatObj[i].Defense <= 0) {
            fightDetails.innerHTML +=`
                <p>${title1} fought an honorous battle, but they were slain by ${title2}.</p>
            `
        } else {
            fightDetails.innerHTML +=`
                <p>${title1} and ${title2} are exhausted after a long battle. They both live to fight another day.</p>
            `
        }
        console.log(player1StatObj[i].Defense)
        console.log(player2StatObj[i].Defense)
    }
}

const reset = () => {
    player1Card.innerHTML = ""
    player2Card.innerHTML = ""
    player1selection = []
    player2selection = []
    wallet1input.value = ""
    wallet2input.value = ""
    firstDropdown.innerHTML = ""
    secondDropdown.innerHTML = ""
    fightBtn.style.display = "none"
    fightDetails.innerHTML = ""
}

wallet1Btn.addEventListener("click", () => {
    postNfts(wallet1input.value, 1)
})

wallet2Btn.addEventListener("click", () => {
    postNfts(wallet2input.value, 2)
})

fightBtn.addEventListener("click", () => {
    sendNfts(), fight()
})

getRandomBtn.addEventListener("click", () => {
    getRandomNft()
})

resetBtn.addEventListener("click", () => {
    reset()
})