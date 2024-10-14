// pages/index.tsx
import Chat from '@/components/Chat';

export default function Message() {
  return (
    <div className='h-svh overflow-y-hidden'>
      <div className='italic p-2 bg-[#383868] text-center m-1 rounded-md text-zinc-200 mb-2 text-[9pt]'><p>The MentalGrow community is designed for members to connect and interact with each other, fostering a supportive environment</p> </div>
      <div className='overflow-y-scroll'>
        <Chat />
      </div>
    </div>
  );
}
