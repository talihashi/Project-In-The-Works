

const baseURL = "http://localhost:4202"
//console.log(baseURL)
const firstDropdown = document.querySelector('#firstList')
const secondDropdown = document.querySelector('#secondList')
const wallet1Btn = document.querySelector('#wallet1btn')
const wallet2Btn = document.querySelector('#wallet2btn')
const wallet1input =  document.querySelector('#wallet1')
const wallet2input = document.querySelector('#wallet2')

const player1selection = []
const player2selection = []

const getNfts = (walletId, player) => {
    
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

const createPlayerCards = (player) => {

}

createPlayerCards()

//create two more variables (arrays) to store the selected nft's, store Id's or indexes of selected Nft's
//contain 3 selections for each player
//dom manipulation to populate images


wallet1Btn.addEventListener("click", () => {
    getNfts(wallet1input.value, 1)
})

wallet2Btn.addEventListener("click", () => {
    getNfts(wallet2input.value, 2)
})

//allow to select three
//display those 3 for each player