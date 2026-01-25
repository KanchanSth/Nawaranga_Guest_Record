export const authorizeRoles = (...allowedRoles)=>{
    return (req,res,next)=>{
         if (!req.authUser || !req.authUser.role) {
      return res.status(401).json({ message: "Unauthorized" });
    }

        if(!allowedRoles.includes(req.authUser.role))
        {
            return res.status(403).json({message: "Access denied"});
        }
        next();

    }
}