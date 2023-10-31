const mongoose =require('mongoose');

const connectDatabase = ()=>{ mongoose.connect(process.env.DB_LOCAL_URL, {
    useNewUrlParser: true,
    useUnifiedTopology:true,
   // useFindAndModify: true
    //useCreateIndex: true

}).then(con => {
    console.log(`MongoBD Database connected with host: ${con.connection.host}`);
});
};
module.exports = connectDatabase;