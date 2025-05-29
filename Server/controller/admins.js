import jwt from 'jsonwebtoken';
import bcrypt, { hash } from 'bcrypt';
import pool from '../config/db.js'; // Assuming this is ESM
import db from '../models/index.js';
import { Op } from 'sequelize';

const Admin = db.admins;

export async function login(req, res) {
  const { nippm, password } = req.body;

  try {
    // Fetch user including password using scope
    const user = await Admin.findOne({ where: { nippm } });

    console.log(user)

    if (!user) {
      return res.status(401).json({ error: 'Failed to login, please register first!' });
    }

    // Compare password with hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    console.log(isPasswordValid, password, user.password)

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Failed to login, Invalid NIPPM or password!', isPasswordValid: isPasswordValid, password: password, user: user.password });
    }

    // Create token
    const token = jwt.sign(
      { id: user.id, role: user.role, nippm: user.nippm },
      process.env.SECRET_ACCESS_TOKEN,
      { expiresIn: '20m' }
    );

    console.log(token)

    // Cookie options
    const cookieOptions = {
      maxAge: 20 * 60 * 1000,
      httpOnly: true,
      secure: true,
      sameSite: 'None'
    };

    res.cookie('SessionID', token, cookieOptions);

    // Remove password before sending user data
    const { password: pwd, ...userData } = user.dataValues;

    // const responseData = { ...userData, token };
    return res.status(200).json({ message: 'Login successful', user: userData, token: token, cookieOptions: cookieOptions });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

export async function logout(req, res) {
  res.clearCookie('SessionID', {
    httpOnly: true,
    sameSite: 'none',
    secure: process.env.NODE_ENV === 'production',
  });
  res.status(200).json({ message: 'Logout success' });
}

export async function deleteById(req, res) {
  try {
    const findById = await Admin.findByPk(req.params.id);
    if (!findById) {
      return res.status(404).json({ message: 'User not found' });
    }

    const result = await findById.destroy();

    res.json(result);
    console.log(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting user' });
  }
}

export async function findAll(req, res) {
  try {
    const result = await Admin.findAll();
    res.json(result);
    console.log(result);
  } catch (error) {
    console.error('Error', error);
    res.status(500).json({
      err: 'Failed: ' + error.message,
    });
  }
}

export async function registerAdmins(req, res) {
  try {
    const { id, nippm, password, role } = req.body;

    const user = await Admin.findOne({ where: { nippm } });

    if (user) {
      return res.status(401).json({ error: 'Already registered!' });
    }

    // No need to compare password here since user doesn't exist yet

    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = await Admin.create({
      id,
      nippm,
      password: hashedPassword,
      role,
    });

    res.status(201).json({
      message: 'Registered successfully',
      admin: newAdmin,
    });
  } catch (error) {
    console.error('Error registering admin', error);
    console.log('Request Body: ', req.body);

    if (!res.headersSent) {
      res.status(500).json({
        error: 'Failed to register',
        detail: error.message,
      });
    }
  }
}

export async function resetPassword(req, res) {
  try {
    const { nippm, oldpassword, newpassword } = req.body;

    if(!nippm || !oldpassword || !newpassword){
      return res.status(400).json({error: 'please enter the old password and the new password'})
    }

    const user = await Admin.findOne({
      where: {nippm}
    })
    if (!user){
      return res.status(400).json({error: 'User does not exist, please check again'})
    }

    const isMatch = await bcrypt.compare(oldpassword, user.password)
    if(!isMatch){
      return res.status(401).json({error: 'Incorrect password! Please check again'})
    }

    const hashedNewPassword = await bcrypt.hash(newpassword, 10);
    user.password = hashedNewPassword;
    await user.save();

    return res.status(200).json({ message: 'Password successfully updated' });
  } catch (error) {
    console.error('Error resetting password', error);
    res.status(500).json({ error: 'Failed to reset password' });
  }
}

export async function searchAdmins(req, res) {
  try {
    const admin = await Admin.findOne({
      where: {
        nippm: {
          [Op.iLike]: `%${req.params.nippm}%`, // Case-insensitive match
        },
      },
    });
    res.json(admin);
  } catch (error) {
    console.error('Error searching admin', error);
    res.status(500).json({
      error: 'Failed: ' + error.message,
    });
  }
}
