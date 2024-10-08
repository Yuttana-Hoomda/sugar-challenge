"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface CreateUserFormProps {
  email: string;
}

export default function CreateUserForm({ email }: CreateUserFormProps) {
  const [formData, setFormData] = useState({
    gender: '',
    weight: '',
    height: '',
    email: email || '',
  });
  const [error, setError] = useState('');
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch('/api/createuser', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          weight: Number(formData.weight),
          height: Number(formData.height),
          bmi: calculateBMI(Number(formData.weight), Number(formData.height)),
        })
      });

      if (res.ok) {
        const data = await res.json();
        console.log('Profile updated:', data);
        // Redirect to the data fetching page
        router.push(`/home`); // Adjust this URL to your actual data fetching page
      } else {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Failed to update profile');
      }
    } catch (error: any) {
      console.error('Error updating profile:', error);
      setError(error.message || 'An error occurred while updating the profile');
    }
  };

  //Calculate BMI

  const calculateBMI = (weight: number, height: number) => {
    const heightInMeters = height / 100;
    return (weight / (heightInMeters * heightInMeters)).toFixed(2);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
      <select 
        name="gender" 
        value={formData.gender} 
        onChange={handleChange} 
        required
        className="w-full p-2 border rounded"
      >
        <option value="">เลือกเพศ</option>
        <option value="male">ชาย</option>
        <option value="female">หญิง</option>
        <option value="other">อื่นๆ</option>
      </select>
      <input
        type="number"
        name="weight"
        value={formData.weight}
        onChange={handleChange}
        placeholder="น้ำหนัก (กก.)"
        required
        className="w-full p-2 border rounded"
      />
      <input
        type="number"
        name="height"
        value={formData.height}
        onChange={handleChange}
        placeholder="ส่วนสูง (ซม.)"
        required
        className="w-full p-2 border rounded"
      />
      <button 
        type="submit"
        className="w-full p-2 bg-blue-500 text-black rounded hover:bg-blue-600"
      >
        บันทึกข้อมูล
      </button>
      {error && <p className="text-red-500">{error}</p>}
    </form>
  );
}


// "use client"; // เพิ่มเพื่อบอกว่า component นี้ต้องทำงานบนฝั่ง client

// import { useState } from 'react';
// import { useSession } from 'next-auth/react';
// import { useRouter } from 'next/navigation';

// export default function CreateUserForm() {
//   const { data: session, status } = useSession();
//   const router = useRouter();
//   const [formData, setFormData] = useState({
//     gender: '',
//     weight: '',
//     height: ''
//   });
//   const [error, setError] = useState('');

//   // ถ้า session ยังไม่ถูกโหลด
//   if (status === 'loading') {
//     return <p>Loading session...</p>;
//   }

//   // ถ้าไม่มี email ใน session
//   if (!session?.user?.email) {
//     return <p>Session email is required. Please log in.</p>;
//   }

//   const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const calculateBMI = (weight: number, height: number) => {
//     const heightInMeters = height / 100;
//     return (weight / (heightInMeters * heightInMeters)).toFixed(2);
//   };

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setError('');
//     const bmi = calculateBMI(Number(formData.weight), Number(formData.height));

//     try {
//       const res = await fetch('/api/createuser', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           email: session?.user?.email,
//           name: session?.user?.name,
//           ...formData,
//           weight: Number(formData.weight),
//           height: Number(formData.height),
//           bmi: Number(bmi)
//         })
//       });

//       if (res.ok) {
//         const data = await res.json();
//         console.log('Profile updated:', data);
//         router.push('/getUser');
//       } else {
//         const errorData = await res.json();
//         throw new Error(errorData.message || 'Failed to update profile');
//       }
//     } catch (error) {
//       console.error('Error updating profile:', error);
//       setError(error.message || 'An error occurred while updating the profile');
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
//       <select
//         name="gender"
//         value={formData.gender}
//         onChange={handleChange}
//         required
//         className="w-full p-2 border rounded"
//       >
//         <option value="">เลือกเพศ</option>
//         <option value="male">ชาย</option>
//         <option value="female">หญิง</option>
//         <option value="other">อื่นๆ</option>
//       </select>
//       <input
//         type="number"
//         name="weight"
//         value={formData.weight}
//         onChange={handleChange}
//         placeholder="น้ำหนัก (กก.)"
//         required
//         className="w-full p-2 border rounded"
//       />
//       <input
//         type="number"
//         name="height"
//         value={formData.height}
//         onChange={handleChange}
//         placeholder="ส่วนสูง (ซม.)"
//         required
//         className="w-full p-2 border rounded"
//       />
//       <button
//         type="submit"
//         className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//       >
//         บันทึกข้อมูล
//       </button>
//       {error && <p className="text-red-500">{error}</p>}
//     </form>
//   );
// }



// "use client";
// import { useState } from 'react';
// import { useSession } from 'next-auth/react';
// import { useRouter } from 'next/navigation';

// export default function CreateUserForm() {
//   const { data: session } = useSession();
//   const router = useRouter();
//   const [formData, setFormData] = useState({
//     gender: '',
//     weight: '',
//     height: ''
//   });
//   const [error, setError] = useState('');

//   const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const calculateBMI = (weight: number, height: number) => {
//     const heightInMeters = height / 100;
//     return (weight / (heightInMeters * heightInMeters)).toFixed(2);
//   };

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setError('');
//     const bmi = calculateBMI(Number(formData.weight), Number(formData.height));
    
//     try {
//       const res = await fetch('/api/createuser', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           email: session?.user?.email,
//           name: session?.user?.name, // เพิ่ม name
//           ...formData,
//           weight: Number(formData.weight),
//           height: Number(formData.height),
//           bmi: Number(bmi)
//         })
//       });

//       if (res.ok) {
//         const data = await res.json();
//         console.log('Profile updated:', data);
//         router.push('/getUser');
//       } else {
//         const errorData = await res.json();
//         throw new Error(errorData.message || 'Failed to update profile');
//       }
//     } catch (error) {
//       console.error('Error updating profile:', error);
//       setError(error.message || 'An error occurred while updating the profile');
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
//       <select 
//         name="gender" 
//         value={formData.gender} 
//         onChange={handleChange} 
//         required
//         className="w-full p-2 border rounded"
//       >
//         <option value="">เลือกเพศ</option>
//         <option value="male">ชาย</option>
//         <option value="female">หญิง</option>
//         <option value="other">อื่นๆ</option>
//       </select>
//       <input
//         type="number"
//         name="weight"
//         value={formData.weight}
//         onChange={handleChange}
//         placeholder="น้ำหนัก (กก.)"
//         required
//         className="w-full p-2 border rounded"
//       />
//       <input
//         type="number"
//         name="height"
//         value={formData.height}
//         onChange={handleChange}
//         placeholder="ส่วนสูง (ซม.)"
//         required
//         className="w-full p-2 border rounded"
//       />
//       <button 
//         type="submit"
//         className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//       >
//         บันทึกข้อมูล
//       </button>
//     </form>
//   );
// }