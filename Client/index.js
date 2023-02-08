
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

let player1selection = []
let player2selection = []

function attack () {
    return Math.floor(Math.random() * (10 - 4) + 4)
}
function defense () {
    return Math.floor(Math.random() * (7 - 3) + 3)
}
function luck () {
    return Math.floor(Math.random() * (5 - 1) + 1)
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
                            <ul>
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
                            <ul>
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

//class body

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
        let randomNfts = res.data
        .then((res) => {
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
                            <ul>
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
                            <ul>
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
    //make a get request for randomNfts
    //when it returns loop through res.data 
    //create and populate data html
    //append it to the dom
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
}
    //add button onto card where selection can be removed



wallet1Btn.addEventListener("click", () => {
    postNfts(wallet1input.value, 1)
})

wallet2Btn.addEventListener("click", () => {
    postNfts(wallet2input.value, 2)
})

fightBtn.addEventListener("click", () => {
    sendNfts()
})

getRandomBtn.addEventListener("click", () => {
    getRandomNft()
})

resetBtn.addEventListener("click", () => {
    reset()
})