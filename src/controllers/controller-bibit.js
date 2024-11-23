const config = require('../configs/database');

let mysql      = require('mysql');
let pool       = mysql.createPool(config);

pool.on('error',(err)=> {
    console.error(err);
});

module.exports ={
    getBibit(req, res) {
        pool.getConnection(function (err, connection) {
            if (err) throw err;
            connection.query('SELECT * FROM bibits;', function (error, results) {
                if (error) throw error;
                
                // Check if results contains any data
                if (results.length > 0) {
                    res.render('bibit', {
                        url: 'http://localhost:5050/',
                        bibits: results // Pass the contacts data to the view
                    });
                } else {
                    res.render('bibit', {
                        url: 'http://localhost:5050/',
                        bibits: [] // Pass an empty array if no data
                    });
                }
            });
            connection.release();
        });
    },
    formBibit(req,res){
        res.render("addBibit",{
            url : 'http://localhost:5050/',
        });
    },
    saveBibit(req, res) {
        let { nama, jumlah, berat } = req.body;
        console.log(nama, jumlah, berat); 
        if (nama && jumlah && berat) {
            pool.getConnection(function (err, connection) {
                if (err) throw err;
                connection.query(
                    `INSERT INTO bibits (nama, jumlah, berat) VALUES (?, ?, ?);`,
                    [nama, jumlah, berat], 
                    function (error, results) {
                        if (error) {
                            console.error(error);
                            res.send('Gagal menyimpan data');
                            return;
                        }
                        req.flash('color', 'success');
                        req.flash('status', 'Yes..');
                        req.flash('message', 'Data berhasil ditambahkan');
                        res.redirect('/bibit');
                    }
                );
                connection.release();
            });
        } else {
            res.send('Data kurang');
        }
    },    
    editBibit(req, res) {
        const { id } = req.params;
        pool.getConnection(function (err, connection) {
            if (err) throw err;
            connection.query('SELECT * FROM bibits WHERE id = ?', [id], function (error, results) {
                if (error) throw error;
                if (results.length > 0) {
                    res.render('editBibit', {
                        url: 'http://localhost:5050/',
                        bibit: results[0]
                    });
                } else {
                    res.redirect('/bibit');
                }
            });
            connection.release();
        });
    },
    updateBibit(req, res) {
        const { id } = req.params;
        const { nama, jumlah, berat } = req.body;
        pool.getConnection(function (err, connection) {
            if (err) throw err;
            connection.query(
                'UPDATE bibits SET nama = ?, jumlah = ?, berat = ? WHERE id = ?',
                [nama, jumlah, berat, id],
                function (error, results) {
                    if (error) throw error;
                    res.redirect('/bibit');
                }
            );
            connection.release();
        });
    },
    deleteBibit(req, res) {
        const { id } = req.params;
        pool.getConnection(function (err, connection) {
            if (err) throw err;
            connection.query('DELETE FROM bibits WHERE id = ?', [id], function (error, results) {
                if (error) throw error;
                res.redirect('/bibit');
            });
            connection.release();
        });
    },
};

