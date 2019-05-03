const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const database = {
    users: [
        {
            id: '123',
            name: 'Chandler',
            email: "chandler@gmail.com",
            entries: 0,
            joined: new Date(),
            password: 'cookies'
        },
        {
            id: '1234',
            name: 'Kenny',
            email: "Kennyr@gmail.com",
            entries: 0,
            joined: new Date(),
            password: 'bannanas'
        },
    ],
    login: [
        {
            id: 987,
            hash: '',
            email: 'chandler@gmail.com'
        }
    ]
}

app.get('/', (req, res) => {
    res.send(database.users)
});

app.post('/signin', (req, res) => {
      // Load hash from your password DB.
bcrypt.compare('cookies', '$2b$10$JesfCu03DYMNnfIs3eUju.RoxJAQ58KHc5HE5upat/5mAAKyv6U7y', function(err, res) {
   console.log('first guess', res)
});
bcrypt.compare('bacon', '$2b$10$JesfCu03DYMNnfIs3eUju.RoxJAQ58KHc5HE5upat/5mAAKyv6U7y', function(err, res) {
    console.log('second guess', res)
});
    
    if(req.body.email === database.users[0].email && 
        req.body.password === database.users[0].password) {
        res.json('success')
    } else {
        res.status(400).json('error loggin in')
    }
});


app.post('/register', (req, res) => {
    const {email, name, password} = req.body;
    bcrypt.hash(password, saltRounds, function(err, hash) {
        console.log(hash)
      });
    
    database.users.push({
            id: '125',
            name,
            email,
            password,
            entries: 0,
            joined: new Date(),
    })
    res.json(database.users[database.users.length-1]);
});

app.get('/profile/:id', (req, res) => {
    const {id} = req.params;
    let found = false;
    database.users.forEach(user => {
        if(user.id === id) {
            found=true;
             return res.json(user);
        } 
    })

    if(!found) {
        res.status(404).json('not found')
    }
});

app.post('/image', (req, res) => {
    const {id} = req.body;
    let found = false;
    database.users.forEach(user => {
        if(user.id === id) {
            found=true;
            user.entries++
             return res.json(user.entries);
        } 
    })

    if(!found) {
        res.status(404).json('not found')
    }
});




app.listen(3000, () => {
    console.log('app is running on port 3000')
});


/*

/ --> res = this is working

/signin ==> POST succes/fail

/register ==> POST = return new created user

/profile/:userID ==> GET = return user profile

/image ==> PUT ==> return updated user 



*/