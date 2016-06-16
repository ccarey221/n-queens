/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

//{0:[], 1:[], n:2 }

window.findNRooksSolution = function(n) {
  var solution = new Board({n: n});
  for (var square = 0; square < n; square++) {
    if (!solution.hasRowConflictAt(square) && !solution.hasColConflictAt(square)) {
      solution.togglePiece(square, square);
    }
  }

  var endBoard = solution.makeArrayFromAttributes();
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(endBoard));
  return endBoard;
  // return solution.attributes[0];
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  if (n === 0) {
    return [];
  }


  var solution = new Board({n: n});
  var allPositions = [];  //[[0,0],[0,1]]
  for (var i = 0; i < n; i++) {
    for (var j = 0; j < n; j++) {
      allPositions.push([i, j]);
    }
  }

  var timeCapsule = [];

  //some kind of loop /recursive thingy
    //if i get to the end and pieceCount !== n then...
      //got back to lastItem and solution == lastItem.solution
      //skip previous queenPlacing location
      //place queen at new location with no conflicts
      //continue with get solution from new board layout
        //if i get to the end and still no solutions then
          // solution = 2 timeCapsules ago;

  var getSolution = function(index) {
    if (index < allPositions.length) {
      for (var i = index; i < allPositions.length; i++) {
        var row = allPositions[i][0];
        var col = allPositions[i][1];
        solution.togglePiece(row, col);
        if (solution.hasRowConflictAt(row) || solution.hasColConflictAt(col) || solution.hasMinorDiagonalConflictAt(solution._getFirstRowColumnIndexForMinorDiagonalOn(row, col)) || solution.hasMajorDiagonalConflictAt(solution._getFirstRowColumnIndexForMajorDiagonalOn(row, col))) {
          solution.togglePiece(row, col);
        } else {
          solution.togglePiece(row, col);
          var pieceCount = solution.getPieceCount(); //because the toggle above causes getPieceCount to return one fewer than is actually on the board
          timeCapsule[pieceCount] = {
            index: i,
            board: solution,
            reset: false
          };
          solution.togglePiece(row, col);
          if (solution.getPieceCount() === n) {
            return;
          }
        }
      }
      if (solution.getPieceCount() < n) {
        var queenCount = solution.getPieceCount();
        debugger;
        var lastPieceIndex = timeCapsule[queenCount - 1].index;
        var hasBeenReset = timeCapsule[queenCount - 1].reset;
        if (lastPieceIndex === ((n * n) - 1) || hasBeenReset) {
          timeCapsule.pop();
          queenCount--;
          if (queenCount < 0) {
            return;
          }
          //debugger;
          lastPieceIndex = timeCapsule[queenCount - 1].index;
        }
        solution = timeCapsule[queenCount - 1].board;
        timeCapsule[queenCount - 1].reset = true;
        getSolution(lastPieceIndex + 1);
      }
    }
  };

/*  var getSolution = function(start) {
    if (start < n) {  //check in range        
      console.log(solution);
      solution.togglePiece(0, start);
      for (var row = 0; row < n; row++) {
        for (var col = 0; col < n; col++) {
          if (!(col === start)) {
            solution.togglePiece(row, col);
            if (solution.hasRowConflictAt(row) || solution.hasColConflictAt(col) || solution.hasMinorDiagonalConflictAt(solution._getFirstRowColumnIndexForMinorDiagonalOn(row, col)) || solution.hasMajorDiagonalConflictAt(solution._getFirstRowColumnIndexForMajorDiagonalOn(row, col))) {
              solution.togglePiece(row, col);
            }
          }
        }
      }
      if (solution.getPieceCount() === n) {
        return;
      } else {
        solution = new Board({n: n});
        getSolution(start + 1);
      }
    }
  };*/
  getSolution(0);
  var endBoard = solution.makeArrayFromAttributes();
  console.log('Single solution for ' + n + ' queens:', JSON.stringify(endBoard));
  return endBoard;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
