import sqlite3 from '@journeyapps/sqlcipher'

sqlite3.verbose()

export default () => {
  console.log('Database created')
  var db = new sqlite3.Database('test.db')

  console.log('Starting use database ...')
  db.serialize(function() {
    // This is the default, but it is good to specify explicitly:
    db.run('PRAGMA cipher_compatibility = 4')
    console.log('Pragma cipher compatibility defined')

    // To open a database created with SQLCipher 3.x, use this:
    // db.run("PRAGMA cipher_compatibility = 3");

    db.run("PRAGMA key = 'mysecret'", params => {
      console.log('**** PRAGMA ****', params)
    })
    console.log('Pragma cipher secret defined')
    db.run('CREATE TABLE lorem (info TEXT)')
    console.log('Table created')

    var stmt = db.prepare('INSERT INTO lorem VALUES (?)')
    for (var i = 0; i < 10; i++) {
      stmt.run('Ipsum ' + i)
    }
    stmt.finalize()
    console.log('Data inserted')

    db.each('SELECT rowid AS id, info FROM lorem', function(err, row) {
      if (err) console.log(err)
      console.log(row.id + ': ' + row.info)
    })
    console.log('Read and log data')
  })

  db.close()
  console.log('Database closed')
}
