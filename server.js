const express = require("express");
const app = express();
const bcrypt = require('bcrypt');
const bodyParser = require("body-parser");

const users = [];

// Middleware
app.use(bodyParser.json());

app.get('/users', (req, res) => {
    res.json(users);
});

app.post('/users', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const user = {
            name: req.body.name,
            password: hashedPassword
        };
        users.push(user);
        res.status(201).send();
    } catch (error) {
        res.status(500).send();
    }
});

app.post('/users/login', async (req, res) => {
    const user = users.find(user => user.name === req.body.name);
    if (user == null) {
        return res.status(400).json({ error: 'Cannot find user' });
    }

    try {
        if (await bcrypt.compare(req.body.password, user.password)) {
            res.json({ message: 'Success' });
        } else {
            res.json({ message: 'Not allowed' });
        }
    } catch (error) {
        res.status(500).send();
    }
});

// Start the server
app.listen(3000, () => {
    console.log('Server is listening on port 3000');
});
