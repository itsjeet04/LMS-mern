import {clerkClient} from "@clerk/express";

export const updateRoleToEducator = async (req, res) => {
    try {
        const userId = req.auth.userId; //// Clerk automatically attaches req.auth when using clerkMiddleware()
        await clerkClient.users.updateUser(userId, {
            publicMetadata : {
                role : "educator"
            }
        })
        res.status(200).json({message : "Role updated to educator"});

    } catch (error) {
        console.error("Error updating role:", error);
        res.status(500).json({message : "Failed to update role"});
    }
}