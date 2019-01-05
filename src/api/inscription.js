const format = require('./util/format.js');
const handler = require('./util/mysqlHandler.js');

function inscription(router) {
    // 获取所有铭文
    router.get(`/api/inscription/getList`, (req, res) => {
        let sql = 'select inscription_id,name,img_url from inscription';
        if (req.query.type) {
            // 暂时未加排序规则
            sql += ` where type = '${req.query.type}'`;
            if (req.query.grade) {
                sql += ` and grade = ${req.query.grade}`;
            }
        } else if (req.query.grade) {
            sql += ` where grade = ${req.query.grade}`;
        }
        handler.exec({
            sql: sql,
            success: (r) => {
                res.json(format.resJson(true, r));
            }
        });
    });

    // 获取铭文详情
    router.get(`/api/inscription/getDetail`, (req, res) => {
        let id = req.query.inscription_id;
        if (!id) {
            res.json({success: false, result: "铭文id不能为空"});
            return;
        }
        handler.exec({
            sql: `select * from inscription where inscription_id = ${id}`,
            success: (r) => {
                res.json({
                    success: true,
                    result: r[0]
                });
            }
        });
    });
}

module.exports = inscription;