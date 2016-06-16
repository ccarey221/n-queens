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

  // var timeCapsule = {
  //   0:{
  //     col: 0,
  //     row: 0,
  //     solution: { Board };
  //   },

  //   1: {
  //     col: 2,
  //     row, 1,
  //     solution; { Board };
  //   },

  //   2: {
  //     col: 4,
  //     row, 2,
  //     solution; { Board };
  //   },

  //   1: {
  //     col: 2,
  //     row, 1,
  //     solution; { Board };
  //   },
  //   ...

  //   5: {
  //     index: 12,
  //     solution: {Board},
  //   }
  // };

  //some kind of loop /recursive thingy
    //if i get to the end and pieceCount !== n then...
      //got back to lastItem and solution == lastItem.solution
      //skip previous queenPlacing location
      //place queen at new location with no conflicts
      //continue with get solution from new board layout
        //if i get to the end and still no solutions then
          // solution = 2 timeCapsules ago;

  var getSolution = function(start) {
    if (start < n) {  //check in range        
      console.log(solution);
      solution.togglePiece(0, start);
      //for (..iterate through allSolutions) {
        col = allPositions[i][1];
        row = allPositions[i][0];
      }

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
  };
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
