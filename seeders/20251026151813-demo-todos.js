'use strict';

export async function up(queryInterface, Sequelize) {
  await queryInterface.bulkInsert('Todos', [
    {
      title: 'Finish project report',
      completed: false,
      category_id: 1,
      user_id: 1,
      due_date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      title: 'Buy groceries',
      completed: false,
      category_id: 3,
      user_id: 2,
      due_date: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      title: 'Go to the gym',
      completed: true,
      category_id: 2,
      user_id: 1,
      due_date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      created_at: new Date(),
      updated_at: new Date()
    }
  ], {});
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.bulkDelete('Todos', null, {});
}
