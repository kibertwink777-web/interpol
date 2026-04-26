
let AdmininputName = document.querySelector('.admin-add-target-name')
let AdmininputLink = document.querySelector('.admin-add-target-link')
let AdmininputReward = document.querySelector('.admin-add-target-reward')
let AdmininputCountry = document.querySelector('.admin-add-target-country')
let AdmininputSubject = document.querySelector('.admin-add-target-subject')
let AdmininputStatus = document.querySelector('.admin-add-target-status')
let addTargetBtn = document.querySelector('.admin-add-target-btn')


let adminAddTarget = document.querySelectorAll('.admin-add-target')

console.log('sosooooooooooo')

addTargetBtn.addEventListener('click', ()=>{
    fetch('https://v5w54ksx-3000.euw.devtunnels.ms/addTarget', {
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