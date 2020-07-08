/**
 * @author Nico Merkel
 * @version 1.0.0 
 * @description
 */

const Sequelize = require('sequelize');
const path = require('path');
const fs = require('fs');


 module.exports = function(){

    const sequelize = new Sequelize(cfg.db.database, cfg.db.username, cfg.db.password, {

        host: cfg.db.host,
        dialect: cfg.db.dialect,
        pool: {
              max: 5,
              min: 0,
              acquire: 30000,
              idle: 10000
        }
      });

    const db = {
        Sequelize: Sequelize,
        sequelize: sequelize
    }

    let modelsPath = path.join(__dirname,'..','src','db','models');
    let files = fs.readdirSync(modelsPath);

    files = files.filter(file => {

        return(file.indexOf('.') !== 0 && file.slice(-3) === '.js');
    })

    files.forEach(file => {

        const model = sequelize.import(path.join(modelsPath, file));
        db[model.name] = model;

    })


    Object.keys(db).forEach(modelName => {


        try{
            let fixedModelName = modelName.charAt(0).toLowerCase() + modelName.slice(1);
            let filePath = path.join(__dirname,'..','models', fixedModelName + '.js');
            if(fs.existsSync(filePath)){

                require(filePath)(db[modelName],db);
            }
        }
        catch(err){

            console.error(err);
        }


        if(db[modelName].associate){

            db[modelName].associate(db);
        }
    })

    return db;
 }
