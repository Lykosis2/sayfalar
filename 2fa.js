import * as speakeasy from 'speakeasy'
import * as qrcode from 'qrcode'

/**
 * Generates a random base32 secret for 2FA.
 *
 * @returns {string} The base32 secret
 */
export function generate2FASecret() {
  const secret = speakeasy.generateSecret({
    length: 20,
    step: 30,
  })

  return secret.base32
}

/**
 * Converts a given secret to a QR code as a data URL.
 *
 * @param {string} secret The base32 secret
 * @param {string} label An identifier for the account (e.g., email)
 * @param {string} issuer The provider of the 2FA (e.g., your app name)
 *
 * @returns {string} QRCode in data url
 */
export async function secretToQRCode(secret, label, issuer) {
  const otpauthURL = speakeasy.otpauthURL({
    secret,
    label,
    issuer,
    encoding: 'base32',
  })

  const dataURL = await qrcode.toDataURL(otpauthURL)
  return dataURL
}

/**
 * Verifies the provided OTP against the given secret.
 *
 * @param {string} secret The base32 secret
 * @param {string} otp The one-time password to verify
 *
 * @returns {boolean}
 */
export function verifyOTP(secret, otp) {
  return speakeasy.totp.verify({
    secret,
    encoding: 'base32',
    token: otp,
    step: 30,
    window: 1,
  })
}
