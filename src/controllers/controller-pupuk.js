const config = require('../configs/database');

let mysql      = require('mysql');
let pool       = mysql.createPool(config);

pool.on('error',(err)=> {
    console.error(err);
});

module.exports ={
    getPupuk(req, res) {
        pool.getConnection(function (err, connection) {
            if (err) throw err;
            connection.query('SELECT * FROM pupuks;', function (error, results) {
                if (error) throw error;
                
                // Check if results contains any data
                if (results.length > 0) {
                    res.render('pupuk', {
                        url: 'http://localhost:5050/',
                        pupuks: results 
                    });
                } else {
                    res.render('pupuk', {
                        url: 'http://localhost:5050/',
                        pupuks: [] 
                    });
                }
            });
            connection.release();
        });
    },
    formPupuk(req,res){
        res.render("addPupuk",{
            url : 'http://localhost:5050/',
        });
    },
    savePupuk(req, res) {
        let { nama, jenis, berat } = req.body;
        console.log(nama, jenis, berat); 
        if (nama && jenis && berat) {
            pool.getConnection(function (err, connection) {
                if (err) throw err;
                connection.query(
                    `INSERT INTO pupuks (nama, jenis, berat) VALUES (?, ?, ?);`,
                    [nama, jenis, berat], 
                    function (error, results) {
                        if (error) {
                            console.error(error);
                            res.send('Gagal menyimpan data');
                            return;
                        }
                        req.flash('color', 'success');
                        req.flash('status', 'Yes..');
                        req.flash('message', 'Data berhasil ditambahkan');
                        res.redirect('/pupuk');
                    }
                );
                connection.release();
            });
        } else {
            res.send('Data kurang');
        }
    },    
};

