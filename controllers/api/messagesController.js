/**
 * @author Nico Merkel
 * @version 1.0.0 
 * @description API messages controller used to handel model ressource
 */

const { Op } = require("sequelize");
const Controller = require('../mainController.js');
const ApiError = require('../../core/error.js');

class ApiMessagesController extends Controller{

   constructor(...args){

       super(...args);

       const self = this;

       self.format = Controller.HTTP_FORMAT_JSON;
  
        self.before(['*'], function(next){

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

    let messages =[];
    let error =null;

    let fromId = self.param('fromId') || null;
    let total = 0;
    let paging = self.paging();


    try{
        let where = {};

        if(fromId !== null){
            where = {
                [Op.or] : [{
                    fromId: fromId,
                    toId: self.req.user.id,
                },{
                    toId: fromId,
                    fromId: self.req.user.id,
                },
            ]
            };
        }
        else{
            where={
                toId: {
                    [Op.or]: null,
                }
            };
        }

        const {count, rows} = await self.db.Message.findAndCountAll({
            where: where,
            order: [
                ['id', 'DESC'],
            ],
            limit: paging.limit,
            offset: paging.offset,
            attributes: ['id', 'text', 'createdAt', 'UpdatedAt'],
            include: self.db.Message,extendedInclude
        });

        total= count;
        messages = rows;

    }
    catch{
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

            messages: messages,
            _meta: self.meta(paging,total)
        });
    }
   }

    async actionShow(){

        const self = this;

        let error = null;

        let id = self.param('id');
        let message = null;

        try{
            message = await self.db.Message.findOne({
                where: {
                    fromId: self.req.user.id,
                    id: id,
                },
                attributes: ['id', 'text', 'createdAt', 'UpdatedAt'],
                include: self.db.Message,extendedInclude

            });

            if(!message){
                throw new ApiError('No message found for delete',404);
            }
        }
        catch(err){
            error = err;
            console.log(err);
        }

        if(error){
            self.handleError(error);
        }
        else{
            self.render({
                message: message
            });
        }
    }

    async actionUpdate(){
        const self = this;

        let error = null;

        let id = self.param('id');
        let message = null;
        try{

            let remoteMessage = self.param('message');
            if(!remoteMessage){
                throw new ApiError('message object is missing, please check your body structure',400);
            }

            if(!remoteMessage.text){
                throw new ApiError('message object has no text, please check your body structure',400);
            }
            
            
            message = await self.db.Message.findOne({
                 where: {
                     fromId: self.req.user.id,
                    id: id,
                  },
                attributes: ['id', 'text', 'createdAt', 'UpdatedAt'],
                include: self.db.Message,extendedInclude
            });

            if(!message){
                  throw new ApiError('No message found for delete',404);
            }
            else{
                message.text = remoteMessage.text;
                await message.save();
            }
        }
         catch{

            error = err;
            console.log(err);
         }   

         if(error){
            self.handleError(error);
        }
        else{
            self.render({
                message: message
            });
        }

    }

    async actionDestroy(){
        const self = this;

        let error = null;

        let id = self.param('id');

        try{
            message = await self.db.Message.findOne({
                where: {
                    fromId: self.req.user.id,
                   id: id,
                 },
            });

            if(!message){
                throw new ApiError('No message found for delete', 404);
            }
            else{
                message.text= 'deleted';
                await message.save();
            }
        }
        catch(err){
            error = err;
            console.log(err);
        }

        if(error){
            self.handleError(error);
        }
        else{
            self.render({});
        }
    }
    


}

module.exports = ApiMessagesController;