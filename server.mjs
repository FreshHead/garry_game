import http from "http";
import { parse } from "querystring";
import sqlite3 from "sqlite3";
import { open } from "sqlite";
import fs from "fs";
import path from "path";

// this is a top-level await 
(async () => {
    // open the database
    const db = await open({
        filename: "./database.db",
        driver: sqlite3.Database
    });
    await db.exec("CREATE TABLE IF NOT EXISTS records (name TEXT, score INTEGER)");

    const contentTypesByExtension = {
        ".html": "text/html",
        ".css": "text/css",
        ".js": "text/javascript",
        ".svg": "image/svg+xml"
    };

    var server = http.createServer(async function (req, res) {
        const url = req.url;
        if (url === "/records") {
            if (req.method === "POST") {
                collectRequestData(req, (result) => {
                    db.exec(`INSERT INTO records VALUES ("${result.name}", ${result.score})`);
                    res.end("ok");
                });
            }
        } else if (url === "/records.html") {
            // TODO: остортируй по убыванию очков.
            // TODO: Добавь дату и время.
            const records = await db.all("SELECT * FROM records");
            const recordsRows = records.reduce((acc, record, idx) => acc +
                `<tr>
                    <td>${idx + 1}</td>
                    <td>${record.name}</td>
                    <td>${record.score}</td>
                </tr>`
                , "");
            res.writeHead(200, {
                "Content-Type": "text/html"
            });
            res.write(`<!DOCTYPE html>
            <head>
                <meta charset="UTF-8">
            </head>
            <html lang="ru">
                <body style="display: flex; flex-direction: column; justify-content: center; align-items: center; font-size: 40px;">
                    <h1>Таблица рекордов</h1>
                    <table>
                        <tr>
                            <th>Место</th>
                            <th>Имя</th>
                            <th>Очки</th>
                        </tr>
                            ${recordsRows}
                        </tr>
                    </table>
                    <a href="/">В игру!</a>
                </body>
            </html>`);
            res.end();
        } else { // serve static files.
            try {
                const baseDirectory = "./src";
                const fileName = path.join(baseDirectory, url === "/" ? "/index.html" : url);
                const fileStream = fs.createReadStream(fileName)
                fileStream.pipe(res);
                fileStream.on("open", function () {
                    res.writeHead(200);
                    const contentType = contentTypesByExtension[path.extname(fileName)];
                    if (contentType) {
                        res.writeHead(200, {
                            "Content-Type": contentType
                        });
                    }
                });
                fileStream.on("error", function (e) {
                    res.writeHead(404);
                    res.end();
                });
            } catch (e) {
                res.writeHead(500);
                res.end();     // end the response so browsers don"t hang
            }
        }
    });
    const PORT = process.env.PORT || 8080;
    server.listen(PORT);
    console.log(`Node.js web server at port ${PORT} is running..`)
})()

function collectRequestData(request, callback) {
    const FORM_URLENCODED = "application/x-www-form-urlencoded";
    if (request.headers["content-type"] === FORM_URLENCODED) {
        let body = "";
        request.on("data", chunk => {
            body += chunk.toString();
        });
        request.on("end", () => {
            callback(parse(body));
        });
    }
    else {
        callback(null);
    }
}