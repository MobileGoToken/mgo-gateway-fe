import Unibabel from 'browserify-unibabel';
import * as asm from 'asmcrypto.js';

const keyFromPassword = (password, salt) => {
  const passBuffer = Unibabel.utf8ToBuffer(password);
  const saltBuffer = Unibabel.base64ToBuffer(salt);

  return asm.PBKDF2_HMAC_SHA256.bytes(passBuffer, saltBuffer, 10000);
};

const generateSalt = (byteCount = 32) => {
  let view = new Uint8Array(byteCount);
  view = global.crypto.getRandomValues(view);
  return btoa(String.fromCharCode.apply(null, view));
};

export const encrypt = payload => {
  const salt = generateSalt();
  const key = keyFromPassword(payload.password, salt);
  const vector = global.crypto.getRandomValues(new Uint8Array(16));

  const mnemonicData = JSON.stringify(payload.mnemonic);
  const mnemonicBuffer = Unibabel.utf8ToBuffer(mnemonicData);
  const resultBuffer = asm.AES_GCM.encrypt(mnemonicBuffer, key, vector);

  const buffer = new Uint8Array(resultBuffer);
  const vectorStr = Unibabel.bufferToBase64(vector);
  const vaultStr = Unibabel.bufferToBase64(buffer);

  return JSON.stringify({
    data: vaultStr,
    iv: vectorStr,
    salt,
  });
};

export const decrypt = (password, text) => {
  const payload = JSON.parse(text);
  const { salt } = payload;

  const key = keyFromPassword(password, salt);
  const encryptedData = Unibabel.base64ToBuffer(payload.data);
  const vector = Unibabel.base64ToBuffer(payload.iv);

  const result = asm.AES_GCM.decrypt(encryptedData, key, vector);

  const decryptedBuffer = new Uint8Array(result);
  return Unibabel.bufferToUtf8(decryptedBuffer);
};
