const format = require(`./util/format.js`);
const handler = require(`./util/mysqlHandler.js`);

function hero(router) {
    // 获取英雄分类
    router.get(`/api/hero/getTypes`, (req, res) => {
        handler.exec({
            sql: `select * from hero_type`,
            success: (r) => {
                res.json(format.resJson(true, r));
            }
        })
    });

    // 获取某个类型英雄的id,name,img_url
    router.get(`/api/hero/getList`, (req, res) => {
        let sql = `select hero_id, name, img_url,hero_type, hero_type2 from hero`;
        let type = req.query.hero_type;
        if (type) {
            sql += ` where hero_type = ${type} or hero_type2 = ${type}`;
        }
        handler.exec({
            sql: sql,
            success: function (r) {
                res.json(format.resJson(true, r));
            }
        });
    });

    // 获取周免英雄的id,name,img_url
    router.get(`/api/hero/getWeek`, (req, res) => {
        handler.exec({
            sql: `select hero_id, name, img_url from hero where pay_type = 10`,
            success: function (r) {
                res.json(format.resJson(true, r));
            }
        });
    });

    // 获取新手推荐英雄的id,name,img_url
    router.get(`/api/hero/getJunior`, (req, res) => {
        handler.exec({
            sql: `select hero_id, name, img_url from hero where pay_type = 11`,
            success: (r) => {
                res.json(format.resJson(true, r));
            }
        });
    });

    // 获取所有皮肤
    router.get(`/api/hero/getSkins`, (req, res) => {
        let hero_id = req.query.hero_id;
        if (!hero_id) {
            res.json(format.resJson(false, `hero_id不能为空`));
            return;
        }
        handler.exec({
            sql: `select skin_id, skin_name, small_img_url, big_img_url from skin where hero_id = ${hero_id}`,
            success: (r) => {
                res.json(format.resJson(true, r));
            }
        });
    });

    // 获取英雄属性
    router.get(`/api/hero/getAttrs`, (req, res) => {
        let hero_id = req.query.hero_id;
        if (!hero_id) {
            res.json(format.resJson(false, `hero_id不能为空`));
            return;
        }
        handler.exec({
            sql: `select name, hero_type, hero_type2, img_url, live, attack, skill, difficulty from hero where hero_id = ${hero_id}`,
            success: (r) => {
                res.json({
                    success: true,
                    result: r[0] || ``
                });
            }
        });
    });

    // 获取英雄技能
    router.get(`/api/hero/getSkills`, (req, res) => {
        let hero_id = req.query.hero_id;
        if (!hero_id) {
            res.json(format.resJson(false, `hero_id不能为空`));
            return;
        }
        handler.exec({
            sql: `select * from skill where hero_id = ${hero_id}`,
            success: (r) => {
                res.json(format.resJson(true, r));
            }
        });
    });

    // 获取推荐英雄技能
    router.get(`/api/hero/getRecomSkills`, (req, res) => {
        let hero_id = req.query.hero_id;
        if (!hero_id) {
            res.json(format.resJson(false, `hero_id不能为空`));
            return;
        }
        handler.exec({
            sql: `select s.hero_id, s.img_url, s.name from skill s join skill_summoner ss WHERE s.hero_id = ${hero_id} and (s.skill_id = ss.skill_id1 or s.skill_id = ss.skill_id2)`,
            success: (r) => {
                res.json(format.resJson(true, r));
            }
        });
    });

    // 获取推荐召唤师技能
    router.get(`/api/hero/getRecomSummoners`, (req, res) => {
        let hero_id = req.query.hero_id;
        if (!hero_id) {
            res.json(format.resJson(false, `hero_id不能为空`));
            return;
        }
        handler.exec({
            sql: `select s.summoner_id, s.img_url, s.name from summoner s join skill_summoner ss WHERE ss.hero_id = ${hero_id} and (s.summoner_id = ss.summoner_id1 or s.summoner_id = ss.summoner_id2)`,
            success: (r) => {
                res.json(format.resJson(true, r));
            }
        });
    });

    // 获取推荐出装
    router.get(`/api/hero/getRecomEquips`, (req, res) => {
        let hero_id = req.query.hero_id;
        if (!hero_id) {
            res.json(format.resJson(false, `hero_id不能为空`));
            return;
        }
        handler.exec({
            sql: `select equip_ids1, tips1, equip_ids2, tips2 from hero_equip where hero_id = ${hero_id}`,
            success: (r) => {
                if (r[0]) {
                    let obj = {};
                    obj.tips1 = r[0].tips1;
                    obj.tips2 = r[0].tips2;
                    handler.exec({
                        sql: `select equip_id, name, img_url from equip where equip_id in (${r[0].equip_ids1})`,
                        success: (r1) => {
                            obj.equips1 = r1;
                            handler.exec({
                                sql: `select equip_id, name, img_url from equip where equip_id in (${r[0].equip_ids2})`,
                                success: (r2) => {
                                    obj.equips2 = r2;
                                    res.json({
                                        success: true,
                                        result: obj
                                    });
                                }
                            });
                        }
                    });
                } else {
                    res.json(format.resJson(false, `查询失败`));
                }
            }
        });
    });

    // 获取推荐铭文
    router.get(`/api/hero/getRecomInscriptions`, (req, res) => {
        let hero_id = req.query.hero_id;
        if (!hero_id) {
            res.json(format.resJson(false, `hero_id不能为空`));
            return;
        }
        handler.exec({
            sql: `select inscription_ids, tips from hero_inscription where hero_id = ${hero_id}`,
            success: (r) => {
                if (r[0]) {
                    let ids = r[0].inscription_ids;
                    let obj = r[0];
                    handler.exec({
                        sql: `select name, img_url from inscription where inscription_id in (${ids})`,
                        success: (r1) => {
                            obj.inscriptions = r1;
                            res.json({
                                success: true,
                                result: obj
                            });
                        }
                    });
                } else {
                    res.json(format.resJson(true, r));
                }
            }
        });
    });


    // 获取英雄使用技巧，对抗技巧，团战思路
    router.get('/api/hero/getArtifice', (req, res) => {
        let hero_id = req.query.hero_id;
        if (!hero_id) {
            res.json(format.resJson(false, `hero_id不能为空`));
            return;
        }
        handler.exec({
            sql: `select * from artifice where hero_id = ${hero_id}`,
            success: r => {
                res.json({
                    success: true,
                    result: r[0]
                });
            }
        });
    });

    // 获取英雄关系
    router.get('/api/hero/getLinks', (req, res) => {
        let hero_id = req.query.hero_id;
        if (!hero_id) {
            res.json(format.resJson(false, `hero_id不能为空`));
            return;
        }
        handler.exec({
            sql: `select hero_id1, type, tips from links where hero_id = ${hero_id} order by type asc`,
            success: r => {
                res.json(format.resJson(true, r));
            }
        });
    });

    // 获取英雄故事
    router.get(`/api/hero/getStory`, (req, res) => {
        let hero_id = req.query.hero_id;
        if (!hero_id) {
            res.json(format.resJson(false, `hero_id不能为空`));
            return;
        }
        handler.exec({
            sql: `select story from story where hero_id = ${hero_id}`,
            success: (r) => {
                res.json({
                    success: true,
                    result: r[0] || `暂无英雄故事`
                });
            }
        });
    });

    // 获取英雄历史
    router.get(`/api/hero/getHistory`, (req, res) => {
        let hero_id = req.query.hero_id;
        if (!hero_id) {
            res.json(format.resJson(false, `hero_id不能为空`));
            return;
        }
        handler.exec({
            sql: `select history from story where hero_id = ${hero_id}`,
            success: (r) => {
                res.json({
                    success: true,
                    result: r[0] || `暂无历史上的ta`
                });
            }
        });
    });

    // 获取英雄故事和历史
    router.get(`/api/hero/get_stories`, (req, res) => {
        let hero_id = req.query.hero_id;
        if (!hero_id) {
            res.json(format.resJson(false, `hero_id不能为空`));
            return;
        }
        handler.exec({
            sql: `select story, history from story where hero_id = ${hero_id}`,
            success: (r) => {
                res.json({
                    success: true,
                    result: r[0]
                });
            }
        });
    });
}

module.exports = hero;