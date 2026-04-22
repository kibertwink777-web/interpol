


let inputNickname = document.querySelector('.reg-input-nick')
let inputUID = document.querySelector('.reg-input-UID')
let generateUID = document.querySelector('.generate-UID-link')
let regSumbitBtn = document.querySelector('.reg-sumbit-btn')

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
        msgUnderText.style.color = 'rgb(220,220,220)'; msgUnderText.textContent = 'account created';
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
    profileNickname.textContent = data.nickname
    //profileStatus.textContent = data.status
    profilePoints.textContent = data.points
    profileTLPosition.textContent = '_'
    profileCT.textContent = data.create_time.split(' ')[0]
    profileUID.textContent = data.UID
    profileBodyCont.classList.add('active')
    return
}

function getProfile() {
    fetch('https://v5w54ksx-3000.euw.devtunnels.ms/PA', {
        method: 'POST',
        headers: {'Content-type':'application/json'},
        body: JSON.stringify({UID:localStorage.getItem('UID')})
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

        if (inputNickname.value !== '' && inputUID.value.length >= 8) {

            fetch('https://v5w54ksx-3000.euw.devtunnels.ms/reg', {
                method: 'POST',
                headers: {'Content-type':'application/json'},
                body: JSON.stringify({nickname : inputNickname.value, UID: inputUID.value})
            })

            .then(result=>{
                console.log(result)
                inputNickname.value = ''
                if (result.status == 228) {
                    inputNickname.classList.add('red')
                    inputNickname.placeholder = 'THIS NICKNAME ALREADY EXISTS'
                } else if(result.status == 200) {
                    regMsg(0, result.status)
                    localStorage.setItem('UID', inputUID.value)
                }
                else regMsg(1, result.status)

            })
        }
    })

inputNickname.addEventListener('input',()=>{
    inputNickname.placeholder = 'enter your nickname...'
    inputNickname.classList.remove('red')
})

goHomeBtn.addEventListener('click', ()=>{
    headPage.classList.remove('inactive')
    regPage.classList.remove('active')
})

regIcon.addEventListener('click', ()=>{

    headPage.classList.add('inactive')

    if (localStorage.getItem('UID')) {
        PAPage.classList.add('active')
        getProfile()
        return;
    }

    console.log('yes')
    regPage = document.querySelector('.reg-page')
    regPage.classList.add('active')

})