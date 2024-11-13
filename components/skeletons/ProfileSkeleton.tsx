import React from 'react'

const ProfileSkeleton = () => {
    return (
        <div className="animate-pulse items-center justify-center flex flex-col">
            <div className="w-[120px] h-[37.5px] bg-skeleton rounded-lg"></div>

            <div className="grid justify-center overflow-hidden gap-12 mt-3">
                <div className="relative w-32 h-32">
                    <div className='bg-skeleton w-[128px] h-[128px] rounded-full' />
                </div>
            </div>

            <div className="flex flex-col items-center justify-center mt-4 gap-2">
                <div className='bg-skeleton w-[180px] h-[28px] rounded-xl' />
                <div className='bg-skeleton w-[180px] h-[20px] rounded-xl' />
            </div>

            <div className="mt-4 bg-skeleton w-[112px] h-[40px] rounded-xl" />

            <div className="flex gap-3 justify-center mt-4">
                {["Weight", "Height", "BMI"].map((stat, index) => (
                    <div
                        key={index}
                        className="bg-skeleton rounded-xl p-3 w-[112px] h-[76px] flex flex-col items-center justify-center gap-1"
                    >
                        <div className="bg-skeletonPrimary w-[35px] h-[32px] rounded-lg" />
                        <div className="bg-skeletonPrimary w-[40px] h-[20px] rounded-lg" />
                    </div>
                ))}
            </div>

            <section className="mt-6">
                <div className="grid justify-items-center items-center">
                    <div className='bg-skeleton w-[220px] h-[28px] rounded-xl'/>
                    <div className="mt-6 space-y-4">
                        {["1", "2", "3"].map((stat, index) => (
                            <div
                                key={index}
                                className="bg-skeleton rounded-full p-3 w-[302px] h-[57.6px]"
                            />
                        ))}
                    </div>
                </div>
            </section>

            <div className="flex justify-evenly items-center mt-10 w-full">
                <div className="w-[119px] h-[41.6px] bg-skeleton rounded-lg"/>
                <div className="w-[119px] h-[41.6px] bg-skeleton rounded-lg"/>
            </div>
        </div>
    )
}

export default ProfileSkeleton