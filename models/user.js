const Passport = require('../core/passport.js');

module.exports = function(Model){

    Model.prototype.fullname = function(){

        return this.firstName + ' ' + this.lastName;
    };


    Model.prototype.writeRemotes= function(data){

        const self = this;

        if(typeof data.email === 'string'){
            self.email = data.email.toLowerCase();
        }
        else if(typeof data.email !== 'undefined'){
            data.email = data.email;
        }

        if(typeof data.firstName !== 'undefined'){
            data.firstName = data.firstName;
        }

        if(typeof data.lastName !== 'undefined'){
            data.lastName = data.lastName;
        }

        if(typeof data.password !== 'undefined'){
            self.passwordHash = Passport.hashPassword(data.password);
        }
    }
};