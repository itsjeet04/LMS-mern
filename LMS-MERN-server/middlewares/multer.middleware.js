import multer from "multer" ; 

// Multer is a middleware saves it locally or in memory.

const storage = multer.diskStorage({
  })

export const upload = multer({storage})