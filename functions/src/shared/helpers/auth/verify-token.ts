import * as admin from 'firebase-admin';

export const verifyToken = async (req: any) => {
    const authorizationHeader = req.get('Authorization') as string;
    
    if (!authorizationHeader.includes("Bearer")) {
        return false;
    }
    
    const token = authorizationHeader.split('Bearer ')[1];

    console.log(token)
    return admin.auth().verifyIdToken(token)
      .then((decoded) => true)
      .catch((err) => false);
}
