
var app = function() {
	'user strict';

	this.elm = {
		view: document.getElementById('view'),
		button: document.getElementById('button'),
		input: document.getElementById('message')
	};

	this.socketio();
}

app.prototype = {

	socketio: function() {
		var self = this;
		var socket = io();

		var msg = '';

		this.elm.button.addEventListener('click', function(e) {
			e.preventDefault();

			msg = self.elm.input.value;

			socket.emit('c_to_s', msg);

			self.elm.input.value = '';
		});

		socket.on('s_to_c', function(msg) {
			var p = document.createElement('p');
			p.innerHTML = msg
			self.elm.view.appendChild(p);
			// 自動スクロール
			document.getElementById("bottom").scrollIntoView(true)
		});

	}
}

new app();

