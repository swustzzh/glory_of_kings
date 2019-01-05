// 文件操作
const fs = require('fs');
// 数据库操作工具
const handler = require('../../api/util/mysqlHandler.js');

// 爬虫所需要的库
const http = require('http');
const https = require('https');
const cheerio = require('cheerio');
const iconv = require('iconv-lite');
const path = require('path');

// json文件的基础路径
const BASE_PATH = path.resolve(__dirname, '..') + '\\jsons\\';
// 文件编码方式
const FILE_TYPE = 'utf-8';


// 英雄资料页面基础路径
const HERO_DETAIL_PATH = `https://pvp.qq.com/web201605/herodetail/`;
//英雄图片的基础路径
const HERO_IMG_PATH = `https://game.gtimg.cn/images/yxzj/img201606/heroimg/`;
// 英雄皮肤大图的基础路径
const HERO_BIGSKIN_PATH = `https://game.gtimg.cn/images/yxzj/img201606/skin/hero-info/`;
// 装备图片的基础路径
const EQUIP_IMG_PATH = `https://game.gtimg.cn/images/yxzj/img201606/itemimg/`;
//技能图片的基础路径
const SUMMONER_PATH = `https://game.gtimg.cn/images/yxzj/img201606/summoner/`;
// 铭文图片的基础路径
const INSCRIPTION_PATH = `https://game.gtimg.cn/images/yxzj/img201606/mingwen/`;


// 召唤师技能的插入语句
const SUMMONER_SQL = `insert into summoner(summoner_id,name,rank,cd,description,img_url,big_img_url) values(?,?,?,?,?,?,?)`;

// 铭文的插入语句
const INSCRIPTION_INSERT = `insert into inscription(inscription_id,type,grade,name,description,img_url) values(?,?,?,?,?,?)`;

// 英雄的插入语句
const HERO_INSERT = `insert into hero(hero_id,name,pay_type,new_type,hero_type,hero_type2,skin_name,img_url,live,attack,skill,difficulty) values (?,?,?,?,?,?,?,?,?,?,?,?)`;

// 使用技巧的插入语句
const ARTIFICE_INSERT = `insert into artifice(hero_id,use_skill,fight_skill,battle_skill) values (?,?,?,?)`;

//英雄皮肤的插入语句
const HERO_SKIN_INSERT = `insert into skin(skin_id,hero_id,skin_name,small_img_url,big_img_url) values (?,?,?,?,?)`;

// 装备的插入语句
const EQUIP_INSERT = `insert into equip(equip_id,name,type,sale_price,total_price,des1,des2,img_url) values (?,?,?,?,?,?,?,?)`;

//英雄故事插入语句
const STORY_INSERT = `insert into story(hero_id,story,history) values (?,?,?)`;

// 英雄技能插入语句
const SKILL_INSERT = 'insert into skill(skill_id,hero_id,name,cool,waste,description,tips,img_url) values (?,?,?,?,?,?,?,?)';

// 推荐铭文的插入语句
const HERO_INSCRIPTION_INSERT = 'insert into hero_inscription(hero_id,inscription_ids,tips) values (?,?,?)';

// 推荐装备的插入语句
const HERO_EQUIP_INSERT = 'insert into hero_equip(hero_id,equip_ids1,tips1,equip_ids2,tips2) values (?,?,?,?,?)';

// 英雄关系的插入语句
// 网页中每个项都是两个英雄，所以这里一次插入两条数据
const LINKS_INSERT = 'insert into links(link_id,hero_id,hero_id1,type,tips) values (?,?,?,?,?),(?,?,?,?,?)';

// 技能加点的建议
const SKILL_SUMMONER_INSERT = 'insert into skill_summoner(hero_id,skill_id1,skill_id2,summoner_id1,summoner_id2) values (?,?,?,?,?)';


/**
 * 读取文件
 * @param {String} path 文件路径
 * @param {Function} callback 回调函数，传入读取的data
 */
function _read_file(path, callback) {
    fs.readFile(path, FILE_TYPE, (err, data) => {
        if (err) {
            console.log(err);
            throw err;
        } else {
            let arr = JSON.parse(data);
            if (JSON.parse(data).length === 0) {
                console.log('暂无数据');
                return;
            } else {
                callback(arr);
            }
        }
    });
}

/**
 * http方式读取html
 * @param {String} path 文件路径
 * @param {Function} success 成功的回调函数
 * @param {Funtion} error 错误的回调函数
 */
function _read_html(path, success, error) {
    https.get(path, (res) => {
        let chunks = [];
        res.on('data', (item) => {
            chunks.push(item);
        });
        res.on('end', () => {
            // 解码页面，防止乱码
            let html = iconv.decode(Buffer.concat(chunks), 'gbk');
            let $ = cheerio.load(html, {
                decodeEntities: false
            });
            if (success) {
                success($);
            }
        })
    }).on('error', (err) => {
        if (error) {
            error(err);
        }
    });
}


module.exports = {
    /**
     * 更新召唤师技能
     */
    updateSummoner: function () {
        _read_file(`${BASE_PATH}summoner.json`, data => {
            let params = [];
            data.forEach(function (it, index) {
                params = [
                    it.summoner_id,
                    it.summoner_name,
                    parseInt(it.summoner_rank.substring(3)),
                    parseInt(it.summoner_description),
                    it.summoner_description.split('：')[1],
                    SUMMONER_PATH + it.summoner_id + '.jpg',
                    SUMMONER_PATH + it.summoner_id + '-big.jpg'
                ];
                handler.exec({
                    sql: SUMMONER_SQL,
                    params: params,
                    success: (res) => {
                        console.log(`${it.summoner_name} insert success`);
                    }
                });
            });
            return;
        });
    },

    /**
     * 更新铭文
     */
    updateInscription: function () {
        _read_file(`${BASE_PATH}ming.json`, data => {
            data.forEach(function (it, index) {
                handler.exec({
                    sql: INSCRIPTION_INSERT,
                    params: [
                        it.ming_id,
                        it.ming_type,
                        it.ming_grade,
                        it.ming_name,
                        it.ming_des,
                        `${INSCRIPTION_PATH}${it.ming_id}.png`
                    ],
                    success: (res) => {
                        console.log(`${it.ming_name} insert success`);
                    }
                });
            });
        });
    },

    /**
     * 更新装备
     */
    updateEquipments: function () {
        _read_file(`${BASE_PATH}item.json`, data => {
            data.forEach(function (it) {
                handler.exec({
                    sql: EQUIP_INSERT,
                    params: [
                        it.item_id,
                        it.item_name,
                        it.item_type,
                        it.price,
                        it.total_price,
                        it.des1,
                        it.des2,
                        `${EQUIP_IMG_PATH}${it.item_id}.jpg`
                    ],
                    success: (res) => {
                        console.log(`${it.item_name} insert success`);
                    }
                });
            });
        });
    },

    /**
     * 更新所有英雄
     */
    updateHero: function () {
        _read_file(`${BASE_PATH}herolist.json`, data => {
            data.forEach(it => {
                let path = `${HERO_DETAIL_PATH}${it.ename}.shtml`;
                _read_html(path, $ => {
                    let list = $('.ibar');
                    handler.exec({
                        sql: HERO_INSERT,
                        params: [
                            it.ename,
                            it.cname,
                            it.pay_type,
                            it.new_type,
                            it.hero_type,
                            it.hero_type2,
                            it.skin_name,
                            `${HERO_IMG_PATH}${it.ename}/${it.ename}.jppg`,
                            parseInt(list[0].attribs.style.substring(6)), // 生存能力
                            parseInt(list[1].attribs.style.substring(6)), // 攻击小姑
                            parseInt(list[2].attribs.style.substring(6)), // 技能效果
                            parseInt(list[3].attribs.style.substring(6)), // 困难程度
                        ],
                        success: () => {
                            console.log(`${it.cname} insert success`);
                        }
                    });
                }, () => {
                    console.log(`get ${path} err`);
                });
            });
        });
    },

    /**
     * 获取英雄使用技巧、对抗技巧、团战思路
     */
    update_artifice: function () {
        _read_file(`${BASE_PATH}herolist.json`, data => {
            data.forEach(it => {
                _read_html(`${HERO_DETAIL_PATH}m/${it.ename}.html`, $ => {
                    const skills = $('.use-skills');
                    handler.exec({
                        sql: ARTIFICE_INSERT,
                        params: [
                            it.ename,
                            $(skills[0]).text(),
                            $(skills[1]).text(),
                            $(skills[2]).text()
                        ],
                        success: res => {
                            if (res) {
                                console.log(`${it.cname} artifice update success`);
                            }
                        }
                    });
                });
            });
        });
    },

    /**
     * 更新皮肤
     */
    updateSkin: function () {
        _read_file(`${BASE_PATH}herolist.json`, data => {
            let names = [];
            data.forEach(it => {
                names = it.skin_name.split('|');
                names.forEach(function (item, ind) {
                    handler.exec({
                        sql: HERO_SKIN_INSERT,
                        params: [
                            it.ename + '' + (ind + 1),
                            it.ename,
                            item,
                            `${HERO_IMG_PATH}${it.ename}/${it.ename}-smallskin-${ind + 1}.jpg`,
                            `${HERO_BIGSKIN_PATH}${it.ename}/${it.ename}-bigskin-${ind + 1}.jpg`
                        ],
                        success: () => {
                            console.log(`skin:${item} insert success`);
                        }
                    });
                });
            });
        });
    },

    /**
     * 更新故事
     */
    updateStories: function () {
        _read_file(`${BASE_PATH}herolist.json`, data => {
            data.forEach(it => {
                _read_html(`${HERO_DETAIL_PATH}${it.ename}.shtml`, $ => {
                    handler.exec({
                        sql: STORY_INSERT,
                        params: [
                            it.ename,
                            $('.pop-story .pop-bd p').html(),
                            $('#history .pop-bd p').html() || '暂无相关历史'
                        ],
                        success: () => {
                            console.log(`${it.cname} story,history insert success`);
                        }
                    });
                });
            });
        });
    },

    /**
     * 更新技能
     */
    updateSkill: function () {
        _read_file(`${BASE_PATH}herolist.json`, data => {
            data.forEach(it => {
                _read_html(`${HERO_DETAIL_PATH}${it.ename}.shtml`, $ => {
                    const skills = $('.skill-show .show-list');
                    skills.each(function (ind, el) {
                        let name = $(el).find('.skill-name b').html();
                        if (name) {
                            handler.exec({
                                sql: SKILL_INSERT,
                                params: [
                                    `${it.ename}${ind}`,
                                    it.ename,
                                    name,
                                    parseInt($($(el).find('.skill-name span')[0]).html().substring(4)),
                                    parseInt($($(el).find('.skill-name span')[1]).html().substring(3)),
                                    $(el).find('.skill-desc').html(),
                                    $(el).find('.skill-tips').html(),
                                    `${HERO_IMG_PATH}${it.ename}/${it.ename}${ind}0.png`,
                                ]
                            });
                        }
                    });
                });
                console.log(`${it.cname} insert skill success`);
            });
        });
    },

    /**
     * 获取搭配铭文
     */
    updateHeroInscription: function () {
        _read_file(`${BASE_PATH}herolist.json`, data => {
            data.forEach(it => {
                _read_html(`${HERO_DETAIL_PATH}${it.ename}.shtml`, $ => {
                    handler.exec({
                        sql: HERO_INSCRIPTION_INSERT,
                        params: [
                            it.ename,
                            $('.sugg-info ul').attr('data-ming').replace('|', ','),
                            $('.sugg-tips').text().substring('5')
                        ],
                        success: res => {
                            if (res) {
                                console.log(`${it.cname} inscription insert success`);
                            }
                        }
                    });
                });
            });
        });
        return 0;
    },

    /**
     * 获取搭配装备
     */
    updateHeroEquip: function () {
        _read_file(`${BASE_PATH}herolist.json`, data => {
            data.forEach(it => {
                _read_html(`${HERO_DETAIL_PATH}${it.ename}.shtml`, $ => {
                    handler.exec({
                        sql: HERO_EQUIP_INSERT,
                        params: [
                            it.ename,
                            $($('.equip-info ul')[0]).attr('data-item').split('|').join(','),
                            $($('.equip-tips')[0]).text().substring('5'),
                            $($('.equip-info ul')[1]).attr('data-item').split('|').join(','),
                            $($('.equip-tips')[1]).text().substring('5')
                        ],
                        success: (res) => {
                            if (res) {
                                console.log(`${it.cname} equip update success`);
                            }
                        }
                    });
                });
            });
        });
    },

    /**
     * 获取英雄关系
     */
    updateLinks: function () {
        _read_file(`${BASE_PATH}herolist.json`, data => {
            data.forEach(it => {
                _read_html(`${HERO_DETAIL_PATH}${it.ename}.shtml`, $ => {
                    $('.hero-info').each((ind, el) => {
                        let id1 = $($(el).find('ul a')[0]).attr('href').substr(0, 3);
                        let id2 = $($(el).find('ul a')[1]).attr('href').substr(0, 3);
                        handler.exec({
                            sql: LINKS_INSERT,
                            params: [
                                `${it.ename}${id1}${ind}`,
                                it.ename,
                                id1,
                                ind,
                                $($(el).find('p')[0]).html(),
                                `${it.ename}${id2}${ind}`,
                                it.ename,
                                id2,
                                ind,
                                $($(el).find('p')[1]).html(),
                            ]
                        });
                    });
                });
                console.log(`${it.cname} links update success`);
            });
        });
    },

    /**
     * 英雄技能推荐表
     */
    updateSkillSummoner: function () {
        _read_file(`${BASE_PATH}herolist.json`, data => {
            data.forEach(it => {
                _read_html(`${HERO_DETAIL_PATH}${it.ename}.shtml`, $ => {
                    const k_ids = $('.sugg-skill img');
                    const s_ids = $($('.sugg-info2 p')[5]).attr('data-skill').split('|');
                    handler.exec({
                        sql: SKILL_SUMMONER_INSERT,
                        params: [
                            it.ename,
                            $(k_ids[0]).attr('src').substr(50, 4),
                            $(k_ids[1]).attr('src').substr(50, 4),
                            s_ids[0],
                            s_ids[1]
                        ],
                        success: res => {
                            if (res) {
                                console.log(`${it.cname} skill_summoner update success`);
                            }
                        }
                    });
                });
            });
        });
    }
}