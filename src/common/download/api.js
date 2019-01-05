// mysql的包 很多安利easymysql的，暂时还没改
let mysql = require('mysql');
// mysql配置
let mysqlConfig = require('./mysql.config');

//每次使用的时候需要创建链接，数据操作完成之后要关闭连接
let connection = mysql.createConnection(mysqlConfig);
//连接mysql
connection.connect(function (err) {
    if (err) {
        console.log('数据库连接失败');
        throw err;
    }
});

let sql = 'select * from summoner';
let params = [];

// 获取召唤师技能
connection.query(sql, params, function (error, res) {
    if (error) {
        console.log(error);
        throw error;
    }
    console.log(res);
});