
let AdmininputName = document.querySelector('.admin-add-target-name')
let AdmininputLink = document.querySelector('.admin-add-target-link')
let AdmininputReward = document.querySelector('.admin-add-target-reward')
let AdmininputCountry = document.querySelector('.admin-add-target-country')
let AdmininputSubject = document.querySelector('.admin-add-target-subject')
let AdmininputStatus = document.querySelector('.admin-add-target-status')
let addTargetBtn = document.querySelector('.admin-add-target-btn')

let proofExit = document.querySelector('.proof-exit')
let adminAddTarget = document.querySelectorAll('.admin-add-target')

let proofSendFileBtn = document.querySelector('.proof-upload-file')
let proofSendFileInput = document.querySelector('.proof-send-file-input')
let proofSendFilePhantom = document.querySelector('.proof-send-file-phantom')
let proofDescription = document.querySelector('.proof-description-textarea')

let proofMsgHeadText = document.querySelector('.proof-msg-headText')
let proofMsgUnderText = document.querySelector('.proof-msg-underText')
let proofGoHomeBtn = document.querySelector('.proof-go-home')
let proofMsgIcon = document.querySelector('.proof-msg-icon')

console.log('sosooooooooooo')

async function proofMsgBox(type, code) {
    proofMsgCont.classList.add('active')
    proofLoadingVideoCont.classList.remove('active')

    if (type == 0) {
        proofMsgHeadText.style.color = 'rgb(207, 207, 207)'; proofMsgHeadText.textContent = 'Succesfully!';
        proofMsgUnderText.textContent = 'proof file was uploaded and administrator will check it soon';
        proofMsgIcon.textContent = 'check_circle' ; proofMsgIcon.style.color = 'rgb(0, 255, 0)'
        proofGoHomeBtn.style.color = 'rgb(56, 238, 11)'
    }
    else if (type == 1) {
        proofMsgHeadText.style.color = 'rgb(207, 207, 207)'; proofMsgHeadText.textContent = `Error ${code}`;
        proofMsgUnderText.style.color = 'rgb(199, 199, 199)'; proofMsgUnderText.textContent = 'please, try again or later';
        proofMsgIcon.textContent = 'cancel'; proofMsgIcon.style.color = 'rgb(238, 11, 11)';
        proofGoHomeBtn.style.color = 'rgb(238, 11, 11)'

        if (code == 298) {
            proofMsgUnderText.textContent = 'you are not registered yet, please, register first'
        }
    }
}

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
    proofMsgCont.classList.remove('active')
    proofLoadingVideoCont.classList.remove('active')
    goInactive.forEach(el => el.classList.remove('inactive'))
})

targetDocBtn.addEventListener('click', ()=> {
    pageChange()
    proofPage.classList.add('active')
})

proofSendFileInput.addEventListener('change', ()=>{
    let file = proofSendFileInput.files[0]
    if (file == null) { 
        proofSendFileBtn.style.color = 'rgba(250,0,0,0.2)'; 
        proofSendFileBtn.style.border = '4px solid rgba(250,0,0,0.2)';
        proofSendFileBtn.style.pointerEvents = 'none'
        proofSendFilePhantom.textContent = 'choose your file'
    } else  {
        proofSendFileBtn.style.color = 'rgb(211,0,0)'
        proofSendFileBtn.style.border = '4px solid rgb(211,0,0)'
        proofSendFileBtn.style.pointerEvents = 'all'
        proofSendFilePhantom.textContent = `choose your file (${file.name})`
    }
})

proofGoHomeBtn.addEventListener('click', ()=>{
    proofPage.classList.remove('active')
    headPage.classList.remove('inactive')
    proofMsgCont.classList.remove('active')
    proofLoadingVideoCont.classList.remove('active')
    goInactive.forEach(el => el.classList.remove('inactive'))
})

proofSendFileBtn.addEventListener('click', async()=>{
    let formData = new FormData()
    let file = await proofSendFileInput.files[0]
    if (file.size > 8 * 1024*1024*50) return;

    let preResult;

    console.log(file.size/8/1024/1024, file.name, file.type)

    await formData.append('file', file)
    await formData.append('desc', proofDescription.value)
    await formData.append('userData', JSON.stringify(JSON.parse(localStorage.getItem('userData'))))

    goInactive.forEach(el => el.classList.add('inactive'))
    proofSendFileInput.value = '' 
    proofSendFileBtn.style.color = 'rgba(250,0,0,0.2)'; 
    proofSendFileBtn.style.border = '4px solid rgba(250,0,0,0.2)';
    proofSendFileBtn.style.pointerEvents = 'none'
    proofLoadingVideoCont.classList.add('active')
    proofSendFilePhantom.textContent = 'choose your file'

    if (localStorage.getItem('userData')) {
        let result = await fetch('https://pst-plaza-dir-feeds.trycloudflare.com/preSendProof', {
            method: 'POST',
            headers: {'Content-type':'application/json'},
            body: JSON.stringify({nickname: JSON.parse(localStorage.getItem('userData')).nickname, UID: JSON.parse(localStorage.getItem('userData')).UID})
        })
        preResult = result.status
    } else preResult = 298

    if (preResult == 298) {
        proofMsgBox(1, 298)
        return;
    }


    await fetch('https://pst-plaza-dir-feeds.trycloudflare.com/sendProof', {
        method: 'POST',
        body: formData
    })
    .then(result => {
        result.status == 200? console.log('все ок'): console.log('пиздец')
        console.log(result.status)
        if (result.status == 200) {
            proofMsgBox(0, 1)
        } else if (result.status == 299) {
            proofMsgBox(1, 299)
        } else if (result.status == 298) {
            proofMsgBox(1, 298)
        }
    })
})