const {addBookHandler} = require('./handler.js');

const routes = [
    {
      method: 'POST',
      path: '/books',
      handler: addBookHandler,
    },
  ];
   
  module.exports = routes;