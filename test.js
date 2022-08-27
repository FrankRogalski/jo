function merge(intervals) {
    if (intervals.length < 2) return intervals;
    intervals.sort((a, b) => a[0] - b[0]);
    const result = [];
    let previous = intervals[0];
    for (let i = 1; i < intervals.length; i += 1) {
        if (previous[1] >= intervals[i][0]) {
            previous = [previous[0], Math.max(previous[1], intervals[i][1])];
        } else {
            result.push(previous);
            previous = intervals[i];
        }
    }
    result.push(previous);
    return result;
};

function getHighlighting(searchTerm, value) {
    const reg = RegExp("(?=(" + searchTerm
        .trim()
        .replace(/[^\d\p{L}\s]/gu, "")
        .split(/\s+/g)
        .map(term => term.split("").join("[^\\d\\p{L}]*?"))
        .join("|") + "))", "guid");
    const ranges = merge(Array.from(value.matchAll(reg))
        .map(match => [match.index, match[1].length + match.index]));
    ranges.reverse();
    const result = [...value];
    for (const [start, end] of ranges) {
        result.splice(end, 0, "</em>");
        result.splice(start, 0, "<em>");
    }
    return result.join("");
}

console.log(getHighlighting("ab cd", "abcd"));

// let a = performance.now();
// for (let i = 0; i < 10000; i ++) {

//     getHighlighting("abc wr rs", "abcwrsab   &&&&c---wrsgsfrs");
// }
// let b = performance.now();
// console.log(b-a);