var mongo = require('./mongo');

var Books = mongo.getBookModel();

function showAllBooks(req,res) {
	console.log("In showAllBooks");
	Books.find({},"-_id -__v",function(err, bookResults){
        if (!err) {
        	console.log(bookResults);
            res.writeHead(200,{"Content-type":"application/json"});
            res.end(JSON.stringify(bookResults));
            
        } else {
            console.log(err);
            res.writeHead(500,{"Content-type":"application/json"});
            res.end({"errors":err});
        }
    });
}

function getBook(req,res) {
	console.log("In getBook");
	var bookId = req.params.bookId;
    console.log("GET: " + bookId);
	Books.findOne({ bookId: bookId },"-_id -__v",function(err, bookResults){
        if (!err) {
        	console.log(bookResults);
            res.writeHead(200,{"Content-type":"application/json"});
            res.end(JSON.stringify(bookResults));
            
        } else {
            console.log(err);
            res.writeHead(500,{"Content-type":"application/json"});
            res.end({"errors":err});
        }
    });
}

function addBook(req,res) {
	console.log("POST: " + req.body.bookId);
    var bookDtls = {
    	bookId : req.body.bookId,
        bookName : req.body.bookName,
        bookAuther : req.body.bookAuther
    };
    var book = new Books(bookDtls);
    
    book.save(function (err) {
        if (!err) {
            console.log("Book added successfully !!");
			Books.findOne({ bookId: req.body.bookId },"-_id -__v",function(err, bookResults){
				if (!err) {
					console.log(bookResults);
					res.writeHead(201,{"Content-type":"application/json"});
					res.end(JSON.stringify(bookResults));
					
				} else {
					console.log(err);
					res.writeHead(500,{"Content-type":"application/json"});
					res.end({"errors":err});
				}
			});
        } else {
            console.log(err);
            res.writeHead(500,{"Content-type":"application/json"});
            res.end({"errors":err});
        }
    });
}

function deleteBook(req,res) {
    var bookId = req.param.bookId;
	console.log("DELETE: " + bookId);

	Books.find({ bookId : bookId }).remove(function (err) {
	  if (!err) {
			console.log("Document deleted successfully !!");
			res.writeHead(204,{"Content-type":"application/json"});
			res.end();
	  } else {
			console.log(err);
			res.writeHead(500,{"Content-type":"application/json"});
			res.end({"errors":err});
	  }
	});
}

exports.addBook=addBook;
exports.showAllBooks=showAllBooks;
exports.getBook=getBook;
exports.deleteBook=deleteBook;