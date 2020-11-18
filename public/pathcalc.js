const turf = require('@turf/turf')
let path = [
    [
        120.21853923797607,
        30.20793661397032
    ],
    [
        120.21911859512328,
        30.207955157798573
    ],
    [
        120.21954774856567,
        30.208066420694756
    ],
    [
        120.21967649459839,
        30.208381664884158
    ],
    [
        120.2194619178772,
        30.208585645880387
    ],
    [
        120.21905422210693,
        30.208548558457988
    ],
    [
        120.21860361099242,
        30.208678364375253
    ],
    [
        120.21821737289429,
        30.208863801102936
    ],
    [
        120.21776676177979,
        30.20903069385908
    ],
    [
        120.21787405014037,
        30.20925321709367
    ]
];

let info = {
    len: 0,
    parts: []
}

for (let i = 0; i < path.length - 1; i++) {
    let len = calculateDistance(path[i], path[i + 1])
    info.len += len;
    info.parts.push(info.len);
}

console.log(JSON.stringify(info));



function calculateDistance(s, e) {
    let start = turf.point(s);
    let end = turf.point(e);
    return turf.distance(start, end, { units: "meters" })
}


function getPoint(progress) {
    let t = info.len * progress;
    let lower_bound = findNearesIndex(t, info.parts);
    if (lower_bound === -1) {
        lower_bound = 0;
        let _internalProgress = t / (info.parts[0]);
        let xy1 = path[lower_bound ]
        let xy2 = path[lower_bound + 1];
        let x3 = xy2[0] * _internalProgress + (1 - _internalProgress) * xy1[0];
        let y3 = xy2[1] * _internalProgress + (1 - _internalProgress) * xy1[1];
        return [x3, y3]
    } else {
        let extra = t - info.parts[lower_bound];
        // console.log(t, lower_bound, extra);
        let _internalProgress = extra / (info.parts[lower_bound + 1] - info.parts[lower_bound]);
        let xy1 = path[lower_bound + 1]
        let xy2 = path[lower_bound + 2];
        let x3 = xy2[0] * _internalProgress + (1 - _internalProgress) * xy1[0];
        let y3 = xy2[1] * _internalProgress + (1 - _internalProgress) * xy1[1];

        return [x3, y3]
    }

}


function findNearesIndex(t, arr) {
    let l = 0, h = arr.length - 1;
    while (l <= h) {
        let m = (l + h) >> 1;
        if (arr[m] < t) {
            l = m + 1;
        } else if (arr[m] > t) {
            h = m - 1;
        } else {
            return m;
        }
    }

    return Math.min(l, h);
}

// let xx =findNearesIndex(364,info.parts);
// console.log(xx,info.parts[xx]);
// console.log(JSON.stringify(turf.point(getPoint(0.4))));


let features=[];
for(let j =0;j<=1;j+=0.1){
    features.push(JSON.stringify(turf.point(getPoint(j))));
}

console.log(features.join(","))