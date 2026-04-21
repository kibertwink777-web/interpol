
express = require('express')
sqlite3 = require('sqlite3')
const { json } = require('express')
const {open} = require('sqlite')
cors = require('cors')

app = express()

app.use(cors())
app.use(express.json())
app.use((req, res, next) => {
    // Разрешаем любому сайту (origin) делать к нам запросы
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
});

async function pizda() {
    db = await open({
        filename: 'firstDB',
        driver: sqlite3.Database
    })

    //await db.exec('DROP TABLE IF EXISTS users')

    await db.exec('CREATE TABLE IF NOT EXISTS users (name TEXT, link TEXT, status TEXT, reward TEXT)')
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
    let sheet = await db.prepare('SELECT * FROM users')
    data = await sheet.all()
    res.json(data)
})

app.listen(3000, ()=>{
    0
})


