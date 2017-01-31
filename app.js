var express = require('express');
var app = express();

var http = require('http').Server(app);
var io = require('socket.io')(http);

var ejs = require('ejs'),
	xssFilters = require('xss-filters'); 

app.use(express.static('public'));
app.set('view engine', 'ejs');

/*
 * ホームページ
 */
app.get('/', function(req, res){
	res.render('index', {
		title: 'chatapp'
	});
});

/*
 * Socket.ioが接続されたときの処理
 */
io.on('connection', function(socket) {
	// イベントを登録
	// (client to server || server to client)
	socket.on('c_to_s', function(message) {
		if (message === '') { return false; }
		// メッセージをクライアントに返す	
		io.sockets.emit('s_to_c', xssFilters.inHTMLData(message));
		console.log('send: ' + message);
	});
});

/*
 * サーバー待ち受け状態
 */
http.listen(process.env.PORT || 3000, process.env.IP, function() {
	console.log('server listening...');
});
