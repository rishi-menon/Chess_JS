

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

//black: #d48c4c
//white: #fccca4

var cur_block = null;
var cur_turn = "white";

window.onload = function () {
	
	// fps = 20;
	//setInterval (Fixed_Update, 1000/fps);
	black_master = new Piece ("master", "black", -1, -1);
	white_master = new Piece ("master", "white", -1, -1);
	// q = new Piece ("bishop", "black", 4, 4);

	Initialise_Game  ();

	setTimeout (function() {
		Manual_Update ();
	}, 100);

	// Manual_Update ();

	canvas.addEventListener ("mousemove", Calculate_Mouse_Pos);

	canvas.addEventListener ("mousedown", function (evt) {
		// - check if empty
		// - if not check if its in moves_available
		// - else change block

		if (cur_block == null) {
			Change_Cur_Block ();
		} else if (cur_block.Search_Moves (mouse_x, mouse_y)) {
			cur_block.Move_Block (mouse_x, mouse_y);
			cur_block = null;
			Switch_Turn ();
		} else {
			Change_Cur_Block ();
		}
		console.log(cur_block);
		if (cur_block != null) {

			cur_block.Calculate_Moves ();
		}

		Manual_Update ();
	});

	// document.addEventListener ("keydown", function(evt) {
	// 		//for debugging
	// 		if (evt.keyCode == 32) {
	//
	// 		}
	// });
}



function Initialise_Game () {


	//initialise board
	board.length = 0;
	possible_moves.length = 0;
	for (var i = 0; i < 64; i++) {
		board.push (null);
		possible_moves.push (0);
	}
	//add black pieces
	black_master.Add_Block ("king", "black", 4, 0);
	black_master.Add_Block ("queen", "black", 3, 0);
	black_master.Add_Block ("rook", "black", 0, 0);
	black_master.Add_Block ("rook", "black", 7, 0);
	black_master.Add_Block ("horse", "black", 1, 0);
	black_master.Add_Block ("horse", "black", 6, 0);
	black_master.Add_Block ("bishop", "black", 2, 0);
	black_master.Add_Block ("bishop", "black", 5, 0);
	for (var i = 0; i < 8; i++) {
		black_master.Add_Block ("pawn", "black", i, 1);
	}

	//add white pieces

	white_master.Add_Block ("king", "white", 4, 7);
	white_master.Add_Block ("queen", "white", 3, 7);
	white_master.Add_Block ("rook", "white", 0, 7);
	white_master.Add_Block ("rook", "white", 7, 7);
	white_master.Add_Block ("horse", "white", 1, 7);
	white_master.Add_Block ("horse", "white", 6, 7);
	white_master.Add_Block ("bishop", "white", 2, 7);
	white_master.Add_Block ("bishop", "white", 5, 7);
	for (var i = 0; i < 8; i++) {
		white_master.Add_Block ("pawn", "white", i, 6);
	}
}

function Manual_Update () {

	ctx.clearRect (0, 0, width, width);

	//draw board
	Draw_Board ();

	//draw block
	// for (var i = 0; i < 8; i++) {
	// 	for (var j = 0; j < 8; j++) {
	// 		if (board[i*8 +j] != null) {
	// 			Draw_Rect (j*size, i*size, size, size, "rgba(0,0,255,0.5)");
	// 		}
	// 	}
	// }

	if (cur_block != null) {
		//draw possible moves
		Draw_Possible_Moves (cur_block);
	}

	black_master.next.Draw ();
	white_master.next.Draw ();

}
