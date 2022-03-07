module.exports = {
  up: async (queryInterface) => {
    // Define user data
    const userData = [
      {
        email: 'player1@gmail.com',
        password: 'abc123',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        email: 'player2@gmail.com',
        password: 'abc123',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ];

    // Bulk insert items
    const users = await queryInterface.bulkInsert('users', userData, { returning: true });
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('users', null, {});
  },
};
