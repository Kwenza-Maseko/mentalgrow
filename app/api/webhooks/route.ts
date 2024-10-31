import { Webhook } from 'svix';
import { headers } from 'next/headers';
import { WebhookEvent } from '@clerk/nextjs/server';
import { createOrUpdateUser, deleteUser } from '@/actions/user.action';
import { connectDB } from '@/db'; // Ensure the correct import path for connectDB

export async function POST(req: Request) {
    await connectDB(); // Ensure the database connection is established

    const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

    if (!WEBHOOK_SECRET) {
        throw new Error('Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local');
    }

    const headerPayload = headers();
    const svix_id = headerPayload.get('svix-id');
    const svix_timestamp = headerPayload.get('svix-timestamp');
    const svix_signature = headerPayload.get('svix-signature');

    if (!svix_id || !svix_timestamp || !svix_signature) {
        return new Response('Error occurred -- no svix headers', {
            status: 400,
        });
    }

    const payload = await req.json();
    const body = JSON.stringify(payload);

    const wh = new Webhook(WEBHOOK_SECRET);

    let evt: WebhookEvent;

    try {
        evt = wh.verify(body, {
            'svix-id': svix_id,
            'svix-timestamp': svix_timestamp,
            'svix-signature': svix_signature,
        }) as WebhookEvent;
    } catch (err) {
        console.error('Error verifying webhook:', err);
        return new Response('Error occurred', {
            status: 400,
        });
    }

    const eventType = evt?.type;
    if (eventType === "user.created" || eventType === "user.updated") {
        const { id, email_addresses, username, image_url, first_name, last_name } = evt?.data;

        try {
            await createOrUpdateUser(
                id, email_addresses, username, image_url, first_name, last_name
            );

            return new Response("User is created or updated", {
                status: 200
            });

        } catch (error) {
            console.log("Error while trying to create a new user", error);
            return new Response('Error occurred', {
                status: 500
            });
        }
    }

    if (eventType === "user.deleted") {
        try {
            const { id } = evt?.data;
            await deleteUser(id);

            return new Response("User deleted successfully", {
                status: 200,
            });

        } catch (error) {
            console.error("Error while trying to delete the user", error);

            return new Response("Error while deleting a user", {
                status: 500,
            });
        }
    }

    return new Response("Event type not handled", { status: 200 });
}
