'use strict';
let fs = require('fs');
let http = require('http');
let URL = require('url');
let querystring = require('querystring');

let defaultConfig = {
    url: null, // request url
    data: null, // request data
    method: 'GET', // request method  GET | POST
    encoding: 'utf-8', // encoding-type utf-8 | gbk | ascii utf-8 is default
    headers: {
        "Content-Type": "application/json"
    }, // request headers
    timeout: 10, // request timeout threshold (seconds)
    successFunc: function(data) {}, //request successfully
    errorFunc: function(data) {}, //request failed
};

export function ajax(config) {
    if (typeof config !== 'object' || config === null || config === undefined) {
        console.log('params error');
        return;
    }
    if (config.url === null || config.url === undefined) {
        console.log("url cannot be null or undefined");
        return;
    }

    // update config
    for (let key in defaultConfig) {
        // dont not use '==='
        if (config[key] == null) {
            config[key] = defaultConfig[key];
        }
    }

    // parse url
    let params = URL.parse(config.url, true);

    // handle path
    params.path += '?';
    for (let key in config.data) {
        // encode URI component
        params.path += encodeURIComponent(`${key}=${config.data[key]}&`);
    }
    params.path += `$rand=${Math.random()}`;

    // set options
    let options = {
        host: params.host,
        port: params.port || 80,
        method: config.method,
        path: params.path
    };


    let req = http.request(options, function(res) {
        res.setEncoding(config.encoding);
        let data = '';
        res.on('data', function(chunk) {
            data += chunk;
        });
        res.on('end', function() {
            // encode URI component
            config.successFunc(decodeURI(data));
        })
    }).on('error', function(e) {
        config.errorFunc(e);
    });

    // POST
    if (config.method === 'POST') {
        let d = querystring.stringify(config.data);
        req.setHeader("content-length", Buffer.byteLength(d));
        for (let key in config.headers) {
            req.setHeader(key, config.headers[key]);
        }

        // write data to request body
        req.write(d);
    }

    //
    req.setTimeout(config.timeout);

    req.end();
}