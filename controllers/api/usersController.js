/**
 * @author Nico Merkel
 * @version 1.0.0 
 * @description API user controller used to handel model ressource
 */

const Controller = require('../mainController.js');
const Passport = require('../../core/passport.js');
class ApiUsersController extends Controller{

   constructor(...args){

       super(...args);

       const self = this;

       self.format = Controller.HTTP_FORMAT_JSON;
   
       self.before(['*','-signin', '-signup'], function(next){

        if(self.req.authorized === true){
            next();
        }
        else{
            self.render({
                statusCode: 401
            });
        }
    })
   
    }

   async actionIndex(){
    const self= this;

    let users =[];
    let error =null;

    try {

        users = await self.db.User.findAll({
            where: {}
        });
    }
    catch(err){
        error = err;
        console.log(err);
    }

    if(error !== null){

        self.render({

            details: error
        }, {
            statusCode: 500
        });
    }
    else{

        self.render({

            users: users
        });

    }

   }

   async actionShow(){

    const self= this;

    let userId = self.param('id');
    let users = null;
    let error = null;

    try {

        users = await self.db.User.findOne({
            where: {
                id: userId
            }
        });
    }
    catch(err){

        error = err;
    }

    if(error !== null){

        self.render({

            details: error
        }, {
            statusCode: 500
        });
    }
    else{

        self.render({

            user: user
        });
    }
   }

   async actionSignin(){

    const self = this;

    let remoteData = self.param('user') || {};

    let user = null;
    let error = null;

    try{

        user = await self.db.User.findOne({
            where: {
                email: remoteData.email
            }
        });

        if(!user || !Passport.comparePassword(remoteData.password, user.passwordHash)){

            throw new Error('No User found from this email or password.');
        }



    }
    catch(err){

        error = err;
    }

    if(error !== null){

        self.render({

            details: error
        }, {
            statusCode: 500
        });
    }
    else{

        let token = Passport.authorizedUserWithCookie(self.req, self.res, user.id);
        self.render({
            token: token
        }, {
            statusCode: 201
        });
    }
   }

   async actionSignup(){
        const self = this;

        let remoteData = self.param('user');

        let user = null;
        let error = null;



        try{
            user = await self.db.sequelize.transaction(async (t) => {
                let sameMail = await self.db.User.findOne({
                    where: {
                        email: remoteData.email
                    },
                    lock: true,
                    transaction: t
                });

                if(sameMail){
                    throw new Error('Mail already in use');
                }

                let newUser = self.db.User.build();
                newUser.writeRemotes(remoteData);
                await newUser.save({

                    transaction: t
                });

                return newUser;
            });

        }
        catch(err){


        }

        if(error !== null){

            self.render({
    
                details: error
            }, {
                statusCode: 500
            });
        }
        else{
    
            
            self.render({
                user: user
            }, {
                statusCode: 201
            });
        }

   }

}

module.exports = ApiUsersController;