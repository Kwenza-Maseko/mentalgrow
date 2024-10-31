'use client';

import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { doc, getDoc, collection, addDoc, onSnapshot, orderBy, query, serverTimestamp } from 'firebase/firestore';
import { db } from '@/firebase';
import { useUser } from '@clerk/nextjs';
import { IoMdSend } from "@react-icons/all-files/io/IoMdSend";

interface TherapistData {
    name: string;
    occupation: string;
    location: string;
    userId: string;
    userImage: string;
    email: string;
    username: string;
}

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

const TherapistMessages = () => {
    const params = useParams();
    const { user } = useUser();
    const therapistId = params?.id; // therapist ID from URL
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState<Message[]>([]); // Store messages
    const [therapist, setTherapist] = useState<TherapistData | null>(null);

    // Generate unique chat ID for the user-therapist conversation
    const chatId = user?.id && therapistId ? `${user.id}_${therapistId}` : null;

    // Fetch therapist data by ID
    useEffect(() => {
        if (therapistId) {
            const fetchTherapist = async () => {
                const docRef = doc(db, 'therapists', therapistId as string);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    const data = docSnap.data() as TherapistData;
                    setTherapist(data);
                } else {
                    console.error('No such document!');
                }
            };
            fetchTherapist();
        }
    }, [therapistId]);

    useEffect(() => {
        if (chatId) {
            const q = query(
                collection(db, 'chats', chatId, 'messages'),
                orderBy('timestamp')
            );
            const unsubscribe = onSnapshot(q, (snapshot) => {
                const messages: Message[] = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                } as Message));
                setMessages(messages);
            });

            return () => unsubscribe();
        }
    }, [chatId]);

    // Function to send a new message
    const sendMessage = async () => {
        if (!message.trim()) return;
        try {
            if (chatId) {
                const chatRef = collection(db, 'chats', chatId, 'messages');
                await addDoc(chatRef, {
                    userId: user?.id,
                    userImage: user?.imageUrl,
                    userName: user?.firstName,
                    therapistId,
                    therapistUserId: therapist?.userId,
                    message,
                    timestamp: serverTimestamp(),
                });
                setMessage('');
            }
        } catch (error) {
            console.error("Error sending message:", error);
        }
    };

    return (
        <div className="p-5">
            <h2>Conversation with {therapist?.name || "Therapist"}</h2>

            {/* Message list */}
            <div className="mt-5 h-full messages p-4 overflow-y-auto">
                {messages.map((msg) => (
                    <div key={msg.id} className={`message ${msg.userId === user?.id ? 'text-right message-sent' : 'text-left message-received'}`}>
                        <p>{msg.message}</p>
                    </div>
                ))}
            </div>

            {/* Textarea and Send Button */}
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

export default TherapistMessages;
