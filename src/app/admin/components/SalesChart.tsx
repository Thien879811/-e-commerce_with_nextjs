'use client';

import { useEffect, useRef } from 'react';

export default function SalesChart() {
  const chartRef = useRef(null);
  
  useEffect(() => {
    // Giả lập dữ liệu biểu đồ
    const mockData = {
      labels: ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9', 'T10', 'T11', 'T12'],
      datasets: [{
        label: 'Doanh thu (triệu đồng)',
        data: [12, 19, 15, 17, 22, 24, 25, 20, 18, 24, 28, 30],
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        borderWidth: 2,
        fill: true,
      }]
    };
    
    // Trong môi trường thực tế, bạn sẽ sử dụng thư viện biểu đồ như Chart.js
    // Đây chỉ là mô phỏng giao diện
    if (chartRef.current) {
      // Giả lập vẽ biểu đồ
      const canvas = chartRef.current as HTMLCanvasElement;
      const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
      
      // Xóa canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Vẽ đường cơ sở
      ctx.beginPath();
      ctx.moveTo(40, 10);
      ctx.lineTo(40, 140);
      ctx.lineTo(470, 140);
      ctx.stroke();
      
      // Vẽ đường biểu đồ
      const points = mockData.datasets[0].data;
      const max = Math.max(...points);
      const width = 400 / points.length;
      
      ctx.beginPath();
      ctx.moveTo(40, 140 - (points[0] / max) * 120);
      
      for (let i = 1; i < points.length; i++) {
        ctx.lineTo(40 + i * width, 140 - (points[i] / max) * 120);
      }
      
      ctx.strokeStyle = '#3b82f6';
      ctx.lineWidth = 2;
      ctx.stroke();
      
      // Vẽ điểm
      for (let i = 0; i < points.length; i++) {
        ctx.beginPath();
        ctx.arc(40 + i * width, 140 - (points[i] / max) * 120, 4, 0, Math.PI * 2);
        ctx.fillStyle = '#3b82f6';
        ctx.fill();
      }
      
      // Vẽ nhãn
      ctx.fillStyle = '#6b7280';
      ctx.font = '10px Arial';
      for (let i = 0; i < mockData.labels.length; i++) {
        ctx.fillText(mockData.labels[i], 35 + i * width, 155);
      }
    }
  }, []);
  
  return (
    <div className="w-full h-64 relative">
      <canvas ref={chartRef} width="480" height="180" className="w-full h-full"></canvas>
      <div className="text-center text-sm text-gray-500 mt-2">
        Doanh thu theo tháng (triệu đồng)
      </div>
    </div>
  );
}