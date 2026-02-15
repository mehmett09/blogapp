
const config = require('../config');


const Sequelize = require('sequelize');

const sequelize = new Sequelize(config.db.database, config.db.user, config.db.password, {
    dialect: 'mysql',
    host: config.db.host,
    define: {
        timestamps: false
    }
});
async function connectToDatabase(){
    try {
        await sequelize.authenticate();
        console.log('Veritabanina baglanti basarili.');
    }
    catch (err) {
        console.error('Veritabanina baglanti hatasi: ', err);
    }
};

connectToDatabase();
console.log("DB NAME:", sequelize.config.database);


module.exports = sequelize;

// connection.connect(function(err){
//     if(err){
//         console.error('Veritabanina baglanirken hata olustu: '+ err.stack);
//         return;
//     }  else {
//         console.log('Veritabanina baglandi, baglanti idsi: '+ connection.threadId);
//     } 
    
//     // connection.query('select * from blog', function (err,result) {
//     //     console.log(result[0].baslik);
//     //     console.log(result[0].aciklama);
//     //     console.log(result[0].resim);
//     //     console.log("Veri cekme islemi tamamlandi."); 

//     // } )

// });

// module.exports = connection.promise();



