const express = require('express');
const app = express();
const port = 3007;
const db = require('./models')
const planRouter = require('./routes/plan');


app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/api/plans', planRouter);

db.sequelize.sync().then(() => {
app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});

});