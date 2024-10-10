// pages/index.tsx
import Chat from '@/components/Chat';

export default function Message() {
  return (
    <div className='h-svh overflow-y-hidden'>
      <div className='italic p-2 bg-[#6d0d8ad0] text-center m-1 rounded-md text-zinc-200 mb-2'><p>The MentalGrow community is designed for members to connect and interact with each other, fostering a supportive environment</p> </div>
      <div className='h-full overflow-y-scroll'>
        <Chat />
      </div>
    </div>
  );
}
