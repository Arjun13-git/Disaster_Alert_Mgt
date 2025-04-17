import jwt from 'jsonwebtoken';
const Token=(id)=>{
    const token=jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn: "7d"
    });
}
export default Token