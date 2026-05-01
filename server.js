

express = require('express')
sqlite3 = require('sqlite3')
fs = require('fs')
pc = require('picocolors')


const { HttpsProxyAgent } = require('https-proxy-agent');





expressLimit = require('express-rate-limit')
const { json } = require('express')
const multer = require('multer')
const {open} = require('sqlite');
const { stream } = require('undici');
const picocolors = require('picocolors');
cors = require('cors')


const multerHueta = multer({dest: 'C:/Users/SystemX/Desktop/pidors' })
app = express()

const limiter = expressLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 200 // limit each IP to 100 requests per windowMs
})

app.use(limiter)

app.use(cors())
app.use(express.json({limit: '150mb'}))
app.use(express.urlencoded({limit: '150mb', extended: true}))
app.set('trust proxy', 1);

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
});

async function pizda() {
    db = await open({
        filename: '../firstDB',
        driver: sqlite3.Database
    })

    //await db.exec('DROP TABLE IF EXISTS users')

    await db.exec('CREATE TABLE IF NOT EXISTS targets (name TEXT, link TEXT, status TEXT, reward TEXT DEFAULT 0, description TEXT DEFAULT "--",country TEXT, progress INTEGER DEFAULT 0, subject TEXT)')

    await db.exec('CREATE TABLE IF NOT EXISTS users(nickname TEXT UNIQUE, UID TEXT, role TEXT, points INTEGER, orders INTEGER, create_time DATETIME DEFAULT CURRENT_TIMESTAMP)')

    await db.exec('CREATE TABLE IF NOT EXISTS messages(headText TEXT, footText TEXT, date DATETIME DEFAULT CURRENT_TIMESTAMP)')
    console.log('fertige')
    //let sheet = await db.prepare('INSERT INTO users (name, link, status, reward) VALUES (?,?,?,?)')
    //sheet.run('сомов','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmjsgDBbLYhRrNYbdd3689-1HvN8f8oSsybQ&s','passed','5267Р')
}

pizda()

app.post('/test', (req,res)=>{
    let number = req.body
    console.log(number)
    res.send('ok, client')
})

app.get('/', async (req,res)=>{
    let sheet = await db.prepare('SELECT * FROM targets')
    data = await sheet.all()
    res.json(data)
})

app.post('/reg', async (req,res)=>{
    if (req.body.UID.length < 8) {res.sendStatus(269); return}
    try {
        let data = await db.prepare('INSERT INTO users(nickname, UID, points, orders, role) VALUES (?,?,?,?,?)')
        await data.run(req.body.nickname, req.body.UID, 0, 0, 'user')
        console.log('registration', req.body)
        res.send()
    } catch(err) {
        console.log(err.code)
        res.sendStatus(228)
    }
})

app.post('/log', async(req, res)=> {
    console.log('login', req.body)
    let data = await db.get('SELECT * FROM users WHERE UID = ? and nickname = ?', [req.body.UID, req.body.nickname])

    if (typeof(data) == 'undefined') res.sendStatus(267)
    else res.sendStatus(200)
})

app.post('/PA', async(req,res)=>{
    console.log('get Profile data', req.body)
    let response = await db.get('SELECT * FROM users WHERE UID = ? and nickname = ?', [req.body.userData.UID, req.body.userData.nickname])
    console.log(req.body, response)
    res.json(response)
})

app.get('/tiers', async(req,res)=>{
    let sheet = await db.all('SELECT nickname, role, points, orders FROM users ORDER BY points DESC LIMIT 10')
    res.json(sheet)
})

app.post('/admin', async(req,res)=>{
    console.log(req.body)
    if (req.body.nickname !== 'admin' || req.body.UID !== '1234567$') {res.json('you are not admin small boy btw:}'); return}

    if (req.body.type == 'addTarget') {
        let sheet = await db.prepare('INSERT INTO targets (name, link, status, reward, country, progress, subject) VALUES (?,?,?,?,?,?,?)')
        await sheet.run(req.body.name, req.body.link, req.body.status, req.body.reward, req.body.country, req.body.progress, req.body.subject)
        res.json({status: 200})
        } else if (req.body.type == 'approveProof') {
            let data = db.run('UPDATE users SET points = points + ? WHERE nickname = ?', [req.body.points, req.body.nicknameUser])
            console.log(`admin approved proof, nickname: ${req.body.nickname}, points: ${req.body.points}`)
            res.json({status: 200})
        } else if(req.body.type == 'sendMsg') {
            let sheet = await db.prepare('INSERT INTO messages (headText, footText) VALUES (?, ?)', [req.body.msgHeadText, req.body.msgFooterText])
            console.log(req.body)
            await sheet.run()
            res.json({status: 200})
        }
})

app.get('/messages', async(req,res)=>{
    let sheet = await db.all('SELECT * FROM messages')
    res.json(sheet)
})

app.post('/preSendProof', async(req,res)=>{
    let data = await db.get('SELECT * FROM users WHERE UID = ? and nickname = ?', [req.body.UID, req.body.nickname])
    if (data == null) {res.sendStatus(298); return}
    res.sendStatus(200)
})

app.post('/sendProof', multerHueta.single('file'), async(req,res)=>{
    console.log(req.file)

    let userData = JSON.parse(req.body.userData)
    let nickname = userData.nickname
    let UID = userData.UID

    let data = await db.get('SELECT * FROM users WHERE UID = ? and nickname = ?', [UID, nickname])
    if (data == null) {res.sendStatus(298); return}

    let formDataHuina = new FormData()

    let blobZalupaSrteam = await fs.openAsBlob(req.file.path)

    let fileType;
    req.file.mimetype == 'video/mp4'? fileType = 'video' : fileType = 'photo'

    formDataHuina.append(fileType, blobZalupaSrteam, req.file.originalname)
    formDataHuina.append('caption', `${req.body.desc} - ${userData.nickname},  ${userData.UID}`)

    const proxyUrl = 'https:alo.acharbashi.info:4515';

    const agent = new HttpsProxyAgent(proxyUrl);

    formDataHuina.append('chat_id', '5662962785')

    try {
   const response = await fetch(`https://api.telegram.org/bot8693141080:AAHDcFn3NpwJOlV0vtbftW0EfeddsNyUacA/send${fileType}`, {
        method: 'POST',
        headers: {'Proxy-Authorization': 'eee9a4f23b1d768c04a8d7f39120ca5b6e626973636f7474692e79656b74616e65742e636f6d'},
        body: formDataHuina
       // agent: agent
   })

   let result = await response.json()

   console.log(result, pc.green('по идее дошло, на практике хз'))

   }catch(err) {
        console.log(pc.red('error'), err)
        res.sendStatus(299)
        return;
    }

    await fs.unlink(req.file.path, (err)=> {
        console.log(err)
    })

    res.sendStatus(200)
})

app.listen(3000, ()=>{
    0
})


