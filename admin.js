
let AdmininputName = document.querySelector('.admin-add-target-name')
let AdmininputLink = document.querySelector('.admin-add-target-link')
let AdmininputReward = document.querySelector('.admin-add-target-reward')
let AdmininputCountry = document.querySelector('.admin-add-target-country')
let AdmininputSubject = document.querySelector('.admin-add-target-subject')
let AdmininputStatus = document.querySelector('.admin-add-target-status')
let addTargetBtn = document.querySelector('.admin-add-target-btn')

let proofPage = document.querySelector('.proof-page')
let proofExit = document.querySelector('.proof-exit')
let adminAddTarget = document.querySelectorAll('.admin-add-target')

let proofSendFileBtn = document.querySelector('.proof-upload-file')
let proofSendFileInput = document.querySelector('.proof-send-file-input')
let proofSendFile = document.querySelector('.proof-send-file')
let proofLoadingVideoCont = document.querySelector('.proof-loading-video-cont')
let goInactive = document.querySelectorAll('.go-inactive')
console.log('sosooooooooooo')

addTargetBtn.addEventListener('click', ()=>{
    fetch('https://pst-plaza-dir-feeds.trycloudflare.com/addTarget', {
        method: 'POST',
        headers: {'Content-type':'application/json'},
        body: JSON.stringify({nickname: localStorage.getItem('nickname'), UID: localStorage.getItem('UID'), name: AdmininputName.value, link: AdmininputLink.value, reward: AdmininputReward.value, country: AdmininputCountry.value, subject: AdmininputSubject.value, status: AdmininputStatus.value})
    })
    .then(res => res.json())
    .then(result => {
        console.log(result)
        if (result.status == 200) {
            console.log('ok')
            adminAddTarget.forEach(el => {
                el.value = ''
                el.ariaPlaceholder = 'successfully added'
            })
        } else {
            adminAddTarget.forEach(el => {
                el.value = ''
                el.ariaPlaceholder = 'something went wrong'
            })
        }
    })
})

// и тут тоже будет proof страница, потому что я ленивый долбоеб и не хочу делать отдельный js файл для одной страницы, которая будет открываться по клику на элемент в админке, который виден всем пользователям

let proofLink = document.querySelector('.proof-link')

proofLink.addEventListener('click', ()=>{
    pageChange()
    proofPage.classList.add('active')
})

proofExit.addEventListener('click', ()=>{
    proofPage.classList.remove('active')
    headPage.classList.remove('inactive')
})

targetDocBtn.addEventListener('click', ()=> {
    pageChange()
    proofPage.classList.add('active')
})

proofSendFileBtn.addEventListener('click', ()=>{
    let formData = new FormData()
    let file = proofSendFileInput.files[0]
    if (file.size > 8 * 1024*1024*50) return;

    console.log(file.size/8/1024/1024, file.name, file.type)



    formData.append('file', file)

    goInactive.forEach(el => el.classList.add('inactive'))
    proofLoadingVideoCont.classList.add('active')

    fetch('https://pst-plaza-dir-feeds.trycloudflare.com/sendProof', {
        method: 'POST',
        body: formData
    })
    .then(result => {
        result.status == 200? console.log('все ок'): console.log('пиздец')
    })
})