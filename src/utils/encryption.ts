/* eslint-disable @typescript-eslint/no-explicit-any */
import CryptoJS from "crypto-js";

export class Encryption {
  static encrypt(value: any): string {
    return CryptoJS.AES.encrypt(
      JSON.stringify(value),
      import.meta.env.VITE_APP_SECRET_KEY as string
    ).toString();
  }

  static decrypt(value: string): string {
    return CryptoJS.AES.decrypt(
      value,
      import.meta.env.VITE_APP_SECRET_KEY as string
    ).toString(CryptoJS.enc.Utf8);
  }
}
