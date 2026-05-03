
let CLOUDFLARE_EBANAYA_ZALUPA = ''

photo = document.querySelector('.photo')

gridContainer = document.querySelector('.grid-container')

let body = document.querySelector('body')

let page = document.querySelectorAll('.page')

let searchInput = document.querySelector('.search-input')
let searchBtn = document.querySelector('.search-button')
let searchInfo = document.querySelector('.search-info')

let errElementsContainer = document.querySelector('.err-el-container')
let errElements = document.querySelectorAll('.err-el')
let reloadLink = document.querySelector('.reload')

let loadAnimationContainer = document.querySelector('.load-container')

let regIcon = document.querySelector('.reg-icon')
let moreComs = document.querySelector('.more-coms')
let moreList = document.querySelector('.more-list')

let regPage = document.querySelector('.reg-page')

let headPage = document.querySelector('.head-page')

let PAPage = document.querySelector('.personal-account-page')

let adminPage = document.querySelector('.admin-Page')
let tierlistPage = document.querySelector('.tier-list-page')

let data;

let cardTarget;
let targetPage = document.querySelector('.target-page');
let adminLink = document.querySelector('.admin-only')
let homeLink = document.querySelector('.home-link')
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

let tierListElementsContainer = document.querySelector('.tier-list-elements-container')

let tierListLink = document.querySelector('.tier-list-link')

let targetDocBtn = document.querySelector('.target-docBtn')

let proofPage = document.querySelector('.proof-page')
let proofPageVisible = document.querySelector('.proof-page-visible')

let proofSendFile = document.querySelector('.proof-send-file')
let proofLoadingVideoCont = document.querySelector('.proof-loading-video-cont')
let goInactive = document.querySelectorAll('.go-inactive')
let proofMsgCont = document.querySelector('.proof-msg-cont')

let termsOfSevicePage = document.querySelector('.terms-of-service-page')
let termsOfServiceAcceptBtn = document.querySelector('.terms-of-service-accept-btn')

localStorage.getItem('termsOfService')? console.log('accepted') : termsOfSevicePage.classList.add('active')

termsOfServiceAcceptBtn.addEventListener('click', ()=>{
    console.log('accept')
    termsOfSevicePage.classList.remove('active')
    localStorage.setItem('termsOfService', 'true')
})

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
                targetReward.textContent = localData[i].reward; targetReward.style.color = 'rgb(218, 6, 207)'
                targetStatus.textContent = localData[i].status; localData[i].status === 'active'? targetStatus.style.color = 'rgb(50, 230, 50)': targetStatus.style.color = 'red'
                targetProgressHeadText.textContent = `Прогресс:${localData[i].progress} / 100`
                targetProgressBarCurrent.style.width = `${4 + 96/100 * localData[i].progress}%`
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
            let card_FT_rewardContainer = document.createElement('div')
            let card_FT_rewardIcon = document.createElement('img')
            card_FT_rewardIcon.classList.add('card-footerText-rewardIcon')
            card_FT_rewardIcon.src = 'coin.svg'
            card_FT.classList.add('card-footerText')
            card_FT_Data.classList.add('card-footerText-data')
            card_FT_rewardContainer.classList.add('card-footerText-rewardContainer')

            card_FT.textContent = criteries[i]
            
            if (i === 0) card_FT_Data.textContent = el.name
            else if (i == 1) {card_FT_Data.textContent = el.reward; card_FT_Data.style.color ='rgb(218, 6, 207)'; card_FT_container.appendChild(card_FT); card_FT_container.appendChild(card_FT_rewardContainer); card_FT_rewardContainer.appendChild(card_FT_Data); card_FT_rewardContainer.appendChild(card_FT_rewardIcon)}
            else {card_FT_Data.textContent = el.status; el.status === 'active'? card_FT_Data.style.color = 'rgb(50, 230, 50)': card_FT_Data.style.color = 'red'}

            if (i !== 1) {
                card_FT_container.appendChild(card_FT)
                card_FT_container.appendChild(card_FT_Data)
            }
        }
    });
}

function load() {
    fetch(`${CLOUDFLARE_EBANAYA_ZALUPA}/basic`)
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


function loadTL() {
    let rewardMass = [500, 250, 100, 75, 50, 25,15,'--','--','--']
    tierListElementsContainer.classList.remove('active')
    fetch(`${CLOUDFLARE_EBANAYA_ZALUPA}/tiers`)
    .then(res => res.json())
    .then(result => {
        localStorage.setItem('tierList', JSON.stringify(result))

        tierListElementsContainer.innerHTML = ''
        result.forEach((el, i) => {
            let tierListElement = document.createElement('div')
            tierListElement.classList.add('tier-list-element')

            let tierListElementNumber = document.createElement('p')
            tierListElementNumber.classList.add('tier-list-element-number', 'tier-list-element-el')
            tierListElementNumber.textContent = i + 1
            i == 0? tierListElementNumber.style.color = 'gold' : i == 1? tierListElementNumber.style.color = 'silver' : i == 2? tierListElementNumber.style.color = 'rgb(205, 127, 50)' : tierListElementNumber.style.color = 'white'

            let tierListElementName = document.createElement('p')
            let jopa = '\u200B'
            tierListElementName.className = 'notranslate tier-list-element-name tier-list-element-el'
            tierListElementName.classList.add('tierlist-name')
            tierListElementName.textContent = `${result[i].nickname}${jopa}`

            let tierListElementPointsCont = document.createElement('div')

            let tierListElementPoints = document.createElement('p')
            tierListElementPoints.style.color = 'rgb(218, 6, 207)'
            let tierListElementPointsIcon = document.createElement('img')
            tierListElementPointsIcon.classList.add('tier-list-element-pointsIcon')
            tierListElementPointsIcon.src = 'coin.svg'
            tierListElementPointsCont.classList.add('tier-list-element-pointsCont')
            tierListElementPoints.classList.add('tier-list-element-points', 'tier-list-element-el')
            tierListElementPoints.textContent = result[i].points

            let tierListElementRewardCont = document.createElement('div')
            tierListElementRewardCont.classList.add('tier-list-element-rewardCont')

            let tierListElementReward = document.createElement('p')
            tierListElementReward.classList.add('tier-list-element-reward', 'tier-list-element-el')
            tierListElementReward.textContent = rewardMass[i]

            let tierListElementRewardIcon = document.createElement('img')
            tierListElementRewardIcon.src = 'telegram-star.svg'
            tierListElementRewardIcon.classList.add('tier-list-element-rewardIcon')

            let tierListElementOrders = document.createElement('p')
            tierListElementOrders.classList.add('tier-list-element-orders', 'tier-list-element-el')
            tierListElementOrders.textContent = result[i].orders

            tierListElementsContainer.appendChild(tierListElement)
            tierListElement.appendChild(tierListElementNumber)
            tierListElement.appendChild(tierListElementName)
            tierListElement.appendChild(tierListElementPointsCont)
            tierListElementPointsCont.appendChild(tierListElementPoints)
            tierListElementPointsCont.appendChild(tierListElementPointsIcon)
            tierListElement.appendChild(tierListElementRewardCont)
            tierListElementRewardCont.appendChild(tierListElementReward)
            tierListElementRewardCont.appendChild(tierListElementRewardIcon)
            tierListElement.appendChild(tierListElementOrders)
        })
        tierListElementsContainer.classList.add('active')
    })
}


function pageChange() {
    proofMsgCont.classList.remove('active')
    proofLoadingVideoCont.classList.remove('active')
    goInactive.forEach(el => el.classList.remove('inactive'))
    page.forEach(el => {
        if (el.classList.contains('head-page')) el.classList.add('inactive')
        moreList.classList.remove('active')
        el.classList.remove('active')
        tierListElementsContainer.classList.remove('active')
        proofPageVisible.classList.remove('active')
    })
}

reloadLink.addEventListener('click', ()=>{
    location.reload()
})


//ебучая страница получения информации о цели

targetBackBtn.addEventListener('click', () => {
    targetPage.classList.remove('active')
    headPage.classList.remove('inactive')
})

moreComs.addEventListener('click', ()=>{
    moreList.classList.toggle('active')
})

headPage.addEventListener('click', ()=>{
    moreList.classList.remove('active')
})

adminLink.addEventListener('click', ()=>{
    pageChange()
    adminPage.classList.add('active')
    
})

homeLink.addEventListener('click', ()=>{
    pageChange()
    headPage.classList.remove('inactive')

})

tierListLink.addEventListener('click', ()=>{
    pageChange()
    tierlistPage.classList.add('active')
    loadTL()
})
