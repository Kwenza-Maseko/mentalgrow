'use client';

import { useEffect, useState } from 'react';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { db } from '@/firebase';
import { useUser } from '@clerk/nextjs';
import Link from 'next/link';

interface Conversation {
    id: string;
    userId: string;
}

const TherapistConversations = () => {
    const { user } = useUser();
    const therapistId = user?.id; // Assuming therapist is the logged-in user
    const [conversations, setConversations] = useState<Conversation[]>([]);

    useEffect(() => {
        if (therapistId) {
            const q = query(collection(db, 'messages'), where('therapistUserId', '==', therapistId));
            const unsubscribe = onSnapshot(q, (snapshot) => {
                const convos = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                })) as Conversation[];
                setConversations(convos);
            });

            return () => unsubscribe();
        }
    }, [therapistId]);

    return (
        <div className="p-5">
            <h2>My Conversations</h2>
            <ul className="mt-4">
                {conversations.map((convo) => (
                    <li key={convo.id} className="mb-2">
                        <Link href={`/therapist/chat/${convo.id}`}>
                            <a className="text-blue-500 underline">Chat with User {convo.userId}</a>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TherapistConversations;
