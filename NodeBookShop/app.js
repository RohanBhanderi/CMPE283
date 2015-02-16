var express = require('express')
var bookservice = require('./routes/bookservice')

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(app.router);

//Book Service Routes
app.get('/', bookservice.showAllBooks);
app.get('/books', bookservice.showAllBooks);
app.get('/book/:bookId', bookservice.getBook);
app.post('/addBook', bookservice.addBook);
app.delete('/book/:bookId', bookservice.deleteBook);

app.listen(app.get('port'), function(){
  console.log('Node server listening on port ' + app.get('port'));
});
