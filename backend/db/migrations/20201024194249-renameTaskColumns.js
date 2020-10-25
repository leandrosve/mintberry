'use strict';

module.exports = {
  up: async (queryInterface) => { 
      await queryInterface.renameColumn('tasks', 'userId' , 'user_id');
      await queryInterface.renameColumn('tasks', 'createdAt' , 'created_at');
      await queryInterface.renameColumn('tasks', 'startedAt' , 'started_at');
      await queryInterface.renameColumn('tasks', 'finishedAt' , 'finished_at');
      await queryInterface.renameColumn('tasks', 'expiresAt' , 'expires_at');
  },
};
