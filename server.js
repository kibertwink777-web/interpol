
express = require('express')
sqlite3 = require('sqlite3')

expressLimit = require('express-rate-limit')
const { json } = require('express')
const {open} = require('sqlite')
cors = require('cors')

app = express()

const limiter = expressLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 3 // limit each IP to 100 requests per windowMs
})

app.use(limiter)

app.use(cors())
app.use(express.json())
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

    await db.exec('CREATE TABLE IF NOT EXISTS targets (name TEXT, link TEXT, status TEXT, reward TEXT, description TEXT,country TEXT, progress INTEGER, subject TEXT)')

    await db.exec('CREATE TABLE IF NOT EXISTS users(nickname TEXT UNIQUE, UID TEXT, points INTEGER, create_time DATETIME DEFAULT CURRENT_TIMESTAMP)')

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
    try {
        let data = await db.prepare('INSERT INTO users(nickname, UID, points) VALUES (?,?,?)')
        await data.run(req.body.nickname, req.body.UID, 0)
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

app.listen(3000, ()=>{
    0
})


