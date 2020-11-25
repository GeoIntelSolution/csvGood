const {
    Matrix,
    inverse,
    solve,
    linearDependencies,
    QrDecomposition,
    LuDecomposition,
    CholeskyDecomposition,
} = require('ml-matrix');
function cc(x1, x2, x3, x4, y1, y2, y3, y4) {
    let mm = new Matrix([
        [x1, -x2, 1, 0],
        [x2, x1, 0, 1],
        [x3, -x4, 1, 0],
        [x4, x3, 0, 1]
    ]);

    let inverseA = inverse(mm);
    let x = new Matrix([[y1], [y2], [y3], [y4]]);
    var B = inverseA.mmul(x);

    let a =B.get(0,0);
    let b =B.get(1,0);
    let c =B.get(2,0);
    let d =B.get(3,0);
    console.log(a);
    let r=Math.atan(b/a);
    k=Math.sqrt(a*a+b*b);
    let  res={
        k:k,
        alpha:r/Math.PI*180,
        dx:c,
        dy:d
    };
    console.log(res);
}

let s = Math.sqrt(2) / 2;
cc(1, 0, 0, 1, s, s, -s, s)