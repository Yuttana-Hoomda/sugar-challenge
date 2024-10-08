import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import { connectToDB } from "@/utils/connectToDB";
import User from "@/models/user";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account.provider === "google") {
        const { name, email } = user;
        if (!name || !email) {
          throw new Error("ไม่พบข้อมูล name หรือ email");
        }
        try {
          await connectToDB();
          let userDoc = await User.findOne({ email });
          
          if (!userDoc) {
            userDoc = await User.create({
              name,
              email,
              gender: '',
              weight: 0,
              height: 0,
              bmi: 0,
              dailySugar: []
            });
            return `/createUser?email=${encodeURIComponent(email)}`;
          }
          
          // ตรวจสอบว่าข้อมูลครบถ้วนหรือไม่
          if (!userDoc.gender || userDoc.weight === 0 || userDoc.height === 0) {
            return `/createUser?email=${encodeURIComponent(email)}`;
          }
          
          return true;
        } catch (error) {
          console.error("เกิดข้อผิดพลาดระหว่างการเข้าสู่ระบบ:", error);
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
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

// import NextAuth from "next-auth/next";
// import GoogleProvider from "next-auth/providers/google";
// import { connectToDB } from "@/utils/connectToDB";
// import User from "@/models/user";

// export const authOptions = {
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     }),
//   ],
//   callbacks: {
//     async signIn({ user, account }) {
//       if (account.provider === "google") {
//         const { name, email } = user;
//         if (!name || !email) {
//           throw new Error("ไม่พบข้อมูล name หรือ email");
//         }
//         try {
//           await connectToDB();
//           let userDoc = await User.findOneAndUpdate(
//             { email },
//             {
//               $setOnInsert: {
//                 name,
//                 email,
//                 gender: '',
//                 weight: 0,
//                 height: 0,
//                 bmi: 0,
//                 currentSugar: 0,
//                 beverageHistory: [],
//                 dailySugar: []
//               }
//             },
//             { new: true, upsert: true }
//           );
//           if (!userDoc.gender || userDoc.weight === 0 || userDoc.height === 0) {
//             return `/createUser?email=${encodeURIComponent(email)}`;
//           }
//           return true;
//         } catch (error) {
//           console.error("เกิดข้อผิดพลาดระหว่างการเข้าสู่ระบบ:", error);
//           return `/auth/error?error=${encodeURIComponent(error.message)}`;
//         }
//       }
//       return true;
//     },
//     async session({ session, token }) {
//       await connectToDB();
//       const userDoc = await User.findOne({ email: session.user.email });
//       if (userDoc) {
//         session.user.id = token.sub;
//         session.user.gender = userDoc.gender;
//         session.user.weight = userDoc.weight;
//         session.user.height = userDoc.height;
//         session.user.bmi = userDoc.bmi;

//         // ส่งข้อมูลไปยัง /getUser
//         try {
//           const response = await fetch('/getUser', {
//             method: 'POST',
//             headers: {
//               'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({
//               id: session.user.id,
//               email: session.user.email,
//               name: session.user.name,
//               gender: session.user.gender,
//               weight: session.user.weight,
//               height: session.user.height,
//               bmi: session.user.bmi,
//             }),
//           });

//           if (!response.ok) {
//             throw new Error('Failed to send user data to /getUser');
//           }

//           const result = await response.json();
//           console.log('User data sent successfully:', result);
//         } catch (error) {
//           console.error('Error sending user data to /getUser:', error);
//         }
//       }
//       return session;
//     },
//   },
// };

// const handler = NextAuth(authOptions);

// export { handler as GET, handler as POST };

// import NextAuth from "next-auth/next";
// import GoogleProvider from "next-auth/providers/google";
// import { connectToDB } from "@/utils/connectToDB";
// import User from "@/models/user";

// export const authOptions = {
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     }),
//   ],
//   callbacks: {
//     async signIn({ user, account }) {
//       if (account.provider === "google") {
//         const { name, email } = user;
//         if (!name || !email) {
//           throw new Error("ไม่พบข้อมูล name หรือ email");
//         }
//         try {
//           await connectToDB();
//           let userDoc = await User.findOneAndUpdate(
//             { email },
//             {
//               $setOnInsert: {
//                 name,
//                 email,
//                 gender: '',
//                 weight: 0,
//                 height: 0,
//                 bmi: 0,
//                 currentSugar: 0,
//                 beverageHistory: [],
//                 dailySugar: []
//               }
//             },
//             { new: true, upsert: true }
//           );
//           if (!userDoc.gender || userDoc.weight === 0 || userDoc.height === 0) {
//             return `/createUser?email=${encodeURIComponent(email)}`;
//           }
//           return true;
//         } catch (error) {
//           console.error("เกิดข้อผิดพลาดระหว่างการเข้าสู่ระบบ:", error);
//           return `/auth/error?error=${encodeURIComponent(error.message)}`;
//         }
//       }
//       return true;
//     },
//     async session({ session, token }) {
//       await connectToDB();
//       const userDoc = await User.findOne({ email: session.user.email });
//       if (userDoc) {
//         session.user.id = token.sub;
//         session.user.gender = userDoc.gender;
//         session.user.weight = userDoc.weight;
//         session.user.height = userDoc.height;
//         session.user.bmi = userDoc.bmi;
//       }
//       return session;
//     },
//   },
// };

// const handler = NextAuth(authOptions);

// export { handler as GET, handler as POST };

// import { connectToDB } from "@/utils/connectToDB";
// import User from "@/models/user";
// import NextAuth from "next-auth/next";
// import GoogleProvider from "next-auth/providers/google";

// export const authOptions = {
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     }),
//   ],
//   callbacks: {
//     async signIn({ user, account }) {
//       if (account.provider === "google") {
//         const { name, email } = user;

//         if (!name || !email) {
//           throw new Error("ไม่พบข้อมูล name หรือ email");
//         }

//         try {
//           await connectToDB();
//           let userDoc = await User.findOneAndUpdate(
//             { email },
//             {
//               $setOnInsert: {
//                 name,
//                 email,
//                 gender: '',
//                 weight: 0,
//                 height: 0,
//                 bmi: 0,
//                 currentSugar: 0,
//                 beverageHistory: [],
//                 dailySugar: []
//               }
//             },
//             { new: true, upsert: true }
//           );

//           if (!userDoc.gender || userDoc.weight === 0 || userDoc.height === 0) {
//             return `/createUser?email=${encodeURIComponent(email)}`;
//           }

//           console.log("SignIn callback:", user, account);
//           return true;
//         } catch (error) {
//           console.error("เกิดข้อผิดพลาดระหว่างการเข้าสู่ระบบ:", error);
//           return `/auth/error?error=${encodeURIComponent(error.message)}`;
//         }
//       }
//       return true;
//     },
//     async session({ session, token }) {
//       await connectToDB();
//       const userDoc = await User.findOne({ email: session.user.email });

//       if (userDoc) {
//         session.user.id = token.sub;
//         session.user.gender = userDoc.gender;
//         session.user.weight = userDoc.weight;
//         session.user.height = userDoc.height;
//         session.user.bmi = userDoc.bmi;
//       }
//       console.log("Session callback:", session);
//       return session;
//     },
//   },
// };

// const handler = NextAuth(authOptions);

// export { handler as GET, handler as POST };


// import { connectToDB } from "@/utils/connectToDB";
// import User from "@/models/user";
// import NextAuth from "next-auth/next";
// import GoogleProvider from "next-auth/providers/google";

// export const authOptions = {
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     }),
//   ],
//   callbacks: {
//     async signIn({ user, account }) {
//       if (account.provider === "google") {
//         const { name, email } = user;
        
//         // ตรวจสอบ name และ email
//         if (!name || !email) {
//           throw new Error("ไม่พบข้อมูล name หรือ email");
//         }

//         try {
//           await connectToDB();
//           let userDoc = await User.findOneAndUpdate(
//             { email },
//             {
//               $setOnInsert: {
//                 name,
//                 email,
//                 gender: '',
//                 weight: 0,
//                 height: 0,
//                 bmi: 0,
//                 currentSugar: 0,
//                 beverageHistory: [],
//                 dailySugar: []
//               }
//             },
//             { new: true, upsert: true }
//           );

//           // ถ้าข้อมูลยังไม่ครบ รีไดเรกต์ไปยังหน้ากรอกข้อมูลเพิ่มเติม
//           if (!userDoc.gender || userDoc.weight === 0 || userDoc.height === 0) {
//             return `/createUser?email=${encodeURIComponent(email)}`;
//           }

//           // ถ้าข้อมูลครบแล้ว ให้ไปยังหน้าหลัก
//           return true;
//         } catch (error) {
//           console.error("เกิดข้อผิดพลาดระหว่างการเข้าสู่ระบบ:", error);
//           return `/auth/error?error=${encodeURIComponent(error.message)}`;
//         }
//       }
//       return true;
//     },
//     async session({ session, token }) {
//       await connectToDB();
//       const userDoc = await User.findOne({ email: session.user.email });

//       session.user.id = token.sub;
//       session.user.gender = userDoc.gender;
//       session.user.weight = userDoc.weight;
//       session.user.height = userDoc.height;
//       session.user.bmi = userDoc.bmi;

//       return session;
//     },
//   },
// };

// const handler = NextAuth(authOptions);

// export { handler as GET, handler as POST };



// import { connectToDB } from "@/utils/connectToDB";
// import User from "@/models/user";
// import NextAuth from "next-auth/next";
// import GoogleProvider from "next-auth/providers/google";

// export const authOptions = {
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     }),
//   ],
//   callbacks: {
//     async signIn({ user, account }) {
//       if (account.provider === "google") {
//         const { name, email } = user;
//         try {
//           await connectToDB();
//           let userDoc = await User.findOne({ email });

//           if (!userDoc) {
//             userDoc = await User.create({
//               name,
//               email,
//               gender: '',
//               weight: 0,
//               height: 0,
//               bmi: 0,
//               currentSugar: 0,
//               beverageHistory: [],
//               dailySugar: []
//             });
//             // ถ้าเป็นผู้ใช้ใหม่ ให้ redirect ไปยังหน้ากรอกข้อมูลเพิ่มเติม
//             return '/createUser';
//           }

//           // ตรวจสอบว่าข้อมูลครบหรือไม่
//           if (!userDoc.gender || userDoc.weight === 0 || userDoc.height === 0) {
//             return '/createUser';
//           }

//           // ถ้าข้อมูลครบแล้ว ให้ไปยังหน้าหลัก
//           return true;
//         } catch (error) {
//           console.error("เกิดข้อผิดพลาดระหว่างการเข้าสู่ระบบ:", error);
//           return `/auth/error?error=${encodeURIComponent(error.message)}`;
//         }
//       }
//       return true;
//     },
//     async session({ session, token }) {
//       session.user.id = token.sub;
//       return session;
//     },
//   },
// };

// const handler = NextAuth(authOptions);

// export { handler as GET, handler as POST };