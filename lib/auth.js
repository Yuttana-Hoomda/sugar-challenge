export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account.provider === "google") {
        const { name, email } = user;
        if (!name || !email) {
          throw new Error("User information not found");
        }
        try {
          await connectToDB();
          const userDoc = await User.findOne({ email });

          if (userDoc) {
            return '/home';
          } else {
            await User.create({
              name,
              email,
              gender: '',
              weight: 0,
              height: 0,
              bmi: 0,
              beverageHistory: [],
              dailySugar: []
            });
            return true; 
          }
        } catch (error) {
          console.error(error);
          return `/auth/error?error=${encodeURIComponent(error.message)}`;
        }
      }
      return true;
    },
    async session({ session, token }) {
      await connectToDB();
      const userDoc = await User.findOne({ email: session.user.email });
      if (userDoc) {
        session.user.id = token.sub;
        session.user.gender = userDoc.gender;
        session.user.weight = userDoc.weight;
        session.user.height = userDoc.height;
        session.user.bmi = userDoc.bmi;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.gender = user.gender;
        token.weight = user.weight;
        token.height = user.height;
        token.bmi = user.bmi;
      }
      return token;
    }
  },
};
