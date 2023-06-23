const express = require('express')
const app = express()

const PORT = 3000

const cors = require('cors')
app.use(cors())

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())



let objectURL = {
    ultrakill: [['Home page', 'https://ultrakill.fandom.com/wiki/Home'],['V1', 'https://ultrakill.fandom.com/wiki/V1'],['Minos prime', 'https://ultrakill.fandom.com/wiki/Minos_Prime'], ['Gabriel', 'https://ultrakill.fandom.com/wiki/Gabriel']],
    doom: [['Archvile', 'https://doom.fandom.com/wiki/Arch-vile/Doom_Eternal'],['Mancubus', 'https://doom.fandom.com/wiki/Mancubus/Doom_Eternal'],['Khan Maykr', 'https://doom.fandom.com/wiki/Khan_Maykr']],
    wiki: [['wiki main page', 'https://www.wikipedia.org/'],['Mussolini 0_o', 'https://ru.wikipedia.org/wiki/%D0%9C%D1%83%D1%81%D1%81%D0%BE%D0%BB%D0%B8%D0%BD%D0%B8%2C_%D0%91%D0%B5%D0%BD%D0%B8%D1%82%D0%BE'],['Bob Ross', 'https://ru.wikipedia.org/wiki/%D0%A0%D0%BE%D1%81%D1%81,_%D0%91%D0%BE%D0%B1']],
    noLink: [['для этого ссылка не была создана', 'error! no link!']]
}

const keyWords = ['ultrakill', 'doom', 'wiki']



app.get('/', (req, res) => {
    res.send(`app is running on port ${PORT}!!!`)
})

app.post('/', (req,res)=>{
    let sentWord = req.body.text    
    if(keyWords.includes(sentWord)){        
        for(let i of Object.entries(objectURL)){
            if(i[0] == sentWord){
                res.send({
                    'links': i[1]
                })
                break
            }
        }
    } else {
        res.send({
            'links': objectURL.noLink
        })
    }

})

app.post('/links', (req,res)=>{
    var request = require('request');

    var URL = req.body.text;
    request(URL, function (err, resp, body) {
        if (err) throw err;
        res.send({"result": body})

    });
})


app.listen(PORT, () => {
    console.log(`app is running on port ${PORT}`)
})
