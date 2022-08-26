function getHighlighting(searchTerm, value) {
    const reg = RegExp("(?=(" + searchTerm
        .trim()
        .replace(/[^\d\p{L}\s]/gu, "")
        .split(/\s+/g)
        .map(term => term.split("").join("[^\\d\\p{L}]*?"))
        .join("|") + "))", "guid");
    const matchedIndecies = Array.from(new Set(Array.from(value.matchAll(reg))
        .flatMap(match => [...Array(match[1].length).keys()]
            .map(i => i + match.index))));
    const result = [...value];
    if (matchedIndecies.length > 0) {
        matchedIndecies.sort((a, b) => b - a);
        matchedIndecies.reduce((lastIndex, index) => {
            if (index !== lastIndex - 1) {
                result.splice(lastIndex, 0, "<em>");
                result.splice(index + 1, 0, "</em>");
            }
            return index;
        }, result.length + 1);
        result.pop();
        result.splice(matchedIndecies[matchedIndecies.length - 1], 0, "<em>");
    }
    return result.join("");
}

console.log(getHighlighting("abc wr rs", "abcwrsab   &&&&c---wrsgsfrs"));

// let a = performance.now();
// for (let i = 0; i < 10000; i ++) {

//     getHighlighting("abc wr rs", "abcwrsab   &&&&c---wrsgsfrs");
// }
// let b = performance.now();
// console.log(b-a);