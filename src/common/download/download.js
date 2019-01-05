// 下载文件
const fs = require('fs');
const url = require('url');
const http = require('http');
const https = require('https');
const path = require('path');
const axios = require('axios');

// 所有英雄
let hero_url = `https://pvp.qq.com/web201605/js/herolist.json`;
// 装备
let equip_url = `http://pvp.qq.com/web201605/js/item.json`;
// 铭文
let ming_url = `http://pvp.qq.com/web201605/js/ming.json`;
// 召唤师技能
let summoner_url = `http://pvp.qq.com/web201605/js/summoner.json`;

let save_dir = `${path.resolve(__dirname,'..')}/jsons/`;

/**
 * http请求获取文件
 * @param {String} file_path 
 */
function http_get_file(file_path) {
    let options = {
        host: url.parse(file_path).host,
        port: 80,
        path: url.parse(file_path).pathname,
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        }
    };

    let file_name = url.parse(file_path).pathname.split('/').pop();
    let file = fs.createWriteStream(save_dir + file_name);

    http.get(options, function (res) {
        res.on('data', function (data) {
            file.write(data);
        });
        res.on('end', function () {
            file.end();
            console.log(`${file_name} downloaded to ${save_dir}`);
        })
    })
}

/**
 * https方式获取json文件
 * @param {String} url 
 */
function https_get_file(path) {
    const options = {
        host: url.parse(path).host,
        port: 80,
        path: url.parse(path).pathname,
        headers: {
            'Content-Type': 'application/json;charset=utf8'
        }
    }
    const name = url.parse(path).pathname.split('/').pop();
    let file = fs.createWriteStream(save_dir + name);
    https.get(options, res => {
        res.on('data', data => {
            file.write(data);
        });
        res.on('end', () => {
            file.end();
            console.log(`${name} download to ${save_dir}`);
        });
    });
}

exports.http_get_file = http_get_file;

/**
 * axios方式下载json文件
 * @param {String} path 
 */
function axios_get_file(file_url) {
    const name = url.parse(file_url).pathname.split('/').pop();
    const save_path = path.resolve(__dirname, '..') + '\\jsons\\';
    axios.get(file_url).then(res => {
        fs.writeFileSync(`${save_path}/${name}`, `1${res.data}`.substr(2));
        console.log(`${name} saved to ${save_path}`)
    }).catch(e => {
        console.log(e);
    });
}

// http_get_file(hero_url);
// http_get_file(equip_url);
// http_get_file(ming_url);
// http_get_file(summoner_url);
axios_get_file(hero_url);