// components/Chat.tsx
'use client'

import { useEffect, useState } from 'react';
import { collection, addDoc, query, onSnapshot, orderBy, serverTimestamp } from 'firebase/firestore';
import { db } from '@/firebase';
import { format } from 'date-fns';
import { useUser } from '@clerk/nextjs';
import Image from 'next/image';

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

const Chat = () => {
    const { user } = useUser();
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState('');
    const [isSending, setIsSending] = useState(false);

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
                };
            });
            setMessages(messages);
        });
        return () => unsubscribe();
    }, []);

    const handleSendMessage = async () => {
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
                });
                setNewMessage('');
            } catch (error) {
                console.error('Error sending message: ', error);
            } finally {
                setIsSending(false);
            }
        }
    };

    return (
        <div className="chat-container">
            <div className="messages">
                {messages.map((message) => (
                    <div key={message.id} className={`message ${message.userId === user?.id ? 'message-sent' : 'message-received'}`}>
                        <div className="message-header">
                            <div className="flex gap-2 m_header">
                                <div>
                                    <img
                                        src={message.userImage}
                                        alt="User Avatar"
                                        className="user-avatar rounded-full"
                                        width={35}
                                        height={35}
                                    />
                                </div>
                                <div>
                                    <div className="name font-bold">{message.username}</div>
                                    <div className="user-email">{message.email}</div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-5">{message.text}</div>
                        <div className="timestamp">{message.formattedTimestamp}</div>
                    </div>
                ))}
            </div>
            <div className="input-container">
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message here..."
                    disabled={isSending}
                />
                <button onClick={handleSendMessage} disabled={isSending}>
                    {isSending ?
                        <Image src="/mailing.png" width={24} height={24} alt="sending" className="chat_icon" /> :
                        <Image src="/send.png" width={24} height={24} alt="send" className="chat_icon" />
                    }
                </button>
            </div>
        </div>
    );
};

export default Chat;
