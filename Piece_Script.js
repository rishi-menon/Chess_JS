//for enpasse
var pawn_moved = false;
var king_check = false;

function Index_Abs (x, y) {
	return (x*8 + y);
}

function Piece (type, col, x, y) {
	// master
	// pawn
	// rook
	// horse
	// bishop
	// queen
	// king

	if (type != "master") {
		//stores the x,y index on the board
		this.x = x;
		this.y = y;
		this.img = new Image;
		this.img.src = "Pieces/" + type + "_" + col + ".png";
		console.log(this.img.src);

		this.has_moved = false;
		this.moves = [];
	}
	this.col = col;
	this.type = type;
	this.next = null;
	this.prev = null;
}

Piece.prototype.Delete = function () {
	// board[this.x*8 + this.y] = null;
	this.prev.next = this.next;
	this.next.prev = this.prev;
	delete this.img;
}

Piece.prototype.Draw = function () {
	//draw all
	ctx.drawImage (this.img, this.x*size, this.y*size, size, size);

	if (this.next != null) {
		this.next.Draw ();
	}
}

//returns 1D array index of a block (x,y) positions relative to this
Piece.prototype.Index = function (x, y) {
	return (this.x+x)*8 + (this.y+y);
}
//pushes (x,y) position relative to this object to this.possible moves
Piece.prototype.Push_rel = function (x, y) {
	this.moves.push ({x:(this.x+x), y:(this.y + y)});
}
Piece.prototype.Push_Abs = function (x, y) {
	this.moves.push ({x:x, y:y});
}
//returns if the relative position (x,y) is on the board or not
Piece.prototype.Is_Valid_Pos = function (x,y) {
	return (this.x+x < 8) && (this.x+x > -1) && (this.y+y<8) &&(this.y+y>-1);
}

//for debugging
Piece.prototype.Print = function () {
		console.log(this);
}

//for debugging
Piece.prototype.Print_Type = function () {
	switch (this.type) {
		case "pawn":
			console.log("pawn");
			break;
		case "rook":
			console.log("rook");
			break;
		case "horse":
			console.log("horse");
			break;
		case "bishop":
			console.log("bishop");
			break;
		case "queen":
			console.log("queen");
			break;
		case "king":
			console.log("king");
			break;
	}
}

//returns true if some piece of a player is present at x,y pos
// Piece.prototype.Piece_Is_Here = function (x, y) {
// 	if (this.x == x && this.y == y) {
// 		return true;
// 	}
//
// 	if (this.next != null) {
// 		this.next.Piece_Is_Here (x, y);
// 	} else {
// 		return false;
// 	}
// }

// //returns true if some piece of the player can move to position x,y
// Piece.prototype.Piece_Can_Move_Here = function (x_pos, y_pos) {
// 	//linear search through elements in moves
// 	var len = this.moves.length;
// 	for (var i = 0; i < len; i++) {
// 		if (this.moves[i].x == x_pos && this.moves[i].y == y_pos) {
// 			return true;
// 		}
// 	}
// 	if (this.next != null) {
// 		this.next.Piece_Can_Move_Here (x_pos, y_pos);
// 	} else {
// 		return false;
// 	}
// }

///////////////////////////////////////////////////////////////////////////////
//calculate moves for individual pieces

Piece.prototype.Calculate_Moves_pawn = function () {
	//add front moves if there is no obstruction
	var mult = 1;
	if (this.col == "white") {
		mult = -1;
	}

	if (board[this.Index(0, mult)] == null) {
		this.Push_rel (0, mult);

		//checkl for obstruction to add the initial two space move
		if (!this.has_moved && board[this.Index (0, mult*2)] == null)
			this.Push_rel (0, mult*2);
	}

	//add diagnol moves
	if (this.x < 7 && board[this.Index (1, mult)] != null) {
		if (board[this.Index (1, mult)].col != this.col)
			this.Push_rel (1, mult);
	}

	if (this.x > 0 && board[this.Index (-1, mult)] != null) {
		if (board[this.Index (-1, mult)].col != this.col)
			this.Push_rel (-1, mult);
	}

	//add enpasse----- UGHHH WHYYY.... So much work :(

}

Piece.prototype.Calculate_Moves_rook = function () {
	//ROW, RIGHT of position
	for (var i = this.x+1; i < 8; i++) {

		if (board[Index_Abs (i, this.y)] == null) {
			this.Push_Abs (i, this.y);
		} else {
			break;
		}
	}
	//ROW, LEFT of position
	for (var i = this.x-1; i > -1; i--) {
		if (board[Index_Abs (i, this.y)] == null) {
			this.Push_Abs (i, this.y);
		} else {
			break;
		}
	}

	//Col, down of position
	for (var i = this.y+1; i < 8; i++) {
		if (board[Index_Abs (this.x, i)] == null) {
			this.Push_Abs (this.x, i);
		} else {
			break;
		}
	}
	//Col, up of position
	for (var i = this.y-1; i > -1; i--) {
		if (board[Index_Abs (this.x, i)] == null) {
			this.Push_Abs (this.x, i);
		} else {
			break;
		}
	}

}

Piece.prototype.Calculate_Moves_horse = function () {
	//check top
	if (this.Is_Valid_Pos (1, -2)) {
		this.Push_rel (1, -2);
	}
	if (this.Is_Valid_Pos (-1, -2)) {
		this.Push_rel (-1, -2);
	}
	//check down
	if (this.Is_Valid_Pos (1, 2)) {
		this.Push_rel (1, 2);
	}
	if (this.Is_Valid_Pos (-1, 2)) {
		this.Push_rel (-1, 2);
	}
	//chec left
	if (this.Is_Valid_Pos (-2, 1)) {
		this.Push_rel (-2, 1);
	}
	if (this.Is_Valid_Pos (-2, -1)) {
		this.Push_rel (-2, -1);
	}
	//check right
	if (this.Is_Valid_Pos (2, 1)) {
		this.Push_rel (2, 1);
	}
	if (this.Is_Valid_Pos (2, -1)) {
		this.Push_rel (2, -1);
	}
}

Piece.prototype.Calculate_Moves_bishop = function () {

	//North West diagonal
	var min = Math.min (this.x, this.y);
	for (var i = 1; i <= min; i++) {

		if (board[this.Index (-i, -i)] == null) {
			this.Push_rel (-i, -i);
		} else {
			break;
		}
	}

	//North East diagonal
	min = Math.min (7-this.x, this.y)
	for (var i = 1; i <= min; i++) {
		if (board[this.Index (i, -i)] == null) {
			this.Push_rel (i, -i);
		} else {
			break;
		}
	}

	//South West
	min = Math.min (this.x, 7- this.y);
	for (var i = 1; i <= min; i++) {
		if (board[this.Index (-i, i)] == null) {
			this.Push_rel (-i, i);
		} else {
			break;
		}
	}
	//Col, up of position
	min = Math.min (7 - this.x, 7 - this.y);
	for (var i = 1; i <= min; i++) {
		if (board[this.Index (i, i)] == null) {
			this.Push_rel (i, i);
		} else {
			break;
		}
	}
}

Piece.prototype.Calculate_Moves_queen = function () {
	this.Calculate_Moves_rook ();
	this.Calculate_Moves_bishop ();
}

Piece.prototype.Calculate_Moves_king = function () {

	for (var dy = -1; dy <= 1; dy++) {
		for (var dx = -1; dx <= 1; dx++) {
			if (!dx && !dy)
				continue;
			if (this.Is_Valid_Pos(dx,dy) && board[this.Index (dx, dy)] == null)
				this.Push_rel (dx, dy);

		}
	}

	//implement castlingggg
}

Piece.prototype.Calculate_Moves = function () {
	//clears array
	this.moves.length = 0;
	eval ("this.Calculate_Moves_" + this.type + "()");
}
