const format = require('./util/format.js');
const handler = require('./util/mysqlHandler.js');

function summoner(router) {
    // 获取所有技能
    router.get('/api/summoner/getList', (req, res) => {
        handler.exec({
            sql: 'select * from summoner',
            success: (r) => {
                res.json(format.resJson(true, r));
            }
        });
    });
}

module.exports = summoner;