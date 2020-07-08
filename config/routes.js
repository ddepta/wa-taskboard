/**
 * @author Nico Merkel
 * @version 1.0.0 
 * @description
 */

 const PagesController = require('../controllers/pagesController.js');
 const ApiUsersController = require('../controllers/api/usersController.js');
 const ApiTasksController = require('../controllers/api/tasksController.js');
 const ApiProjectsController = require('../controllers/api/projectsController.js');
 const ApiMessagesController = require('../controllers/api/messagesController.js');

 let routes = {
  'pages' : {
    controller: PagesController,
    actions: [
          {path: '/', action: 'index', method: 'get' },
          {path: '/imprint', action: 'imprint', method: 'get' },
          {path: '/signin', action: 'signin', method: 'get' }
    ]
  },

    'api/users' : {
      controller: ApiUsersController,
      actions: [
        {path: '/api/users', action: 'index', method: 'get'},
        {path: '/api/signin', action: 'signin', method: 'post'},
        {path: '/api/signup', action: 'signup', method: 'post'},
        {path: '/api/users/:id', action: 'show', method: 'get'}   
      ]
    },
    'api/tasks' : {
      controller: ApiTasksController,
      actions: [
        {path: '/api/tasks', action: 'index', method: 'get'},
        {path: '/api/tasks', action: 'create', method: 'post'},
        {path: '/api/tasks/:id', action: 'show', method: 'get'}   
      ]
    },
    'api/messages' : {
      controller: ApiMessagesController,
      actions: [
        {path: '/api/messages', action: 'index', method: 'get'}, 
        {path: '/api/messages/:id', action: 'destroy', method: 'get'},
        {path: '/api/messages/:id', action: 'show', method: 'get'},
        {path: '/api/messages/:id', action: 'update', method: 'get'},
      ]
    },
    'api/projects' : {
      controller: ApiProjectsController,
      actions: [
        {path: '/api/projects', action: 'index', method: 'get'},
      ]
    },
 };

 module.exports = routes;