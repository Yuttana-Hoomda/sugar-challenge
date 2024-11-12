import React from 'react';

const CalendarSkeleton = () => {
  return (
    <div className="flex flex-col items-center animate-pulse space-y-5">
      <div className="bg-skeleton rounded-xl w-[350px] h-[350px] p-4 space-y-4">
        
        <div className="bg-skeletonPrimary flex items-center h-9 rounded-lg mt-4"></div>

        <div className="bg-skeletonPrimary flex items-center h-6 rounded-lg"></div>

        <div className="bg-skeletonPrimary flex items-center h-52 rounded-xl"></div>

      </div>

      <div className="bg-skeleton rounded-xl w-[300px] h-[200px] flex flex-col items-center p-4 space-y-3">
        <div className="bg-skeletonPrimary flex justify-center h-9 w-32 rounded-md mt-2"></div>
        <div className="h-[100px] w-full bg-skeletonPrimary rounded-md"></div>
      </div>
    </div>
  );
};

export default CalendarSkeleton;
