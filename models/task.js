module.exports = function(Model,db){
    Model.extendInclude = [
        {
            model: db.User,
            as: 'creator',
            attributes: ['id', 'firstName', 'lastName'],
            limit: 1,
            separate: false
            },
            {
                model: db.User,
                as: 'assignedTo',
                attributes: ['id', 'firstName', 'lastName'],
                limit: 1,
                separate: false
            },
            {
                model: db.Project,
                as: 'project',
                attributes: ['id', 'name'],
                limit: 1,
                separate: false
            },
    ];

    Model.prototype.writeRemotes = function(data){

        const self = this;

        if(typeof data.name !== 'undefinded'){
            self.name = data.name;
        }

        if(typeof data.tect !== 'undefinded'){
            self.text = data.text;
        }
        if(typeof data.creatorId !== 'undefinded'){
            self.creatorId = data.creatorId;
        }
        
        if(typeof data.assignedToId !== 'undefinded'){
            self.assignedToId = data.assignedToId;
        }
        if(typeof data.projectId !== 'undefinded'){
            self.projectId = data.projectId;
        }
    }
};