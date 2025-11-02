'use strict';

import bcrypt from 'bcrypt';

export async function up(queryInterface, Sequelize) {
  await queryInterface.bulkInsert('Users', [
    {
      username: 'alice',
      email: 'alice@example.com',
      password: await bcrypt.hash('password123', 10),
      role: 'user',
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      username: 'bob',
      email: 'bob@example.com',
      password: await bcrypt.hash('mypassword', 10),
      role: 'user',
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      username: 'admin',
      email: 'admin@example.com',
      password: await bcrypt.hash('adminpass', 10),
      role: 'admin',
      created_at: new Date(),
      updated_at: new Date()
    }
  ], {});
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.bulkDelete('Users', null, {});
}

