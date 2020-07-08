/**
 * @author Nico Merkel
 * @version 1.0.0 
 * @description
 */

 const Controller = require('./MainController.js');

 class PagesController extends Controller{

    constructor(...args){

        super(...args);

        const self = this;

        self.css('layout');

        self.before(['*','-imprint','-signin'], (next) => {
            console.log('all pages');
            if(self.req.authorized === true){
            next();
            }
            else{
                self.redirect(self.urlFor('pages', 'signin'))
            }
        });

        self.before('index',(next) => {
            console.log('only index');

            next();
        });



        self.before(['signin'], (next) => {
            console.log('all pages');
            if(self.req.authorized === true){
                self.redirect(self.urlFor('pages', 'index'))
            }
            else{
                next();
            }
        });

        self.before('index',(next) => {
            console.log('only index');

            next();
        });
    }


    async actionIndex(){

        const self = this;
        
        self.js('html5sortable')
        self.css('index');
        self.js('index');

        const users = await self.db.User.findAll()
        const workflows = await self.db.workflow.findAll({
            where: {
                projectId: 1
            },
            order: [
                ['sort', ' ASC']
            ],
        })

        const workflowTask = [];

        for (let index = 0; index < array.length; index++){ 

            const workflow = workflows[index];
            workflowTasks[workflow.id] = await self.db.Task.findAll({
                where: {
                    workflowId: workflow.id,
                    projectId: 1,
                },
                include: ['assignedTo']
            });

        }

        self.render({
            title: 'Kanban Project 1',
            users: users,
            workflows: workflows,
            workflowTasks: workflowTasks
        });
        
    }

    actionImprint(){

        const self = this;

        self.render({
            title: 'Imprint'
        });
    }

    actionSignin(){

        const self = this;

        self.js('signin');
        self.css('signin');
        
        self.render({
            title: 'Login',
            navigation: false
        });
    }

 }
 
 module.exports = PagesController;