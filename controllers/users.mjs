export default function initUsersController(db) {
  const login = async (req, res) => {
    try {
      console.log(req.body);

      /*
      The method findOrCreate will create an entry in the table unless it can find one fulfilling the query options. In both cases, it will return an instance (either the found instance or the created instance) and a boolean indicating whether that instance was created or already existed.
      */

      const [userData, created] = await db.User.findOrCreate({
        where: {
          email: req.body.email,
          password: req.body.password,
        },
        defaults: {
        },
      });
      // console.log(userData);
      if (created) {
        console.log(created); // The boolean indicating whether this instance was just created
        res.cookie('loggedIn', true);
        res.cookie('userId', userData.id);
        res.send(`new user with ID ${userData.id} created`);
      } else {
        console.log('printing existing userData...');
        res.cookie('loggedIn', true);
        res.cookie('userId', userData.id);
        res.send(`existing user with ID ${userData.id} logged in`);
      }
    }
    catch (error) {
      console.log('problems have arisen...');
      console.log(error);
      res.send(error);
    }
  };

  return { login };
}
