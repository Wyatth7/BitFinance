// import sha256 from 'crypto-js/sha256';
// import hmacSHA512 from 'crypto-js/hmac-sha512';
// import Base64 from 'crypto-js/enc-base64';

import sha256 = require("crypto-js/sha256");
import hmacSHA512 = require('crypto-js/hmac-sha512');
import Base64 = require('crypto-js/enc-base64');
import { environment } from "../../../environment/environment";

export abstract class Encryptor {

    public static base64Encryption(str: string): string {

        const hashDigest = this.sha256Hash(str);

        return Base64.stringify(hmacSHA512(hashDigest, environment.secretKey));
    }

    public static sha256Hash(str: string) { 
        return sha256(str);
    }
}