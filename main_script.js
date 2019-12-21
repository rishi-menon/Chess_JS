const canvas = document.getElementById ("myCanvas");
const ctx = canvas.getContext ("2d");
const width = canvas.width;
const size = width/8;

//black_master
//white_master should be the name

var black_master;
var white_master;
//point to king first as king cannot die.. so next pointer will never be null

//stores position of all pieces
//row 1 column 0 is stored at index 8
var board = [];

//stores the places that the other player can move
var possible_moves = [];

window.onload = function () {
	// canvas = document.getElementById ("myCanvas")
	//its a square so width = height

	fps = 20;
	setInterval (Fixed_Update, 1000/fps);

	// p = new Piece ("pawn", "white", 5, 1);
	board[27] = 1;

	q = new Piece ("bishop", "black", 4, 4);
	// p.Calculate_Moves_pawn ();

	//initialise board
	for (var i = 0; i < 64; i++) {
		board.push (null);
		possible_moves.push (0);
	}

	document.addEventListener ("keydown", function(evt) {
		// if (evt.keyCode == 32) {
		// 	//for debugging
		// 	delete cursor;
		// 	cursor = null;
		// }
		switch (evt.keyCode ) {
			//w
			case 87:
				q.y--;
				break;
				//a
			case 65:
				q.x--;
				break;

			case 83:
				q.y++;
				break;
			case 68:
				q.x++;
				break;
		}
		q.moves.length = 0;
		q.Calculate_Moves ();
		console.log(q.moves);
	})
}

function Fixed_Update () {

	ctx.clearRect (0, 0, width, width);

	//draw board
	var col_t = "black";
	for (var i = 0; i < 8; i++) {
		for (var j = 0; j < 8; j++) {
			Draw_Rect (i*size, j*size, size, size, col_t);

			if (col_t == "white") {
				col_t = "black";
			} else {
				col_t = "white";
			}

		}
		if (col_t == "white") {
			col_t = "black";
		} else {
			col_t = "white";
		}

	}
	//draw block
	for (var i = 0; i < 8; i++) {
		for (var j = 0; j < 8; j++) {
			if (board[i*8 +j] != null) {
				Draw_Rect (j*size, i*size, size, size, "rgba(0,0,255,0.5)");
			}
		}
	}

	//draw possible moves
	Draw_Rect (q.x*size, q.y*size, size, size, "rgba(0,255,0, 0.5)");
	for (var i = 0; i < q.moves.length; i++) {
		Draw_Rect (q.moves[i].x*size, q.moves[i].y*size, size, size, "rgba(255,0,0,0.5)");
	}

	q.Draw ();
}

function Draw_Rect (x, y, l, b, col) {
	ctx.beginPath ();
	ctx.fillStyle = col;
	ctx.fillRect(x,y,l,b);
	ctx.closePath ();
}
