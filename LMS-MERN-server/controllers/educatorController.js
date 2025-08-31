import { clerkClient } from "@clerk/express";

export const updateRoleToEducator = async (req, res) => {
  try {
    // First try from Clerk auth
    const auth = req.auth?.();
    let userId = auth?.userId;

    // If testing via Postman, take userId from body
    if (!userId && req.body?.userId) {
      userId = req.body.userId;
    }

    if (!userId) {
      return res.status(400).json({ message: "No userId found (neither Clerk auth nor request body)" });
    }

    // Update Clerk user
    await clerkClient.users.updateUser(userId, {
      publicMetadata: { role: "educator" },
    });

    res.json({ message: "User role updated to educator", userId });
  } catch (error) {
    console.error("Error updating role:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};
