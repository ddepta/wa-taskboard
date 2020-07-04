/**
 * @author Nico Merkel
 * @version 1.0.0 
 * @description API projects controller used to handel model ressource
 */

const Controller = require('../mainController.js');

class ApiProjectsController extends Controller{

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

    let projects =[];
    let error =null;

    try {

        projects = await self.db.Project.findAll({
            where: {},
            attributes: ['id', 'name', 'createdAt','updatedAt'],
            include: self.db.Project.extendedInclude
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

            projects: projects
        });

    }

   }

}

module.exports = ApiProjectsController;