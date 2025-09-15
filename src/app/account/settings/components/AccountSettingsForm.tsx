// 'use client';

// import { useState } from 'react';
// import { User } from '../../../../types';

// interface AccountSettingsFormProps {
//   user: User;
// }

// export default function AccountSettingsForm({ user }: AccountSettingsFormProps) {
//   const [formData, setFormData] = useState({
//     name: user.name || '',
//     email: user.email || '',
//     phone: user.phone || '',
//   });
  
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [message, setMessage] = useState({ type: '', text: '' });
  
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };
  
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);
//     setMessage({ type: '', text: '' });
    
//     try {
//       const response = await fetch('/api/users/profile', {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData),
//       });
      
//       if (response.ok) {
//         setMessage({ type: 'success', text: 'Thông tin đã được cập nhật thành công!' });
//       } else {
//         const error = await response.json();
//         setMessage({ type: 'error', text: error.message || 'Đã xảy ra lỗi khi cập nhật thông tin.' });
//       }
//     } catch (error) {
//       setMessage({ type: 'error', text: 'Đã xảy ra lỗi khi cập nhật thông tin.' });
//     } finally {
//       setIsSubmitting(false);
//     }
//   };
  
//   return (
//     <form onSubmit={handleSubmit}>
//       {message.text && (
//         <div className={`p-3 mb-4 rounded-md ${
//           message.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
//         }`}>
//           {message.text}
//         </div>
//       )}
      
//       <div className="grid grid-cols-1 gap-4">
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">Họ và tên</label>
//           <input
//             type="text"
//             name="name"
//             value={formData.name}
//             onChange={handleChange}
//             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             required
//           />
//         </div>
        
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
//           <input
//             type="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             required
//           />
//         </div>
        
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">Số điện thoại</label>
//           <input
//             type="tel"
//             name="phone"
//             value={formData.phone}
//             onChange={handleChange}
//             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>
//       </div>
      
//       <div className="mt-6">
//         <button
//           type="submit"
//           disabled={isSubmitting}
//           className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors disabled:bg-blue-400 disabled:cursor-not-allowed"
//         >
//           {isSubmitting ? 'Đang cập nhật...' : 'Cập nhật thông tin'}
//         </button>
//       </div>
//     </form>
//   );
// }