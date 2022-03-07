export default function initUsersController(db) {
  const login = async (req, res) => {
    try {
      console.log(req.body);
      const user = await db.User.findOne({
        where: {
          email: req.body.email,
          password: req.body.password,
        },
      });
      console.log('printing user data...');
      console.log(user);
      // console.log('user password', user.password);

      res.cookie('loggedIn', true);
      res.cookie('userId', user.id);
      res.send(user);
    }
    catch (error) {
      console.log(error);
    }
  };
  return { login };
}
