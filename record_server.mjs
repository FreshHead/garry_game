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
    // TODO: Выдай html страничку рекодов?

    await db.exec("CREATE TABLE IF NOT EXISTS records (name TEXT, points INTEGER)");

    const contentTypesByExtension = {
        ".html": "text/html",
        ".css": "text/css",
        ".js": "text/javascript",
        ".svg": "image/svg+xml"
    };

    var server = http.createServer(async function (req, res) {
        const url = req.url;
        if (url === "/records") { //check the URL of the current request
            if (req.method === "GET") {
                res.writeHead(200, { "Content-Type": "application/json" });
                const result = await db.all("SELECT * FROM records");
                console.log(result);
                res.write(JSON.stringify(result));
                res.end();
            }
            if (req.method === "POST") {
                collectRequestData(req, (result) => {
                    db.exec(`INSERT INTO records VALUES ("${result.name}", ${result.points})`);
                    res.end("ok");
                });
            }
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
                console.log(e.stack);
            }
        }
    });

    server.listen(5000);
    console.log("Node.js web server at port 5000 is running..")
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