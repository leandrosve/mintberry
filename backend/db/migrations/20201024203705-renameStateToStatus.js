'use strict';

module.exports = {
  up: async (queryInterface) => { 
      await queryInterface.renameColumn('tasks', 'state' , 'status');
  },
};
