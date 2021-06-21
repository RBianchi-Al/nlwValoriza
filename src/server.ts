import express from 'express';


const app = express();
app.listen(3000, () => console.log("server is running"))


app.post('/', (req, res) => {
    return res.send('Olá NLW')
})
