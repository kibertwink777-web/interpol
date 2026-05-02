

let regHeadText = document.querySelector('.reg-head-text')
let inputNickname = document.querySelector('.reg-input-nick')
let inputUID = document.querySelector('.reg-input-UID')
let generateUID = document.querySelector('.generate-UID-link')
let regSumbitBtn = document.querySelector('.reg-sumbit-btn')
let loginLink = document.querySelector('.login-link')

//#region HTML ITEMS

let regFieldCont = document.querySelector('.reg-field-cont')
let successFieldCont = document.querySelector('.success-field-cont')

let goHomeBtn = document.querySelector('.reg-msg-btn')

let msgFieldCont = document.querySelector('.reg-msg-field-cont')

let profileNickname = document.querySelector('.profile-nickname')
let profileStatus = document.querySelector('.profile-status')
let profilePoints = document.querySelector('.profile-points')
let profileTLPosition  = document.querySelector('.profile-topList-position')
let profileCT = document.querySelector('.profile-creationTime')
let profileUID = document.querySelector('.profile-UID')
let profileBodyCont = document.querySelector('.profile-body-cont')

//check login or reg
let regType = 'reg'

let PABack = document.querySelector('.PA-back')

generateUID.addEventListener('click',()=>{
    inputUID.value = crypto.randomUUID()
})

let msgHeadText = document.querySelector('.reg-msg-headText')
let msgUnderText = document.querySelector('.reg-msg-underText')
let msgBtn = document.querySelector('.reg-msg-btn')
//#endregion

function regMsg(type, code) {
    regFieldCont.classList.add('inactive')
    msgFieldCont.classList.add('active')

    if (type == 0) {
        msgHeadText.style.color = 'rgb(15, 236, 15)'; msgHeadText.textContent = 'Succesfully!';
        regType =='reg'? msgUnderText.textContent = 'account created' : msgUnderText.textContent = 'you are logined';
        msgUnderText.style.color = 'rgb(220,220, 220)'
        msgBtn.style.color = 'rgb(56, 238, 11)'
    }

    else if (type == 1) {
        msgHeadText.style.color = 'rgb(252, 5, 5)'; msgHeadText.textContent = `Error ${code}`;
        msgUnderText.style.color = 'rgb(220,220,220)'; msgUnderText.textContent = 'please, try again or later';
        msgBtn.style.color = 'rgb(238, 11, 11)'
    }
}


function profileFill(data) {
    console.log('ok')
    profileNickname.textContent = `@${data.nickname}`
    profileStatus.textContent = data.role
    profilePoints.textContent = data.points; profilePoints.style.color = 'rgb(144, 12, 184)'
    profileTLPosition.textContent = '--'
    profileCT.textContent = data.create_time.split(' ')[0]
    profileUID.textContent = data.UID
    profileBodyCont.classList.add('active')

    if (data.role == 'admin') adminLink.classList.add('active')

    return
}

function getProfile() {
    let userData = JSON.parse(localStorage.getItem('userData'))
    fetch(`${CLOUDFLARE_EBANAYA_ZALUPA}/PA`, {
        method: 'POST',
        headers: {'Content-type':'application/json'},
        body: JSON.stringify({userData})
    })
    .then(res => res.json())
    .then(result=>{
        console.log(result)
        profileFill(result)
    })
}

regSumbitBtn.addEventListener('click', (event)=>{
        console.log('ok')
        event.preventDefault();

        if (inputNickname.value !== '' &&  regType == 'reg' && inputUID.value.length>= 8) {

            fetch(`${CLOUDFLARE_EBANAYA_ZALUPA}/reg`, {
                method: 'POST',
                headers: {'Content-type':'application/json'},
                body: JSON.stringify({nickname : inputNickname.value, UID: inputUID.value})
            })

            .then(result=>{
                console.log(result)
                if (result.status == 228) {
                    inputNickname.classList.add('red')
                    inputNickname.value = ''
                    inputNickname.placeholder = 'THIS NICKNAME ALREADY EXISTS'
                } else if(result.status == 200) {
                    regMsg(0, result.status)
                    localStorage.setItem('userData', JSON.stringify({UID:inputUID.value, nickname:inputNickname.value}))
                }
                else regMsg(1, result.status)

            })
        } else if (regType == 'log') {
            fetch(`${CLOUDFLARE_EBANAYA_ZALUPA}/log`, {
                method: 'POST',
                headers: {'Content-type': 'application/json'}, 
                body: JSON.stringify({UID: inputUID.value, nickname: inputNickname.value})
            })
            .then(result => {
                console.log(result.status)
                if (result.status == 200) {
                    localStorage.setItem('userData', JSON.stringify({UID:inputUID.value, nickname:inputNickname.value}))
                    regMsg(0, 1)
                }
                else {
                    inputUID.placeholder = 'INCORRECT NICKNAME OR UID!'; inputUID.value=''; inputUID.classList.add('red')
                }
            })
        }
    })

inputNickname.addEventListener('input',()=>{
    inputNickname.placeholder = 'enter your nickname...'
    inputNickname.classList.remove('red')
})

inputUID.addEventListener('input', ()=> {
    inputUID.classList.remove('red')
    regType == 'reg'? inputUID.placeholder = 'create or generate UID...' : inputUID.placeholder = 'enter your saved UID...'
})

loginLink.addEventListener('click', ()=>{
    regType == 'reg'? regType = 'log' : regType = 'reg'
    if (regType == 'log') {
        loginLink.textContent = 'registration'
        regHeadText.textContent = 'Login'
        inputUID.placeholder = 'enter your saved UID...'
        regSumbitBtn.textContent = 'login'
    } else {
        loginLink.textContent = 'login'
        regHeadText.textContent = 'Register'
        inputUID.placeholder = 'create or generate UID...'
        regSumbitBtn.textContent = 'create'
    }
})

goHomeBtn.addEventListener('click', ()=>{
    headPage.classList.remove('inactive')
    regPage.classList.remove('active')

    regFieldCont.classList.remove('inactive')
    msgFieldCont.classList.remove('active')

})

regIcon.addEventListener('click', ()=>{
    if (regPage.classList.contains('active') || PAPage.classList.contains('active')) { pageChange(); headPage.classList.remove('inactive'); return }
    pageChange()
    regPage.classList.add('active')

    if (localStorage.getItem('userData')) {
        PAPage.classList.add('active')
        getProfile()
        return;
    }

    console.log('yes')
    regPage = document.querySelector('.reg-page')
    regPage.classList.add('active')

})

PABack.addEventListener('click', ()=>{
    PAPage.classList.toggle('active')
    headPage.classList.toggle('inactive')
})
