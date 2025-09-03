// protectEducator

import { clerkClient } from "@clerk/express";

export const protectEducator = async (req, res, next) => {
  try {
    // req.auth is an object (NOT a function)
    const auth = req.auth;

    console.log("🔑 Clerk auth object:", auth);

    const userId = auth?.userId;
    console.log("✅ User ID:", userId);

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Not authenticated",
      });
    }

    const user = await clerkClient.users.getUser(userId);

    if (user.publicMetadata.role !== "educator") {
      return res.status(403).json({
        success: false,
        message: "Access denied. Become educator first.",
      });
    }

    next();
  } catch (error) {
    console.error("Educator check failed:", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
