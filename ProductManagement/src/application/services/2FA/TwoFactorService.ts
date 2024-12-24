import speakeasy from "speakeasy";
import QRCode from "qrcode"
import { SECRET_KEY_2FA}  from "@/config";
// export function generate_secret_key() {
    // Generate a secret key
    const secretKey = speakeasy.generateSecret({ length: 20 });
  // console.log(secretKey);
  //   return secretKey;
  // }

export function generateQRCodeURL() {
    return new Promise((resolve, reject) => {
      const secretKey = speakeasy.generateSecret({ length: 20 });
        QRCode.toDataURL(secretKey.otpauth_url, (err, dataURL) => {
            if (err) {
                reject(err);
            } else {
                resolve({dataURL,secretKey});
            }
        });
    });
}
export function verifyOTP(data) {
  const {otp} = data
  console.log(otp)
  const verified = speakeasy.totp.verify({
    secret: 'KR3VCSTBLNUUERJVM5HE45R6NV5EOIZ2',
    encoding: "base32",
    token: otp,
  });

  return verified;
}