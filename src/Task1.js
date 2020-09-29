var list = [6,5,8,9,1,7];
var number = highestProduct(list);
console.log(number);

function highestProduct(list) {
    list.sort(function(a, b) {
        return a - b;
    });

    var max = list[list.length-1];
    var mid = list[list.length-2];
    var min = list[list.length-3];

    return max*mid*min
}