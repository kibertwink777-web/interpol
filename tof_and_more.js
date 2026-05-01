
let msgIcon = document.querySelector('.msg-icon')

let msgPage = document.querySelector('.messages-page')
let msgBody = document.querySelector('.messages-body')

function fillMessages(data) {
    msgBody.innerHTML = ''

    data = data.reverse()
    console.log(data)
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

msgIcon.addEventListener('click', ()=>{
    pageChange()
    msgPage.classList.add('active')
    getMessages()
})

