import express from "express";

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  // error handling logic
  console.log(err);
  res.status(400).send('Bad request');
});

// require('./routes/index.js').default(app);

if (isProduction) {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client/build/index.html'));
  });
};

connect().then(() => {
    console.log('DB is connected');
    app.listen(port, () => {
        console.log('Server is up with express on port: ', port);
    });
});