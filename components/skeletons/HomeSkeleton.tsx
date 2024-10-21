import React from 'react'

const HomeSkeleton = () => {
  return (
    <div className='h-full flex flex-col animate-pulse'>
        <div className='bg-skeleton rounded-xl py-2 px-4'>
            <div className='flex items-center justify-between mt-2'>
                <div className='bg-skeletonPrimary rounded-xl w-[155px] h-7'/>
                <div className='bg-skeletonPrimary rounded-full h-5 w-5'/>
            </div>
            <div className='flex-center py-6'>
                <div className='bg-skeletonPrimary h-[165px] w-[165px] rounded-full'/>
            </div>
        </div>

        <div className='space-y-5 mt-12'>
            <div className='bg-skeleton h-8 w-20 rounded-xl mt-2'/>
            <div className='grid grid-cols-2 grid-flow-row justify-items-center items-center gap-5'>

                <div className='bg-skeleton w-[160px] h-[110px] rounded-xl grid grid-cols-2 gap-2 p-2'>
                    <div className='flex flex-col justify-center items-center gap-2'>
                        <div className='bg-skeletonPrimary w-14 h-14 rounded-lg'/>
                        <div className='bg-skeletonPrimary w-6 h-4 rounded-md'/>
                    </div>
                    <div className='flex flex-col justify-between items-center'>
                        <div className='bg-skeletonPrimary w-full h-5 rounded-xl'/>
                        <div className='bg-skeletonPrimary w-full h-5 rounded-xl'/>
                        <div className='bg-skeletonPrimary w-full h-5 rounded-xl'/>
                    </div>
                </div>

                <div className='bg-skeleton w-[160px] h-[110px] rounded-xl grid grid-cols-2 gap-2 p-2'>
                    <div className='flex flex-col justify-center items-center gap-2'>
                        <div className='bg-skeletonPrimary w-14 h-14 rounded-lg'/>
                        <div className='bg-skeletonPrimary w-6 h-4 rounded-md'/>
                    </div>
                    <div className='flex flex-col justify-between items-center'>
                        <div className='bg-skeletonPrimary w-full h-5 rounded-xl'/>
                        <div className='bg-skeletonPrimary w-full h-5 rounded-xl'/>
                        <div className='bg-skeletonPrimary w-full h-5 rounded-xl'/>
                    </div>
                </div>

                <div className='bg-skeleton w-[160px] h-[110px] rounded-xl grid grid-cols-2 gap-2 p-2'>
                    <div className='flex flex-col justify-center items-center gap-2'>
                        <div className='bg-skeletonPrimary w-14 h-14 rounded-lg'/>
                        <div className='bg-skeletonPrimary w-6 h-4 rounded-md'/>
                    </div>
                    <div className='flex flex-col justify-between items-center'>
                        <div className='bg-skeletonPrimary w-full h-5 rounded-xl'/>
                        <div className='bg-skeletonPrimary w-full h-5 rounded-xl'/>
                        <div className='bg-skeletonPrimary w-full h-5 rounded-xl'/>
                    </div>
                </div>

                <div className='bg-skeleton w-[160px] h-[110px] rounded-xl grid grid-cols-2 gap-2 p-2'>
                    <div className='flex flex-col justify-center items-center gap-2'>
                        <div className='bg-skeletonPrimary w-14 h-14 rounded-lg'/>
                        <div className='bg-skeletonPrimary w-6 h-4 rounded-md'/>
                    </div>
                    <div className='flex flex-col justify-between items-center'>
                        <div className='bg-skeletonPrimary w-full h-5 rounded-xl'/>
                        <div className='bg-skeletonPrimary w-full h-5 rounded-xl'/>
                        <div className='bg-skeletonPrimary w-full h-5 rounded-xl'/>
                    </div>
                </div>
                
            </div>
        </div>
    </div>
  )
}

export default HomeSkeleton