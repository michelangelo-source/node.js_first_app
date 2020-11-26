var express = require("express")
var app = express()
const PORT = process.env.PORT || 3000;
var path = require("path")
var bodyParser = require("body-parser");
const { table } = require("console");
app.use(express.static('static'))
app.use(bodyParser.urlencoded({ extended: true }));
login = false
mozna = 1
users = [
    {
        id: 1,
        login: 'Test1',
        password: 'test',
        wiek: '11',
        uczen: 'checked',
        plec: 'M'
    }
]
app.all("/sort", function (req, res) {
    main = ""
    if (login == true) {
        main = '<head>' + '<style>* {margin: 0; padding: 0;}  a:link, a:visited {color:white; text-decoration: underline;font-size: 20px;float: left;display: flex;align-items:center;padding:10px 0 0 20px;}body{background-color:darkcyan;}td{border:1px solid yellow;height:30px;width:200px; display: flex; align-items:center; float:left; margin-left:10px;} input{margin-left: 10px;} </style>' + '</head>'
        main += "<body>" + '<a href="/sort">sort</a>' + '<a href="/gender">gender</a>' + '<a class="admin" href="/show">show</a>' + "<body>"
        main += '<br>'
        main += '<br>'
        main += '<br>'
        users.sort(function (x, y) {
            return parseFloat(x.wiek) - parseFloat(y.wiek)
        })
        if (req.body.sort == "1") {
            main += '<form onchange="this.submit()" method="POST" >'
            main += '<input type="radio" value="1" name="sort" id="rosnaco" checked >'
            main += '<label for="sort">rosnąco</label>'
            main += '<input type="radio" value="2" name="sort" id="malejaco" >'
            main += '<label for="sort">malejąco</label>'
            main += '</form>'
            main += '<br>'
            main += '<br>'
            main += '<table>'
            for (let i = 0; i < users.length; i++) {
                main += "<tr>"
                main += "<td> ID:" + users[i].id + "</td>"
                main += "<td> USER:" + users[i].login + "-" + users[i].password + "</td>"
                main += "<td> WIEK:" + users[i].wiek + "</td>"
                main += "</tr>"
            }
        } else {
            main += '<form onchange="this.submit()" method="POST" >'
            main += '<input type="radio" value="1" name="sort" id="rosnaco"  >'
            main += '<label for="sort">rosnąco</label>'
            main += '<input type="radio" value="2" name="sort" id="malejaco" checked>'
            main += '<label for="sort">malejąco</label>'
            main += '</form>'
            main += '<br>'
            main += '<br>'
            main += '<table>'
            for (let i = users.length - 1; i >= 0; i--) {
                main += "<tr>"
                main += "<td> ID:" + users[i].id + "</td>"
                main += "<td> USER:" + users[i].login + "-" + users[i].password + "</td>"
                main += "<td> WIEK:" + users[i].wiek + "</td>"
                main += "</tr>"
            }
        }
        main += "</table>"
        res.send(main)
    } else {
        res.send("musisz być zalogowany")
    }
})
app.get("/gender", function (req, res) {
    main = ""
    kobiet = ""
    facet = ""
    users.sort(function (x, y) {
        return parseFloat(x.id) - parseFloat(y.id)
    })
    if (login == true) {
        main = '<head>' + '<style>* {margin: 0; padding: 0;}  a:link, a:visited {color:white; text-decoration: underline;font-size: 20px;float: left;display: flex;align-items:center;padding:10px 0 0 20px;}body{background-color:darkcyan;}td{border:1px solid yellow;height:30px;width:200px; display: flex; align-items:center; float:left; margin-left:10px;}   </style>' + '</head>'
        main += "<body>" + '<a href="/sort">sort</a>' + '<a href="/gender">gender</a>' + '<a class="admin" href="/show">show</a>' + "<body>"
        main += '<br>'
        main += '<br>'
        main += '<br>'
        main += '<br>'

        for (let i = 0; i < users.length; i++) {
            if (users[i].plec == "K") {
                kobiet += i
            } else {
                facet += i
            }
        }
        main += '<table>'
        for (let i = 0; i < kobiet.length; i++) {
            main += "<tr>"
            main += "<td> ID:" + users[kobiet[i]].id + "</td>"
            main += "<td> PŁEĆ:" + users[kobiet[i]].plec + "</td>"
            main += "</tr>"
        }
        main += "</table>"
        main += '<br>'
        main += '<br>'
        main += '<br>'
        main += '<br>'
        main += '<table>'
        for (let i = 0; i < facet.length; i++) {
            main += "<tr>"
            main += "<td> ID:" + users[facet[i]].id + "</td>"
            main += "<td> PŁEĆ:" + users[facet[i]].plec + "</td>"
            main += "</tr>"
        }
        main += "</table>"
        res.send(main)
    } else {
        res.send("musisz być zalogowany")
    }
})
app.get("/show", function (req, res) {
    main = ""

    if (login == true) {
        users.sort(function (x, y) {
            return parseFloat(x.id) - parseFloat(y.id)
        })
        main = '<head>' + '<style>* {margin: 0; padding: 0;}  a:link, a:visited {color:white; text-decoration: underline;font-size: 20px;float: left;display: flex;align-items:center;padding:10px 0 0 20px;}body{background-color:darkcyan;}td{border:1px solid yellow;height:30px;width:200px; display: flex; align-items:center; float:left; margin-left:10px;}  </style>' + '</head>'
        main += "<body>" + '<a href="/sort">sort</a>' + '<a href="/gender">gender</a>' + '<a class="admin" href="/show">show</a>' + "<body>"
        main += '<br>'
        main += '<br>'
        main += '<br>'
        main += '<br>'
        main += '<table>'
        for (let i = 0; i < users.length; i++) {
            main += "<tr>"
            main += "<td> ID:" + users[i].id + "</td>"
            main += "<td> USER:" + users[i].login + "-" + users[i].password + "</td>"
            main += "<td>UCZEŃ:<input type='checkbox' disabled " + users[i].uczen + "></td>"
            main += "<td> WIEK:" + users[i].wiek + "</td>"
            main += "<td> PŁEĆ:" + users[i].plec + "</td>"
            main += "</tr>"
        }
        main += "</table>"
        res.send(main)
    } else {
        res.send("musisz być zalogowany")
    }
})

app.get("/", function (req, res) {
    console.log("ścieżka do katalogu głównego aplikacji: " + __dirname)
    res.sendFile((__dirname + "/static/index.html"))

})
app.get("/logout", function (req, res) {
    login = false
    res.redirect("/login")
})
app.get("/login", function (req, res) {
    console.log("ścieżka do logowania: " + __dirname)
    res.sendFile((__dirname + "/static/pages/login.html"))

})
app.post("/login", function (req, res) {
    login = false
    for (let i = 0; i < users.length; i++) {
        if (users[i].login == req.body.login && users[i].password == req.body.password) {
            login = true
            break;
        }
    }
    if (login == false) {
        res.send("błędne hasło lub login lub użytkownik o podanym loginie istnieje")
    } else {
        res.redirect("/admin")
    }
})
app.get("/admin", function (req, res) {
    if (login == true) {
        console.log("ścieżka do logowania: " + __dirname)
        res.sendFile((__dirname + "/static/pages/admintak.html"))
    } else {
        console.log("ścieżka do logowania: " + __dirname)
        res.sendFile((__dirname + "/static/pages/adminnie.html"))
    }
})
app.get("/register", function (req, res) {
    console.log("ścieżka do rejestracji: " + __dirname)

    res.sendFile((__dirname + "/static/pages/register.html"))

})
app.post("/register", function (req, res) {
    login = false
    for (let i = 0; i < users.length; i++) {
        if (users[i].login == req.body.login) {
            mozna = 0
            break;
        } else {
            mozna = 1
        }
    }
    uczen = ""
    if (mozna == 1) {
        console.log(req.body.uczen)
        if (req.body.uczen == "checked") {
            uczen = "checked"
        } else {
            uczen = ""
        }
        users.push({ id: users.length + 1, login: req.body.login, password: req.body.password, wiek: req.body.wiek, uczen: uczen, plec: req.body.plec })
        res.send("witaj " + req.body.login + " jesteś zarejestrowany")
    } else {
        res.send("użytkownik o podanym loginie istnieje")
    }
})
app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT)
})
