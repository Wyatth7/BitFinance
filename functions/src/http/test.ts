import { onRequest } from "firebase-functions/v2/https";

// use this function as a guide to making other functions
export const testFunc = onRequest(
    {cors: true},
    (request, response) => {
      response.status(200).json(
        {
          result: "This is a test Function response",
        }
      );
    }
  );
  