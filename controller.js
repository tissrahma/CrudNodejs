const User = require('./model.js');
const userController = {

  createUser: async (req, res) => {
   
      const newUser = await User.create({ 
        FirstName:req.body.FirstName,
        LastName:req.body.LastName,
        Age:req.body.Age,
        Sex:req.body.Sex,
    Image:`${req.protocol}://${req.get("host")}/img/${req.file.filename}`,
        });
      res.status(201).json(newUser);
   
  },

  getAllUsers: async (req, res) => {
    try {
      const users = await User.find();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch users.' });
    }
  },

  getUserById: async (req, res) => {
    try {
      const user = await User.findById(req.params._id);
      if (!user) {
        return res.status(404).json({ message: 'User not found.' });
      }
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch user.' });
    }
  },
  getUserByName: async (req, res) => {
  
      const user = await User.findOne({FirstName:req.params.FirstName});
      if (!user) {
        return res.status(404).json({ message: 'User not found.' });
      }
      res.status(200).json(user._id);
    
  },
  updateUserById: async (req, res) => {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params._id,
        {
          FirstName: req.body.FirstName,
          LastName: req.body.LastName,
          Sex: req.body.Sex,
          Age: req.body.Age,
        },
        { new: true } 
      );
  
      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found.' });
      }
  
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update user.' });
    }
  },
  
  

  deleteUserById: async (req, res) => {
    try {
      const deletedUser = await User.findByIdAndDelete(req.params._id);
      if (!deletedUser) {
        return res.status(404).json({ message: 'User not found.' });
      }
      res.status(200).json({ message: 'User deleted successfully.' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete user.' });
    }
  },
};
module.exports = userController;

