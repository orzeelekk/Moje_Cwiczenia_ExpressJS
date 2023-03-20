//app.js
import express from "express";
//mus byc calc.js!
import { router as calc } from './calc.js';
import { router as  converter } from './converter.js'
const app = express();
app.use('/calc', calc);
app.use('/toPLN', converter);

const users = [];

for (let i = 1; i <= 10; i++) {
    users.push({
        id: i.toString(),
        email: `user_${i}@gmail.com`,
    });
}
console.log(users)

app.param("id", (req, res, next, id) => {
    const user = users.find((user) => user.id === id);
    if (!user) {
        const err = new Error("Nie znaleziono usera");
        err.status = "USER_NOT_FOUND";
        //potem po tym statusie nadamy error
        next(err);
    } else {
        req.user = user;
        next();
    }
});

app.get(
    "/user/info/:id",
    //wpisuje w adresie 3000/user/info/10 np.
    (req, res, next) => {
        if (Number(req.user.id) % 2 === 0) {
            next();
            //na app geta idzie
        } else {
            next("route");
            //route'a nie uzywam ale jest opcja/ taka specjalna sciezka wyjatku
        }
    },
    (req, res) => {
        res.send("ID JEST PARZYSTE!");
        //odczyt na postmanie
    }
);

app.get("/user/info/:id", (req, res, next) => {
    res.send("ID JEST NIEPARZYSTE!");
    //przekierowany odczyt na postmanie
});

app.get("/user/:id", (req, res) => {
    res.send(req.user);
});

app.use((err, req, res, next) => {
    if (err.status === "USER_NOT_FOUND") {
        res.status(500).send(err.message);
    } else {
        next(err);
    }
});

app.use((err, req, res, next) => {
    res.status(500).send("JAKIŚ INNY BŁĄD");
});

app.use((req, res,next) => {
    res.status(404).send("ADRES NIE ISTNIEJE");
});

app.listen(3000, () => {
    console.log("Ruszam");
});

