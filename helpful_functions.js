var mouse_x = 0;
var mouse_y = 0;

const canvas = document.getElementById ("myCanvas");
const ctx = canvas.getContext ("2d");
const width = canvas.width;
const size = width/8;
const draw_size = 0.95*size;
const delta_size = (size-draw_size)/2;

const black_col = 0xd48c4c;
const white_col = 0xfccca4;
const possible_moves_col = 0xdc6464;
const possible_moves_outline_col = 0x222222;

function Calculate_Mouse_Pos (evt) {
	var rect = canvas.getBoundingClientRect ();
	var root = document.documentElement;

	mouse_x = Math.floor ((evt.clientX - rect.left - root.scrollLeft)/size);
    mouse_y = Math.floor ((evt.clientY - rect.top - root.scrollTop)/size);

	// if (mouse_x == 8)
	// 	mouse_x--;
	// if (mouse_y == 8)
	// 	mouse_y--;

}

function Draw_Rect (x, y, l, b, col) {
	ctx.beginPath ();
	ctx.fillStyle = col;
	ctx.fillRect(x,y,l,b);
	ctx.closePath ();
}

function hexa (hex, a) {
	//0xRRGGBB
	return ("rgba(" + (hex>>16).toString() + "," + (hex>>8 & 0xFF).toString() + "," + (hex & 0xFF).toString() + "," + a.toString() + ")");
}

function Index_Abs (x, y) {
	return (x + 8*y);
}

function Draw_Board () {
	var col_t;
	for (var i = 0; i < 8; i++) {
		for (var j = 0; j < 8; j++) {
			if ((i+j)%2 == 1) {
				col_t = hexa (black_col, 1);
			} else {
				col_t = hexa(white_col, 1);
			}
			Draw_Rect (i*size, j*size, size, size, col_t);
		}

	}
}

function Draw_Possible_Moves (block) {
	for (var i = 0; i < block.moves.length; i++) {
		Draw_Rect (block.moves[i].x*size, block.moves[i].y*size, size, size, hexa (possible_moves_outline_col, 1));

		Draw_Rect (block.moves[i].x*size + delta_size, block.moves[i].y*size + delta_size, draw_size, draw_size, hexa (possible_moves_col, 1));
	}
}

function Change_Cur_Block () {
	if (board[Index_Abs (mouse_x, mouse_y)] != null && board[Index_Abs (mouse_x, mouse_y)].col == cur_turn) {
		cur_block = board[Index_Abs (mouse_x, mouse_y)];
	} else {
		cur_block = null;
	}
}

function Get_Opposite_Col (col) {
	if (col == "white") {
		return "black";
	} else {
		return "white";
	}
}

function Is_King_In_Check (king_col) {
	if (king_col == "black") {
		return white_master.next.Can_Check_King (black_master.next)

	} else {
		return black_master.next.Can_Check_King (white_master.next)
	}
}
