
let msgIcon = document.querySelector('.msg-icon')

let msgPage = document.querySelector('.messages-page')
let msgBody = document.querySelector('.messages-body')

let messagesBack = document.querySelector('.messages-back')

let minMessage = document.querySelector('.min-message')
let minMessageHeadText = document.querySelector('.min-message-headText')
let minMessageText = document.querySelector('.min-message-text')
let minMessageClose = document.querySelector('.min-message-close')

function fillMessages(data) {
    msgBody.innerHTML = ''

    data = data.reverse()
    console.log(data)

    minMessageHeadText.textContent = data[0].headText

    data.forEach((el,index)=>{
        let msgEl = document.createElement('div')
        msgEl.classList.add('messages-body-el')
        
        let headText = document.createElement('h2')
        headText.classList.add('messages-body-el-headText')
        headText.textContent = el.headText

        let footerText = document.createElement('p')
        footerText.classList.add('messages-body-el-footerText')
        footerText.textContent = el.footText

        let dateCont = document.createElement('div')
        dateCont.classList.add('messages-body-el-dateCont')

        let fullMsg = document.createElement('span')
        fullMsg.innerHTML = '<span class="material-symbols-outlined messages-full-msg" translate="no">keyboard_arrow_down</span>'

        let date = document.createElement('p')
        date.classList.add('messages-body-el-date')
        date.textContent = el.date

        msgBody.appendChild(msgEl)
        msgEl.appendChild(headText)
        msgEl.appendChild(footerText)
        msgEl.appendChild(dateCont)
        dateCont.appendChild(fullMsg)
        dateCont.appendChild(date)

        fullMsg.addEventListener('click', ()=>{
            console.log(footerText.style.height)
            msgEl.classList.toggle('messages-body-el-geminiUeban')
            footerText.style.height = 'auto'
            footerText.style.webkitMaskImage == 'linear-gradient(to bottom, rgb(30,32,32) 80%, transparent 100%)'? footerText.style.webkitMaskImage = 'none' : footerText.style.webkitMaskImage = 'linear-gradient(to bottom, rgb(30,32,32) 80%, transparent 100%)'
            fullMsg.style.transform == 'rotate(180deg)'? fullMsg.style.transform = 'rotate(0deg)' : fullMsg.style.transform = 'rotate(180deg)'
        })

    })
}

function getMessages() {
    fetch(`${CLOUDFLARE_EBANAYA_ZALUPA}/messages`)
    .then(res => res.json())
    .then(result => {
        console.log(result)
        fillMessages(result)
    })
    return
}

getMessages()

if (localStorage.getItem('termsOfService')) {
    let timeout = setTimeout(()=> {
        minMessage.classList.add('active')
    }, 6000)
}

msgIcon.addEventListener('click', ()=>{
    pageChange()
    minMessage.classList.remove('active')
    msgPage.classList.add('active')
    getMessages()
})

messagesBack.addEventListener('click', ()=>{
    pageChange()
    headPage.classList.remove('inactive')
})

minMessageClose.addEventListener('click', ()=>{
    minMessage.classList.remove('active')

})

