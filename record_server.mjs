import http from "http";
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

// this is a top-level await 
(async () => {
    // open the database
    const db = await open({
        filename: './database.db',
        driver: sqlite3.Database
    });

    await db.exec('CREATE TABLE IF NOT EXISTS records (name TEXT, points INTEGER)');
    // await db.exec('INSERT INTO records VALUES ("test", 101)');

    var server = http.createServer(async function (req, res) {
        if (req.url == '/data') { //check the URL of the current request
            res.writeHead(200, { 'Content-Type': 'application/json' });
            const result = await db.all('SELECT * FROM records');
            console.log(result);
            res.write(JSON.stringify(result));
            res.end();
        }
    });

    server.listen(5000);
    console.log('Node.js web server at port 5000 is running..')
})()