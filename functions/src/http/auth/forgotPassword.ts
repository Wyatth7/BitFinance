import { onRequest } from "firebase-functions/v2/https";
import * as admin from 'firebase-admin'
//import { FirestoreCollections } from "../../shared/enums/firestore-collections";
//import { ResetPasswordModel } from "../../shared/models/auth/reset-password-model";
//import { UserModel } from "../../shared/models/auth/user-model";
import { badRequestResponse, okResponse } from "../../shared/responses/responses";
//import { users } from "../..";



export const forgotPassword = onRequest(
    {cors: true},
    async (req, res) => {
        const userSnapshot = await admin.firestore()
                                        .collection('0')
                                        .where('email', '==',req.body.data.email)
                                        .where('userName', '==', req.body.data.userName)
                                        .get();

        if (userSnapshot.empty) {
           return badRequestResponse(`Could not find user with the email and username`, res);
        }
                                        
        const allData = userSnapshot.docs;
        const data = allData[0].data();

        return okResponse(data, 201, res);    

    }
)

            // let user: UserModel | null = null;
            
            // const doc = userSnapshot.docs.pop();


            // userSnapshot.forEach(fetchedUser => {
            //     user = fetchedUser.data() as UserModel;
            // });
                
            
           // res.send({});


            // res.send({
            //     firstNumber: "6",
            //     secondNumber: "6",
            //     operator: "+",
            //     operationResult: "12",
            //   });


            // if (userSnapshot.empty) {
            //     return badRequestResponse(`Could not find user with the email`, res);
            // }

            // userSnapshot.forEach(userData => {
            //     console.log(userData.id, " => ", userData.data);
            // })


            // let user: UserModel;

            // let userArray: UserModel[] = [];
            
            // userSnapshot.forEach(userData => {
            //     user = userData.data() as UserModel;
            //     userArray.push(user);
            // })

            // let thisUser = userSnapshot.docs[0].data() as UserModel;

            // return res.status(201).json({
            //     name: "console",
            //     age: "23"
            // });

            // var name = userArray[0].firstName;

            // console.log(name);

            // res.send(userArray[0]);
            



        // let user: UserModel | null;

        // userSnapshot.forEach(userData => user = userData.data() as UserModel);

        // return okResponse(user?.email, 201, res);

        // await admin.auth().updateUser(user?.uid!, {

        //     password: newPasswordModel.newPassword

