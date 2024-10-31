// actions/user.action.ts
import { User } from "@/models/user.model";
import { connectDB } from "@/db";

export const createOrUpdateUser = async (
    id: any,
    email_addresses: any,
    username: any,
    image_url: any,
    first_name: any,
    last_name: any
) => {

    try {
        await connectDB();

        const user = await User.findOneAndUpdate(
            { clerk_id: id },
            {
                $set: {
                    email: email_addresses[0].email_address,
                    username: username,
                    imagePhoto: image_url,
                    firstName: first_name,
                    lastName: last_name
                },
            },
            { upsert: true, new: true }
        )

        await user.save();
        return user;

    } catch (error) {
        console.error(error)
    }
};

export const deleteUser = async (id: any) => {
    try {
        await connectDB();
        await User.findOneAndDelete({ clerk_id: id });
    } catch (error) {
        console.error(error);
    }
}