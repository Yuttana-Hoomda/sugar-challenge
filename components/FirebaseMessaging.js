'use client';

import React, { useEffect } from 'react';

const FirebaseMessaging = () => {
  useEffect(() => {
    const loadFirebaseAndRequestPermission = async () => {
      if (typeof window !== 'undefined' && 'Notification' in window) {
        const { initializeApp } = await import('firebase/app');
        const { getMessaging, getToken, onMessage } = await import('firebase/messaging');

        const firebaseConfig = {
          apiKey: "AIzaSyDKRpZBbRQjYJ2J0VdRbyD-VzBVbK-5T4g",
          authDomain: "fcm-demo-sugar.firebaseapp.com",
          projectId: "fcm-demo-sugar",
          storageBucket: "fcm-demo-sugar.appspot.com",
          messagingSenderId: "676194310278",
          appId: "1:676194310278:web:0213d8745427db513a1907",
          measurementId: "G-BL9DGBQMJQ"
        };

        const app = initializeApp(firebaseConfig);
        const messaging = getMessaging(app);

        console.log('กำลังขอสิทธิ์...');
        const permission = await Notification.requestPermission();

        if (permission === 'granted') {
          console.log('ได้รับสิทธิ์การแจ้งเตือนแล้ว');

          try {
            // ลงทะเบียน Service Worker
            if ('serviceWorker' in navigator) {
              const registration = await navigator.serviceWorker.register('/firebase-messaging-sw.js', { scope: '/' });
              console.log('ลงทะเบียน Service Worker แล้วด้วยขอบเขต:', registration.scope);
            }

            const currentToken = await getToken(messaging, {
              vapidKey: "BKnD88fZLBKE3tBlSOnPZ7fphgjVdXf2n1MUEnoFJ4ux9gMpzg0PJR0w_ojoIoT-BGGGsn_KMCvAN_ECWaLvEmQ"
            });

            if (currentToken) {
              console.log('FCM Token: ', currentToken);
              // ส่งโทเค็นไปยังเซิร์ฟเวอร์ของคุณที่นี่
            } else {
              console.log('ไม่สามารถรับโทเค็น FCM ได้ ไม่ได้รับสิทธิ์');
            }
          } catch (err) {
            console.log('เกิดข้อผิดพลาดขณะรับโทเค็น ', err);
          }

          onMessage(messaging, (payload) => {
            console.log('ได้รับข้อความ ', payload);
            // จัดการกับข้อความที่เข้ามาที่นี่
          });
        } else {
          console.log('ถูกปฏิเสธสิทธิ์การแจ้งเตือน');
        }
      } else {
        console.log('API การแจ้งเตือนไม่รองรับในสภาพแวดล้อมนี้');
      }
    };

    loadFirebaseAndRequestPermission();
  }, []);

  return null; // หรือส่งคืน JSX ถ้าจำเป็น
};

export default FirebaseMessaging;