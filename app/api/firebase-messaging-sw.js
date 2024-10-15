// import { NextApiRequest, NextApiResponse } from 'next';
// import fs from 'fs';
// import path from 'path';

// export default function handler(req: NextApiRequest, res: NextApiResponse) {
//   const filePath = path.join(process.cwd(), 'public', 'firebase-messaging-sw.js');
//   const fileContents = fs.readFileSync(filePath, 'utf8');

//   res.setHeader('Content-Type', 'application/javascript');
//   res.setHeader('Service-Worker-Allowed', '/');
//   res.status(200).send(fileContents);
// }