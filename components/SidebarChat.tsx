'use client';

import { useEffect, useState } from 'react';
import { collection, query, onSnapshot, orderBy } from 'firebase/firestore';
import { db } from '@/firebase';
import { format } from 'date-fns';
import { useUser } from '@clerk/nextjs';

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
}

const SidebarChat = () => {
    const { user } = useUser();
    const [messages, setMessages] = useState<Message[]>([]);

    useEffect(() => {
        const q = query(collection(db, 'messages'), orderBy('timestamp'));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const fetchedMessages: Message[] = snapshot.docs.map((doc) => {
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
                };
            });

            // Filter out the currently logged-in user's messages
            const filteredMessages = fetchedMessages.filter(msg => msg.userId !== user?.id);

            // Create a map to store only the last message from each unique user
            const uniqueMessagesMap = new Map<string, Message>();
            filteredMessages.forEach(msg => {
                uniqueMessagesMap.set(msg.userId, msg); // This will replace any earlier message by the same user
            });

            // Convert the map back to an array
            setMessages(Array.from(uniqueMessagesMap.values()));
        });
        return () => unsubscribe();
    }, [user?.id]);

    const truncateMessage = (text: string) => {
        return text.length > 10 ? text.slice(0, 10) + '...' : text;
    };

    return (
        <div className="mt-2">
            <h2 className='font-bold mb-3'>Community Interacters</h2>
            <div className="messages h-[360px] overflow-y-scroll">
                {messages.map((message) => (
                    <div key={message.id} className="">
                        <div className="">
                            <div className="flex items-center gap-2">
                                <div>
                                    <img
                                        src={message.userImage}
                                        alt="User Avatar"
                                        className="user-avatar rounded-full"
                                        width={30}
                                        height={30}
                                        style={{ borderRadius: '50%', objectFit:"cover"}}
                                        
                                    />
                                </div>
                                <div>
                                    <div className="font-semibold">@{message.username}</div>
                                    <div className="text-zinc-400">{truncateMessage(message.text)}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SidebarChat;
