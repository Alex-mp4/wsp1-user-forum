const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const session = require('express-session');
const mysql = require('mysql2');
var validator = require('validator');
const { response } = require('express');
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
});
const promisePool = pool.promise();

module.exports = router;

router.get('/', async function (req, res, next) {
    const [rows] = await promisePool.query("SELECT adh31forum.*, adh31users.name FROM adh31forum JOIN adh31users WHERE adh31forum.authorId = adh31users.id ORDER BY createdAt DESC");
    res.render('index.njk', {
        rows: rows,
        title: 'Forum',
        login: req.session.login || false
    });
});

router.get('/navigation', async function (req, res, next) {
    res.render('navigation.njk', {
        title: 'Nav',
        login: req.session.login || false
    });
});

router.get('/post/:id', async function (req, res, next) {
    const [rows] = await promisePool.query("SELECT adh31forum.*, adh31users.name AS username, adh31users.picture AS picture FROM adh31forum JOIN adh31users ON adh31forum.authorId = adh31users.id WHERE adh31forum.id = ?;", [req.params.id]);
    console.log(rows)
    res.render('post.njk', {
        post: rows[0],
        title: 'Forum',
        login: req.session.login || false
    });
});

router.post('/new', async function (req, res, next) {
    const {title, content } = req.body;

    const errors = [];

    if (!title) errors.push('Title is required');
    if (!content) errors.push('Content is required');
    if (title && title.length <= 3)
        errors.push('Title must be at least 3 characters');
    if (content && content.length <= 10)
        errors.push('Content must be at least 10 characters');

    if (errors.length === 0) {
        // sanitize title och body, tvätta datan
        const sanitize = (str) => {
            let temp = str.trim();
            temp = validator.stripLow(temp);
            temp = validator.escape(temp);
            return temp;
        };
        if (title) sanitizedTitle = sanitize(title);
        if (content) sanitizedContent = sanitize(content);
    } else {
        return res.json(errors);
    }

    // Skapa en ny författare om den inte finns men du behöver kontrollera om användare finns!
    let [user] = await promisePool.query('SELECT * FROM adh31users WHERE id = ?', [req.session.userid]);
    if (!user) {
        user = await promisePool.query('INSERT INTO adh31users (name) VALUES (?)', [req.session.userid]);
    }

    // user.insertId bör innehålla det nya ID:t för författaren

    const userId = user.insertId || user[0].id;

    // kör frågan för att skapa ett nytt inlägg
    const [rows] = await promisePool.query('INSERT INTO adh31forum (authorId, title, content) VALUES (?, ?, ?)', [userId, sanitizedTitle, sanitizedContent]);
    res.redirect('/'); // den här raden kan vara bra att kommentera ut för felsökning, du kan då använda tex. res.json({rows}) för att se vad som skickas tillbaka från databasen
});

router.get('/new', async function (req, res, next) {
    const [users] = await promisePool.query("SELECT * FROM adh31users");
    if (req.session.login == true) {
        res.render('new.njk', {
            title: 'Nytt inlägg',
            users,
            login: req.session.login || false
        });
    }
    else {
        res.redirect('/accessdenied')
    }
    
});

router.get('/login', async function (req, res, next) {
    // const [user] = await promisePool.query('SELECT * FROM dbusers');

    res.render('login.njk', { 
        title: 'Log',
        login: req.session.login || false
    });
});

router.get('/profile', async function (req, res, next) {


    if (req.session.login = true) {
        const [rows] = await promisePool.query("SELECT * FROM adh31forum WHERE authorId = ?", [req.session.userid]);
        res.render('profile.njk', { title: 'Profile', name: req.session.username, rows: rows, login: req.session.login || false })
    }
    else {
        res.redirect('/accessdenied')
    }

});

router.post('/profile', async function (req, res, next) {
    req.body = { logout };


});

router.get('/user/:id', async function (req, res, next) {
    const [rows] = await promisePool.query("SELECT * FROM adh31forum WHERE authorId = ?", [req.params.id]);
    const [name] = await promisePool.query("SELECT name FROM adh31users WHERE id = ?", [req.params.id]);
    const [img] = await promisePool.query("SELECT picture FROM adh31users WHERE id = ?", [req.params.id]);
    console.log(name[0]) //undefined
        res.render('user.njk', {
        title: 'User',
        rows: rows,
        name: name[0],
        img: img[0],
        login: req.session.login || false
    });
});

router.post('/user/:id', async function (req, res, next) {

});

router.get('/logout', async function (req, res, next) {

    res.render('logout.njk', { title: 'Logout', login: req.session.login || false });
    req.session.login = false;
});

router.post('/logout', async function (req, res, next) {

    // if (req.session.login === 1) {
    //     req.session.login = 0;
    //     res.redirect('/')
    // }
    // else {
    //     return res.status(401).send('Access denied')
    // }

});

router.post('/login', async function (req, res, next) {
    const { username, password } = req.body;
    const [users] = await promisePool.query('SELECT * FROM adh31users WHERE name = ?', [username]);


    if (username.length == 0) {
        return res.send('Username is Required')
    }
    if (password.length == 0) {
        return res.send('Password is Required')
    }

    const [user] = await promisePool.query('SELECT * FROM adh31users WHERE name = ?', [username]);

    if (user.length > 0) {
        bcrypt.compare(password, user[0].password, function (err, result) {
            //logga in eller nåt
    
            if (result === true) {
                // return res.send('Welcome')
                req.session.username = username;
                req.session.login = true;
                req.session.userid = users[0].id;
                return res.redirect('/profile');
            }
    
            else {
                return res.redirect('/login')
            }
    
        })
    } else {
        return res.redirect('/login')
    }
    


});

router.get('/crypt/:password', async function (req, res, next) {
    const password = req.params.password
    // const [password] = await promisePool.query('SELECT password FROM dbusers WHERE none = ?', [password]);
    bcrypt.hash(password, 10, function (err, hash) {
        return res.json({ hash });

    })
});

router.get('/register', function (req, res, next) {
    res.render('register.njk', { title: 'register', login: req.session.login || false });

});

router.post('/register', async function (req, res, next) {
    const { username, password, passwordConfirmation } = req.body;

    if (username === "") {
        console.log({ username })
        return res.send('Username is Required')

    }
    else if (password.length === 0) {
        return res.send('Password is Required')
    }
    else if (passwordConfirmation.length === 0) {
        return res.send('Password is Required')
    }
    else if (password !== passwordConfirmation) {
        return res.send('Passwords do not match')
    }

    const [user] = await promisePool.query('SELECT name FROM adh31users WHERE name = ?', [username]);
    console.log({ user })

    if (user.length > 0) {
        return res.send('Username is already taken')
    } else {
        bcrypt.hash(password, 10, async function (err, hash) {
            const [creatUser] = await promisePool.query('INSERT INTO adh31users (name, password) VALUES (?, ?)', [username, hash]);
            res.redirect('/login')
        })
    }

});

router.get('/delete', async function (req, res, next) {

    res.render('delete.njk', { title: 'Delete', login: req.session.login || false });

});

router.post('/delete', async function (req, res, next) {
    const { password } = req.body;
    if (req.session.login === true) {
        const [Delet] = await promisePool.query('DELETE FROM adh31users WHERE password = ?', [password]);
        req.session.login = false
        res.redirect('/')
    }
});

router.get('/accessdenied', async function (req, res, next) {

    res.render('accessdenied.njk', { title: 'Access Denied', login: req.session.login || false });

});
