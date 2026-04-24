
photo = document.querySelector('.photo')

gridContainer = document.querySelector('.grid-container')

let searchInput = document.querySelector('.search-input')
let searchBtn = document.querySelector('.search-button')
let searchInfo = document.querySelector('.search-info')

let errElementsContainer = document.querySelector('.err-el-container')
let errElements = document.querySelectorAll('.err-el')
let reloadLink = document.querySelector('.reload')

let loadAnimationContainer = document.querySelector('.load-container')

let regIcon = document.querySelector('.reg-icon')

let regPage = document.querySelector('.reg-page')

let headPage = document.querySelector('.head-page')

let PAPage = document.querySelector('.personal-account-page')

let data;

let cardTarget;
let targetPage = document.querySelector('.target-page');

//дырявые переменные цели
let targetBackBtn = document.querySelector('.target-back')
let targetPhoto = document.querySelector('.target-photo')
let targetName = document.querySelector('.target-description-name')
let targetDescription = document.querySelector('.target-description-text-data')
let targetSubject = document.querySelector('.target-subject')
let targetCountry = document.querySelector('.target-country')
let targetReward = document.querySelector('.target-reward')
let targetStatus = document.querySelector('.target-status')
let targetProgressHeadText = document.querySelector('.target-progressBar-headText')
let targetProgressBarCurrent = document.querySelector('.target-progressBar-current')
function loadElements(localData) {
    searchInfo.textContent = `всего:${localData.length}`

    document.querySelectorAll('.card').forEach(el=> el.remove())
    localData.forEach((el,index) => {


        let card = document.createElement('div')
        card.classList.add('card')

        let photoContainer = document.createElement('div')
        photoContainer.classList.add('photo-container')

        let photo = document.createElement('img')
        photo.classList.add('photo')

        let card_HT_Container = document.createElement('div')
        card_HT_Container.classList.add('card-headText-container')

        let card_HT = document.createElement('h3')
        card_HT.classList.add('card-headText')
        card_HT.textContent = 'Data'

        let card_FT_container = document.createElement('div')
        card_FT_container.classList.add('card-footerText-container')
        

        gridContainer.appendChild(card)

        cardTarget = document.querySelectorAll('.card')

        cardTarget.forEach((elem, i) => {
            elem.addEventListener('click', () => {
                targetPage.classList.add('active')
                headPage.classList.add('inactive')
                targetPhoto.src = localData[i].link
                targetName.textContent = localData[i].name
                targetDescription.textContent = localData[i].description
                targetSubject.textContent = localData[i].subject
                targetCountry.textContent = localData[i].country
                targetReward.textContent = localData[i].reward; targetReward.style.color = 'rgb(144, 12, 184)'
                targetStatus.textContent = localData[i].status; localData[i].status === 'active'? targetStatus.style.color = 'rgb(50, 230, 50)': targetStatus.style.color = 'red'
                targetProgressHeadText.textContent = `Прогресс:${localData[i].progress}%`
                targetProgressBarCurrent.style.width = `${localData[i].progress}%`
            })
        })

        card.appendChild(photoContainer)
        card.appendChild(card_HT_Container)
        card.appendChild(card_FT_container)

        photoContainer.appendChild(photo)
        photo.src = el.link

        card_HT_Container.appendChild(card_HT)

        let criteries = ['name', 'reward', 'status']

        for(let i = 0; i < 3; i++) {
            let card_FT = document.createElement('h4')
            let card_FT_Data = document.createElement('h4')

            card_FT.classList.add('card-footerText')
            card_FT_Data.classList.add('card-footerText-data')

            card_FT.textContent = criteries[i]
            
            if (i === 0) card_FT_Data.textContent = el.name 
            else if(i === 1) { card_FT_Data.textContent = `${el.reward} Pts`; card_FT_Data.style.color = 'rgb(144, 12, 184)'}
            else {card_FT_Data.textContent = el.status; el.status === 'active'? card_FT_Data.style.color = 'rgb(50, 230, 50)': card_FT_Data.style.color = 'red'}


            card_FT_container.appendChild(card_FT)
            card_FT_container.appendChild(card_FT_Data)
        }
    });
}

function load() {
    fetch('https://v5w54ksx-3000.euw.devtunnels.ms/')
    .then(res => res.json())
    .then((result) => {
        console.log(result)
        data = result
        localStorage.setItem('data', JSON.stringify(data))

        loadAnimationContainer.classList.add('inactive')

        loadElements(data)

       }).catch((err) => {
         console.log(err)
         let errContainer = document.querySelector('.err-el-container').classList.add('active')

         loadAnimationContainer.classList.add('inactive')
       });
}

load()

function filter() {
    let SortedData = [...data].filter(el => el.name.toUpperCase().includes(searchInput.value.toUpperCase()) || el.status.toUpperCase().includes(searchInput.value.toUpperCase()) || el.reward.toUpperCase().includes(searchInput.value.toUpperCase()))
    console.log(SortedData)
    searchInput.value == ''? loadElements(data) : loadElements(SortedData)
}

searchBtn.addEventListener('click', ()=>{
    filter()
})

document.addEventListener('keydown', (event)=>{
    if (event.key == 'Enter') filter()
})

searchInput.addEventListener('mouseover', ()=>{
    searchInput.placeholder = 'search by name/status/reward'
})

errElements[errElements.length - 1].addEventListener('click', ()=> {
    if (localStorage.length !== 0) {
        errElementsContainer.classList.remove('active')
        let localStorageData = JSON.parse(localStorage.getItem('data'))
        data = localStorageData
        loadElements(localStorageData)
    }
})

reloadLink.addEventListener('click', ()=>{
    //location.reload()
})


//ебучая страница получения информации о цели

targetBackBtn.addEventListener('click', () => {
    targetPage.classList.remove('active')
    headPage.classList.remove('inactive')
})


