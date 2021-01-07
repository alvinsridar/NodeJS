//merge elements of an array into a single element
function mergeElements(arrayToMerge) {
    let mergedArray = [];
    for (let i = 0; i < arrayToMerge.length; i++) {
        mergedArray += arrayToMerge[i];
    }
    return mergedArray;
};

module.exports = mergeElements;