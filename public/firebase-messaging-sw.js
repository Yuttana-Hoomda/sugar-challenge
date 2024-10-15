importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyDKRpZBbRQjYJ2J0VdRbyD-VzBVbK-5T4g",
  authDomain: "fcm-demo-sugar.firebaseapp.com",
  projectId: "fcm-demo-sugar",
  storageBucket: "fcm-demo-sugar.appspot.com",
  messagingSenderId: "676194310278",
  appId: "1:676194310278:web:0213d8745427db513a1907",
  measurementId: "G-BL9DGBQMJQ"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  console.log('[firebase-messaging-sw.js] ได้รับข้อความ background ', payload);
  // ปรับแต่งการแจ้งเตือนที่นี่
  const notificationTitle = 'หัวข้อข้อความ Background';
  const notificationOptions = {
    body: 'เนื้อหาข้อความ Background',
    icon: '/firebase-logo.png'
  };

  self.registration.showNotification(notificationTitle,
    notificationOptions);
});