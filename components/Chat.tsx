// components/Chat.tsx
'use client'

import { useEffect, useRef, useState } from 'react';
import { collection, addDoc, query, onSnapshot, orderBy, serverTimestamp } from 'firebase/firestore';
import { db } from '@/firebase';
import { format } from 'date-fns';
import { useUser } from '@clerk/nextjs';
import Image from 'next/image';
import { FaReply } from "@react-icons/all-files/fa/FaReply";
import { IoClose } from "@react-icons/all-files/io5/IoClose";
import { IoMdSend } from "@react-icons/all-files/io/IoMdSend";
import { FaTruckLoading } from "@react-icons/all-files/fa/FaTruckLoading";
import { FaAngleDoubleDown } from "@react-icons/all-files/fa/FaAngleDoubleDown";

interface Message {
    id: string;
    text: string;
    timestamp: {
        seconds: number;
    };
    formattedTimestamp?: string;
    userId: string;
    userImage: string;
    name: string;
    email: string;
    username: string;
    parentMessageId?: string | null; // Add this line to support replies
}
const Chat = () => {
    const { user } = useUser();
    const [isSending, setIsSending] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState('');
    const [replyingTo, setReplyingTo] = useState<Message | null>(null);
    const [text, setText] = useState<string>('');
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    let lastDisplayedDate: string = '';

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "instant" });
    }, [messages]);

    const handleScroll = (() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    });

    useEffect(() => {
        const q = query(collection(db, 'messages'), orderBy('timestamp'));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const messages: Message[] = snapshot.docs.map((doc) => {
                const data = doc.data();
                const timestamp = data.timestamp?.toDate();
                return {
                    id: doc.id,
                    text: data.text,
                    timestamp: data.timestamp,
                    formattedTimestamp: timestamp ? format(timestamp, 'PPpp') : '',
                    userId: data.userId,
                    userImage: data.userImage,
                    name: data.name,
                    email: data.email,
                    username: data.username,
                    parentMessageId: data.parentMessageId || null,  // Include parentMessageId
                };
            });
            setMessages(messages);
        });
        return () => unsubscribe();
    }, []);

    const handleSendMessage = async (parentMessageId: string | null = null) => {
        if (newMessage.trim() && user) {
            setIsSending(true);
            try {
                await addDoc(collection(db, 'messages'), {
                    text: newMessage,
                    timestamp: serverTimestamp(),
                    userId: user.id,
                    userImage: user.imageUrl || '',
                    name: user.fullName || '',
                    email: user.emailAddresses.length > 0 ? user.emailAddresses[0].emailAddress : '',
                    username: user.username || '',
                    parentMessageId: parentMessageId,  // Attach parentMessageId if present
                });
                setNewMessage('');
                setReplyingTo(null);  // Clear the reply state after sending
            } catch (error) {
                console.error('Error sending message: ', error);
            } finally {
                setIsSending(false);
            }
        }
    };


    const handleReply = (message: Message) => {
        setReplyingTo(message);
    };

    return (
        <div className="p-3 h-full">
            <div className="h-[550px] overflow-y-scroll">
                <div className="">
                    {messages.map((message) => {
                        const messageDate = message?.formattedTimestamp?.split(',')[0];
                        const messageYear = message?.formattedTimestamp?.split(',')[1]; // Extract date part
                        const combine = messageDate + ", " + messageYear;
                        const isNewDate = messageDate !== lastDisplayedDate;

                        if (isNewDate && messageDate) {
                            lastDisplayedDate = messageDate;
                        }

                        return (
                            <div key={message.id}>
                                {isNewDate && messageDate && (
                                    <div className="text-center mt-8 mb-6 text-gray-500">
                                        <span className="bg-[#383868] text-zinc-300 text-[9pt] px-2 py-1 rounded-lg">
                                            {combine}
                                        </span>
                                    </div>
                                )}

                                <div className="messages">
                                    <div className={`message ${message.userId === user?.id ? 'message-sent' : 'message-received'}`}>
                                        {message.parentMessageId && (
                                            <div className="reply-preview bg-zinc-300 p-2 mb-2 rounded-lg">
                                                <div className="text-xs text-gray-500">Replying to:</div>
                                                <div className="flex gap-1 items-center mt-1 mb-2 rounded-md p-2 bg-zinc-400">
                                                    <Image
                                                        src={messages.find((parentMsg) => parentMsg.id === message.parentMessageId)?.userImage || "Unknown"}
                                                        alt="User Avatar"
                                                        className="user-avatar rounded-full"
                                                        width={25}
                                                        height={25}
                                                    />
                                                    <div className='text-zinc-600'>
                                                        <p className='font-bold'>
                                                            {messages.find((parentMsg) => parentMsg.id === message.parentMessageId)?.name || "Unknown"}
                                                        </p>
                                                        <p className='text-[9pt]'>
                                                            @{messages.find((parentMsg) => parentMsg.id === message.parentMessageId)?.username || "Unknown"}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="text-gray-600">
                                                    {messages.find((parentMsg) => parentMsg.id === message.parentMessageId)?.text || "Original message not found"}
                                                </div>
                                            </div>
                                        )}

                                        <div className="message-header">
                                            <div className={`flex items-center ${message.userId === user?.id ? 'hidden' : 'block'}`}>
                                                <div className="flex gap-2 m_header mb-4 w-full">
                                                    <div>
                                                        <img
                                                            src={message.userImage || "logo.jpg"}
                                                            alt="User Avatar"
                                                            className="user-avatar rounded-full"
                                                            width={35}
                                                            height={35}
                                                        />
                                                    </div>
                                                    <div>
                                                        <div className="name font-bold">{message.name}</div>
                                                        <div className="text-[9pt]">@{message.username}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div>{message.text}</div>
                                        <div className="timestamp text-[7pt]">{message?.formattedTimestamp?.split(',')[2]}</div>

                                        {/* Reply button */}
                                        <div className={`flex items-center ${message.userId === user?.id ? 'hidden' : 'block'}`}>
                                            <button onClick={() => handleReply(message)} className='bg-transparent rounded-md'>
                                                <FaReply />
                                            </button>
                                            <div className='bg-zinc-400 rounded-md w-full px-2 py-1 m-2'>
                                                Reply to @{message.username}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div ref={messagesEndRef} />

                                <div className="fixed right-0 bottom-[150px] z-10 p-2 rounded-full bg-[#383868] cursor-pointer"
                                    onClick={handleScroll}>
                                    <FaAngleDoubleDown />
                                </div>
                            </div>
                        );
                    })}

                </div>

                {/* Replying to */}
                {replyingTo && (
                    <div className='w-full bg-[#060627] fixed p-2 left-0 bottom-[160px] bottom-[145px] md:bottom-[80px] md:left-[210px] '>
                        <div className="replying-to flex gap-5 bg-[#6d0d8a] rounded-md p-2 w-fit ">
                            <div>
                                Replying to
                                <div className='flex gap-1 items-center mb-2 mt-1'>
                                    <div>
                                        <img
                                            src={replyingTo.userImage || "/logo.jpg"}
                                            alt="User Avatar"
                                            className="user-avatar rounded-full"
                                            width={30}
                                            height={30}
                                        />
                                    </div>
                                    <div className='font-bold'>{replyingTo.username} <br />
                                        <span className='font-normal'> {replyingTo.email}</span></div>
                                </div>
                                &quot;{replyingTo.text}&quot;
                            </div>
                            <div>
                                <button onClick={() => setReplyingTo(null)}><IoClose /></button>
                            </div>
                        </div>
                    </div>
                )}

            </div>
            {/* Message input */}
            <div className="input-container bg-[#060627] p-[1rem] sm:flex absolute right-0 left-0 bottom-[80px] sm:bottom-[10px] md:relative">
                <textarea
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message here..."
                    disabled={isSending}
                    className='bg-zinc-700 w-full'
                    style={{
                        lineHeight: '1.5',
                        resize: 'none',
                    }}
                />
                <button
                    className='bg-[#6d0d8a]'
                    onClick={() => handleSendMessage(replyingTo?.id || null)} disabled={isSending}>
                    {isSending ?
                        <FaTruckLoading className='text-[16pt] text-zinc-900' /> :
                        <IoMdSend className='text-[16pt] text-zinc-900' />
                    }
                </button>
            </div>
        </div>
    );
};

export default Chat;
