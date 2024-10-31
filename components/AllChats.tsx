// AllChats.tsx
import React from 'react';

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

interface AllChatsProps {
    messages: Message[];
    currentUserId: string; // to differentiate message alignment
}

const AllChats: React.FC<AllChatsProps> = ({ messages, currentUserId }) => {
    return (
        <div className="messages mt-5 h-full p-4 overflow-y-auto">
            {messages.map((msg) => (
                <div
                    key={msg.id}
                    className={`message ${msg.userId === currentUserId ? 'text-right message-sent' : 'text-left message-received'}`}
                >
                    <p>{msg.message}</p>
                </div>
            ))}
        </div>
    );
};

export default AllChats;
