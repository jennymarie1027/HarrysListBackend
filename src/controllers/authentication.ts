import express from 'express';
import { createUser, getUserByEmail, getUserById } from '../db/users';
import { random, authentication } from '../helpers';
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(bodyParser.json());

export const login = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.sendStatus(400);
    }

    const user = await getUserByEmail(email);

    if (!user) {
      return res.sendStatus(401);
    }
    // TODO: salt the password?
    if (user.authentication.password !== password) {
      // return res.sendStatus(403);
      return res.status(403).json({ errorMsg: 'Invalid password' });
    }

    const payload = {
      user_id: user._id.toString(),
      email: user.email,
    };
    const options = {
      expiresIn: '1h',
    };
    const jwtBearerToken = jwt.sign(
      payload,
      process.env.ACCESS_TOKEN_SECRET,
      options
    );

    return res.json({
      jwtBearerToken,
      expiresIn: 60,
      email: user.email,
      _id: user._id,
    });
  } catch (err) {
    console.log(err);
    return res.json({ error: err });
  }
};

export const register = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password, passwordConfirmation } = req.body;
    if (!email || !password || !passwordConfirmation) {
      return res.sendStatus(400);
    }
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return res.sendStatus(400);
    }

    if (password !== passwordConfirmation) {
      return res.sendStatus(404);
    }

    const user = await createUser({
      email,
      authentication: {
        password,
      },
    });

    const payload = {
      user_id: user._id.toString(),
      email: user.email,
    };
    const options = {
      expiresIn: '1h',
    };
    const jwtBearerToken = jwt.sign(
      payload,
      process.env.ACCESS_TOKEN_SECRET,
      options
    );
    return res.status(200).json({ email: user.email, jwtBearerToken }).end();
  } catch (err) {
    console.log(err);
    return res.sendStatus(400);
  }
};

export const getCurrentUser = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { authorId } = req.params;
    if (!authorId) {
      return res.sendStatus(400);
    }

    const currentUser = await getUserById(authorId);

    return res.status(200).json({ currentUser }).end();
  } catch (err) {
    console.log(err);
    return res.sendStatus(400);
  }
};
