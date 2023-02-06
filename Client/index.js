

const baseURL = "http://localhost:4202"
//console.log(baseURL)
const firstDropdown = document.querySelector('#firstList')
const secondDropdown = document.querySelector('#secondList')
const wallet1Btn = document.querySelector('#wallet1btn')
const wallet2Btn = document.querySelector('#wallet2btn')
const wallet1input =  document.querySelector('#wallet1')
const wallet2input = document.querySelector('#wallet2')

const player1Nft1 = document.getElementById('player1NftRow')
const player1Nft2 = document.getElementById('player1NftRow')
const player1Nft3 = document.getElementById('player1NftRow')
const player2Nft1 = document.getElementById('player2NftRow')
const player2Nft2 = document.getElementById('player2NftRow')
const player2Nft3 = document.getElementById('player2NftRow')

const player1selection = []
const player2selection = []


//const attack = Math.floor(Math.random() * (10 - 4) + 4)
//const defense = Math.floor(Math.random() * (7 - 3) + 3)
//const luck = Math.floor(Math.random() * (5 - 1) + 1)

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
        firstDropdown.innerHTML = ""
        const {ownedNfts} = res.data
        console.log(ownedNfts)
        const dropdown = document.createElement(`select`)
        ownedNfts.forEach(nft => {
            const nftOption = document.createElement(`option`)
            nftOption.onclick = () => {
                if(player === 1 && player1selection.length < 3) {                          player1selection.push(nft)
                    console.log(player1selection)
                } else if (player === 2 && player2selection.length < 3) {
                    player2selection.push(nft)
                    console.log(player2selection)
                } else {
                    alert("You can only select 3!")
                }
                //for(let i = 0; i < player1selection.length; i++) {
                //    const nft1Image[i] = player1selection[i].media[0].thumbnail
                //    const nft1Title[i] = player1selection[i].title
                //     player1Nft[i].innerHTML += `
                //     <div class="card"> 
                //             <div class="img">
                //                 <img src="${nft1Image[i]}" />
                //             </div>
                //             <div class="details">
                //             <h4>${nft1Title[i]}</h4>
                //             <ul>
                //                 <li>Attack: ${attack()}</li>
                //                 <li>Defense: ${defense()}</li>
                //                 <li>Luck: ${luck()}</li>
                //             </ul>
                //             </div>
                //         </div>
                //     `
                // }
                if(player1selection.length === 3) {
                    const nft1Image1 = player1selection[0].media[0].thumbnail
                    const nft1Title1 = player1selection[0].title

                    player1Nft1.innerHTML += `
                        <div class="card">
                            <div class="img">
                                <img src="${nft1Image1}" />
                            </div>
                            <div class="details">
                            <h4>${nft1Title1}</h4>
                            <ul>
                                <li>Attack: ${attack()}</li>
                                <li>Defense: ${defense()}</li>
                                <li>Luck: ${luck()}</li>
                            </ul>
                            </div>
                        </div>
                    `
                    const nft1Image2 = player1selection[1].media[0].thumbnail
                    const nft1Title2 = player1selection[1].title

                    player1Nft2.innerHTML += `
                        <div class="card">
                            <div class="img">
                                <img src="${nft1Image2}" />
                            </div>
                            <div class="details">
                            <h4>${nft1Title2}</h4>
                            <ul>
                                <li>Attack: ${attack()}</li>
                                <li>Defense: ${defense()}</li>
                                <li>Luck: ${luck()}</li>
                            </ul>
                            </div>
                        </div>
                    `
                    const nft1Image3 = player1selection[2].media[0].thumbnail
                    const nft1Title3 = player1selection[2].title

                    player1Nft3.innerHTML += `
                        <div class="card">
                            <div class="img">
                                <img src="${nft1Image3}" />
                            </div>
                            <div class="details">
                            <h4>${nft1Title3}</h4>
                            <ul>
                                <li>Attack: ${attack()}</li>
                                <li>Defense: ${defense()}</li>
                                <li>Luck: ${luck()}</li>
                            </ul>
                            </div>
                        </div>
                    `
                }
                if(player2selection.length === 3) {
                    const nft2Image1 = player2selection[0].media[0].thumbnail
                    const nft2Title1 = player2selection[0].title

                    player2Nft1.innerHTML += `
                        <div class="card">
                            <div class="img">
                                <img src="${nft2Image1}" />
                            </div>
                            <div class="details">
                            <h4>${nft2Title1}</h4>
                            <ul>
                                <li>Attack: ${attack()}</li>
                                <li>Defense: ${defense()}</li>
                                <li>Luck: ${luck()}</li>
                            </ul>
                            </div>
                        </div>
                    `
                    const nft2Image2 = player2selection[1].media[0].thumbnail
                    const nft2Title2 = player2selection[1].title

                    player2Nft2.innerHTML += `
                        <div class="card">
                            <div class="img">
                                <img src="${nft2Image2}" />
                            </div>
                            <div class="details">
                            <h4>${nft2Title2}</h4>
                            <ul>
                                <li>Attack: ${attack()}</li>
                                <li>Defense: ${defense()}</li>
                                <li>Luck: ${luck()}</li>
                            </ul>
                            </div>
                        </div>
                    `
                    const nft2Image3 = player2selection[2].media[0].thumbnail
                    const nft2Title3 = player2selection[2].title

                    player2Nft3.innerHTML += `
                        <div class="card">
                            <div class="img">
                                <img src="${nft2Image3}" />
                            </div>
                            <div class="details">
                            <h4>${nft2Title3}</h4>
                            <ul>
                                <li>Attack: ${attack()}</li>
                                <li>Defense: ${defense()}</li>
                                <li>Luck: ${luck()}</li>
                            </ul>
                            </div>
                        </div>
                    `
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
    //if double click deselect
    //need to check if player 
    //add button onto card where selection can be removed



wallet1Btn.addEventListener("click", () => {
    postNfts(wallet1input.value, 1)
})

wallet2Btn.addEventListener("click", () => {
    postNfts(wallet2input.value, 2)
})