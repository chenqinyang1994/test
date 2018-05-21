let http = require('http')
let fs = require('fs')
let url = require('url')

let slides = require('./data')

//读取数据的方法
let readFn = (cb) => {
    fs.readFile(__dirname + '\\book.json', 'utf-8', (err, data) => {
        if (err || data.length == 0) {
            cb([])
        } else {
            cb(JSON.parse(data))
        }
    })
}

//写入数据的方法
let writeFn = (data, cb) => {
    fs.writeFile(__dirname + '\\book.json', JSON.stringify(data), cb)
}

// writeFn({}, () => { })

let pageSize = 5;//每页显示五个

http.createServer((req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.setHeader("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.setHeader("X-Powered-By", ' 3.2.1')
    if (req.method == "OPTIONS") return res.end();/*让options请求快速返回*/

    let { pathname, query } = url.parse(req.url, true)

    if (pathname === '/page') {
        let offset = parseInt(query.offset) || 0; //拿到当前前端传递的值
        readFn(books => {
            let result = books.reverse().slice(offset, offset + pageSize);//数据倒叙
            let hasMore = true;
            if (books.length <= offset + pageSize) {
                hasMore = false;
            }
            res.setHeader('Content-type', 'application/json,charset=utf8');
            res.end(JSON.stringify({ hasMore, books: result }));
        })
    }

    if (pathname === '/slides') {
        res.setHeader('Content-type', 'application/json,charset=utf8')
        res.end(JSON.stringify(slides))
    }
    if (pathname === '/hot') {
        readFn((books) => {
            let hot = books.reverse().slice(0, 6)
            res.setHeader('Content-type', 'application/json,charset=utf8')
            res.end(JSON.stringify(hot))
        })
    }
    if (pathname === '/book') {
        let id = parseInt(query.id);
        switch (req.method) {
            case 'GET':
                if (!isNaN(id)) {//查询一个
                    readFn((books) => {
                        let book = books.find(item => item.bookId == id);
                        if (!book) {
                            book = {};//如果没找到，则是undefined
                        }
                        res.setHeader('Content-type', 'application/json,charset=utf8')
                        res.end(JSON.stringify(book));
                    })
                } else {
                    readFn((books) => {
                        let hot = books.reverse()
                        res.setHeader('Content-type', 'application/json,charset=utf8')
                        res.end(JSON.stringify(hot))
                    })
                }
                break;
            case 'POST':
                let str = '';
                req.on('data', chunk => {
                    str += chunk;
                });
                req.on('end', () => {
                    let book = JSON.parse(str);//book就是要改成什么样子
                    readFn(books => {
                        book.bookId = books.length ? books[books.length - 1].bookId + 1 : 1;//添加id
                        books.push(book);//將數據放到books中
                        writeFn(books, () => {
                            res.end(JSON.stringify(book))
                        })
                    })
                });
                break;
            case 'PUT':
                if (id) {//获取了当前要修改的id
                    let str = '';
                    req.on('data', chunk => {
                        str += chunk;
                    });
                    req.on('end', () => {
                        let book = JSON.parse(str);//book就是要改成什么样子
                        readFn(books => {
                            books = books.map(item => {
                                if (item.bookId == id) {//找到id相同的那一本书
                                    return book
                                }
                                return item //其他书正常返回
                            });
                            writeFn(books, () => {//将数据写回json中
                                res.end(JSON.stringify(book));
                            })
                        })
                    })
                }
                break;
            case 'DELETE':
                if (id) {
                    readFn((books) => {
                        books = books.filter(item => item.bookId != id)
                        writeFn(books, () => { })
                        res.setHeader('Content-type', 'application/json,charset=utf8')
                        res.end(JSON.stringify({}))
                    })
                } else {

                }
                break;
        }
    }

    //读取一个路径
    // fs.stat('.' + pathname, function (err, stats) {
    //     if (err) {
    //         res.statusCode = 404;
    //         res.end('NOT FOUND');
    //     } else {
    //         if (stats.isDirectory()) {
    //             let p = require('path').join('.' + pathname, './index.html');
    //             fs.createReadStream('.' + pathname).pipe(res)
    //         } else {
    //             fs.createReadStream('.' + pathname).pipe(res);
    //         }
    //     }
    // })

}).listen(3000);