const format = require(`./util/format.js`);
const handler = require(`./util/mysqlHandler.js`);

function equip(router) {
    // 获取所有装备类型
    router.get(`/api/equip/getTypes`, (req, res) => {
        handler.exec({
            sql: `select * from equip_type`,
            success: (r) => {
                res.json(format.resJson(true, r));
            }
        });
    });

    // 获取装备列表(名称，图片)
    router.get(`/api/equip/getList`, (req, res) => {
        let sql = `select equip_id, name, img_url from equip`;
        let type = req.query.equip_type;
        if (type) {
            sql += ` where type = ${type}`;
        }
        handler.exec({
            sql: sql,
            success: (r) => {
                res.json(format.resJson(true, r));
            }
        });
    });

    // 获取装备详情
    router.get(`/api/equip/getDetail`, (req, res) => {
        let id = req.query.equip_id;
        if (!id) {
            res.json(format.resJson(false, `equip_id不能为空`));
            return;
        }
        handler.exec({
            sql: `select * from equip where equip_id = ${id}`,
            success: (r) => {
                res.json({success: true, result: r[0]});
            }
        });
    });
}

module.exports = equip;