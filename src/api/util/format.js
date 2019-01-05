module.exports = {
    /**
     * 格式化res
     * @param success boolean
     * @param res Object
     * @returns {{success: boolean, result: Object}}
     */
    resJson: function (success, res) {
        let data = success ? {
            total: res.length,
            rows: res
        } : {
            errmsg: res
        };
        return {
            success: success,
            result: data
        };
    }
};