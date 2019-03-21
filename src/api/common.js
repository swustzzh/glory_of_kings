const format = require(`./util/format.js`);
const handler = require(`./util/mysqlHandler.js`);
const axios = require('axios');

function common(router) {
    // 插入一条访问记录
    router.get('/api/common/visit', (req, res) => {
        const agent = decodeURIComponent(req.query.agent) || 'unknown device';
        handler.exec({
            sql: `insert into visits (ip,agent,time) values (?,?,?)`,
            params: [req.connection.remoteAddress, agent, new Date().getTime()],
            success: r => {
                res.json({
                    success: true
                });
            }
        });
    });

    // 获取总访问次数
    router.get('/api/common/visit_count', (req, res) => {
        handler.exec({
            sql: 'select count(*) as num from visits',
            success: r => {
                res.json({
                    success: true,
                    result: r[0].num
                });
            }
        });
    });

    // 获取最新周免英雄
    router.get('/api/common/getweek', (req, res) => {
        // 记录访问设备
        const agent = req.headers["user-agent"] || "unknown device";
        let arr = req.connection.remoteAddress.split(':');
        const ip = arr[arr.length - 1];
        handler.exec({
            sql: `insert into visits (ip,agent,time) values (?,?,?)`,
            params: [ip, agent, new Date().getTime()]
        });
        let url = 'https://pvp.qq.com/web201605/js/herolist.json';
        axios.get(url).then(r => {
            let rows = [];
            JSON.parse(r.data.substr(1)).forEach(it => {
                if (it.pay_type === 10) {
                    rows.push({
                        hero_id: it.ename,
                        name: it.cname,
                        img_url: `http://game.gtimg.cn/images/yxzj/img201606/heroimg/${it.ename}/${it.ename}.jpg`
                    });
                }
            });
            res.json(format.resJson(true, rows));
        });
    });

}

module.exports = common;
