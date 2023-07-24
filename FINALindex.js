
const dotenv = require(`dotenv`);
const express = require(`express`);
const hbs = require(`hbs`);
const bodyParser = require(`body-parser`);

const routes = require(`./routes/route`);
const db = require(`./models/db`);

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + './public'));

app.set(`view engine`, `hbs`);
hbs.registerPartials(__dirname + './views/partial');

dotenv.config();
port = process.env.PORT;
hostname = process.env.HOSTNAME;

app.use(express.static(`public`));
app.use(`/`, routes);

db.connect();

app.listen(port, hostname, function () {
    console.log(`Server is running at:`);
    console.log(`http://` + hostname + `:` + port);
});