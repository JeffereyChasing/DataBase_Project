import mysql from 'mysql'

const database = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "2001518Wu...",
    database: "project"
})
//run:
// ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '2001518Wu';
// flush priviledges in mysql

database.connect(function(err) {
    if(err) {
        console.log(err)
        // to see what the error is
    } else {
        console.log("Connected")
    }
})

export default database;
