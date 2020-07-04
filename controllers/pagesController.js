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


    actionIndex(){

        const self = this;

        self.css('index');
        self.js('index');

        self.db.User.findAll().then(users =>{
            self.render({

                title: 'Hello World',
                users: users
            });
            
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