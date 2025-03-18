const adminAuth = (req,res,next)=>{
    const token = 'xyza';

    const isAdminAuthorised = token === "xyz";

    if(!isAdminAuthorised){
        res.status(401).send("admin is not authorised")
    } else {
        next();
    }
}

module.exports = {
    adminAuth
}