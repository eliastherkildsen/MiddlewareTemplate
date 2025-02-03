import jwt from "jsonwebtoken";
const currentTime = Math.floor(Date.now() / 1000);
const expiration_time:number = currentTime + 100; // 100 sekunder fra nu!
const private_key = '1234'; // Altså vores server-side secret

const claims:object = {
    'studentID': '123',
    'studentName':'Jørgen Hansen',
    'exp': expiration_time
};

const jwt_token = jwt.sign(claims, private_key, { algorithm: 'HS256' });
console.log(jwt_token);
console.log(jwt.verify(jwt_token,private_key));
console.log(jwt.decode(jwt_token)); // bemærk outputtet