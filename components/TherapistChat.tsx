// TherapistChat.tsx
'use client'
import { useState, useEffect } from 'react';
import { collection, addDoc, onSnapshot, orderBy, query, serverTimestamp } from 'firebase/firestore';
import { db } from '@/firebase';
import { useUser } from '@clerk/nextjs';
import { IoMdSend } from "@react-icons/all-files/io/IoMdSend";

interface Message {
    id: string;
    message: string;
    userId: string;
    therapistId: string;
    timestamp: {
        seconds: number;
        nanoseconds: number;
    };
}

interface TherapistChatProps {
    chatId: string;
}

const TherapistChat: React.FC<TherapistChatProps> = ({ chatId }) => {
    const { user } = useUser();
    const [messages, setMessages] = useState<Message[]>([]);
    const [message, setMessage] = useState('');

    // Fetch messages in real-time for the selected chat
    useEffect(() => {
        const q = query(
            collection(db, 'chats', chatId, 'messages'),
            orderBy('timestamp')
        );
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const fetchedMessages: Message[] = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            } as Message));
            setMessages(fetchedMessages);
        });

        return () => unsubscribe();
    }, [chatId]);

    // Function to send a message as the therapist
    const sendMessage = async () => {
        if (!message.trim()) return;
        try {
            const chatRef = collection(db, 'chats', chatId, 'messages');
            await addDoc(chatRef, {
                therapistId: user?.id,
                message,
                timestamp: serverTimestamp(),
            });
            setMessage('');
        } catch (error) {
            console.error("Error sending message:", error);
        }
    };

    return (
        <div className="p-5">
            <h3>Chat</h3>
            <div className="messages overflow-y-auto">
                {messages.map((msg) => (
                    <div key={msg.id} className={`message ${msg.userId === user?.id ? 'text-right message-sent' : 'text-left message-received'}`}>
                        <p>{msg.message}</p>
                    </div>
                ))}
            </div>
            <div className="mt-5 flex gap-3 items-center">
                <textarea
                    className="w-full border p-2"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your message here"
                />
                <button className="mt-2 bg-blue-500 text-white p-2" onClick={sendMessage}>
                    <IoMdSend />
                </button>
            </div>
        </div>
    );
};

export default TherapistChat;
