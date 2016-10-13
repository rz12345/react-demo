class ArrayHelper {
    /**
     * 將陣列 haystack 依照 colNum 切成二維陣列
     *
     * @param haystack
     * @param colNum
     * @returns {Array}
     */
    static splitArray2D(haystack, colNum) {
        var result = [];
        var rowNum = Math.ceil(haystack.length / colNum); // 無條件進位
        for (var i = 0; i < rowNum; i++) {
            // 第一階 array
            result[i] = [];
            for (var j = 0; j < colNum; j++) {
                // 第二階 array
                var idx = (i * colNum) + j;
                if (haystack[idx])
                    result[i].push(haystack[idx]);
            }
        }
        return result;
    };
}

module.exports = ArrayHelper;
