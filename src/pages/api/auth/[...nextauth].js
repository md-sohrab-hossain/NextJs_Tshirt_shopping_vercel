import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

import { User } from '../../../Backend/models/user';
import dbConnect from '../../../Backend/config/dbConfig';

export default NextAuth({
  providers: [
    Providers.Credentials({
      tshirt_session: {
        jwt: true,
      },
      async authorize(credentials) {
        dbConnect();

        const { email, password } = credentials;

        // Check if email and password is entered
        if (!email || !password) {
          throw new Error('Please enter email or password');
        }

        //Find user in the databae
        const user = await User.findOne({ email }).select('+password');

        if (!user) {
          throw new Error('Invalid email or Password');
        }

        // Check if password is correct or not
        const isPasswordMatched = await user.comparePassword(password);
        if (!isPasswordMatched) {
          throw new Error('Invalid Email or Password');
        }

        return Promise.resolve(user);
      },
    }),
  ],
  callbacks: {
    jwt: async (token, user) => {
      user && (token.user = user);
      return Promise.resolve(token);
    },
    session: async (session, user) => {
      session.user = user.user;
      return Promise.resolve(session);
    },
  },
});
