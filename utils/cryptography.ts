/**
 * The Cryptography class provides a set of methods to encrypt and decrypt data using OpenPGP.js.
 * @see https://openpgpjs.org/
 * 
 * Crypto is for cryptography, not crypto currencies. - Ricardo
 * 
 * - The reason why I chose OpenPGP.js is because it's a modern and well maintained library.
 * - The reason why I'm using the class syntax is because I might want to be able to extend this class in the future.
 * - The reason why I'm using the async/await and arrow function syntax is because it's easier to read and write.
 * 
 * This stuff is all personal preference, but I think it's important to explain why I'm doing things the way I'm doing them.
 * 
 * Anyway, this class provides a set of methods to get some details from a public key, generate new random keys and to encrypt, so
 * that the website visitor can sesnd me an encrypted message. A tad overkill, but it's fun to play around with.
 * 
 * Still reading? You're awesome! I hope you enjoy the rest of the code.
 */

import * as openpgp from 'openpgp';

export interface extractNameAndEmailFromPublicKeyOptions {
  publicKey: string;
}

/**
 * This function gets the user's name and email address from the public key they provided.
 * @param {object} options The options object.s
 * @param {string} options.publicKey The public key the user provided.
 * @returns {Promise<{ name: string; email: string; }>} The user's name and email address.
 */
export const extractNameAndEmailFromPublicKey = async ({publicKey}: extractNameAndEmailFromPublicKeyOptions) => {
  const pubKeyDetails = await openpgp.readKey({armoredKey: publicKey});

  const primaryUser = await pubKeyDetails.getPrimaryUser();
  const { name, email } = primaryUser.user.userID;

  return { name, email };
};


export interface encryptMessageOptions extends Record<string, string> {
  publicKey: string;
  privateKey?: string;
  message: string;
}

/**
 * This function encrypts the message the user provided with the public key they provided.
 * @param {object} options The options object.
 * @param {string} options.publicKey The public key the user provided.
 * @param {string} options.privateKey The private key the user provided.
 * @param {string} options.message The message to encrypt.
 * @returns {Promise<string>} The PGP-encrypted message.
 */
export const encryptMessage = async ({publicKey, message}: encryptMessageOptions) : Promise<string> => {
  const pubKey = await openpgp.readKey({armoredKey: publicKey});
  const encrypted = await openpgp.encrypt({
      message: await openpgp.createMessage({ text: message }),
      encryptionKeys: pubKey,
  });

  return encrypted.toString();
};

export interface fetchPublicKeyOptions{
  source?: 'local' | 'remote'; // Source of the public key, local or remote. Default is 'remote'.
  remoteEndpoint?: string;     // Remote endpoint to fetch the public key from, if source is remote. Default is 'https://ricardo.nu/files/pubkey.asc'
  useFallback?: boolean;       // Whether to use a fallback public key if the remote endpoint fails. Default is true.
}

/**
 * This function fetches the public key used to encrypt messages.
 * @param {object} options The options object.
 * @param {string} options.source The source of the public key, local or remote. Default is 'remote'.
 * @param {string} options.remoteEndpoint The remote endpoint to fetch the public key from, if source is remote. Default is '/files/pubkey.asc'
 * @param {boolean} options.useFallback Whether to use a fallback public key if the remote endpoint fails. Default is true.
 * @returns {Promise<string>} The public key.
 * @throws {Error} If the public key could not be fetched, and useFallback is false.
 * @example
 * const publicKey = await fetchPublicKey();
 * const publicKey = await fetchPublicKey({source: 'local'});
 * const publicKey = await fetchPublicKey({source: 'remote', remoteEndpoint: 'https://ricardo.nu/files/pubkey.asc'});
 * const publicKey = await fetchPublicKey({source: 'remote', remoteEndpoint: 'https://ricardo.nu/files/pubkey.asc', useFallback: false});
 */

export const fetchPublicKey = async ({ source = 'remote', remoteEndpoint = '/files/pubkey.asc', useFallback = true } : fetchPublicKeyOptions = {}) => {
  const fallbackValue = `-----BEGIN PGP PUBLIC KEY BLOCK-----

mDMEWko5fBYJKwYBBAHaRw8BAQdAW8Z1e64iUZf6H2tX53Gd0zeFDpM8OcbVLAMg
pNKawmW0FFJpY2FyZG8gQmFsayAoRW1haWwpiJYEExYIAD4WIQQLRweFx3D2FiDY
BIIEnwJVSs94eQUCWko5fAIbAQUJPDDlRAULCQgHAgYVCgkICwIEFgIDAQIeAQIX
gAAKCRAEnwJVSs94eRVgAQDkHXBenIjIg3B4CatlmWzFEEHygSNaTwShX0kVEWrk
7wD/RWHJb4qG71K5ULOygOtSrhPIrXV39imAGZI4vUpKxQiIdQQTFggAHRYhBL58
RIHgVmKRtJTSoW+0oSTGNxjGBQJaSjl8AAoJEG+0oSTGNxjGLX4A/2lLoh6n6Kuq
H45nn5pAEr7YcmSgHfPh0b8UJVhybE2jAQD6JVLzsmljyJPaeM5JKDL+S7sftUfH
HAAJR15EmDsJBrgzBFpKOXwWCSsGAQQB2kcPAQEHQISvWhVzH4MYJMaXTiiIRm0I
DGa42V2dNmMeJvPvjfnViPUEGBYIACYWIQQLRweFx3D2FiDYBIIEnwJVSs94eQUC
Wko5fAIbAgUJCWYBgACBCRAEnwJVSs94eXYgBBkWCAAdFiEEM1bVI+k+jIGMFuZN
OO63YsTQ/rYFAlpKOXwACgkQOO63YsTQ/rYMswEAlpTtduzxx0phVQRL3hugoWnh
J3sAZlCp7TDgft0xsAwA/0F5bLQMSXpRblUG7Jt71rV8Pb9U3Jre9ral4gW9gloJ
adQA/R8bvKRoafcYH2h5UJ8DKj5J4ZNyTWJqiXVQ2OIFYjygAQC9iw7s8AFDbDmG
BPVIIjv68OQiNaCHkgmqJpwcFWVeC7g4BFpKOXwSCisGAQQBl1UBBQEBB0C8lLNV
0x6XQwysr+citOgl4m0/8NAIhoCp7GizbVA8NAMBCAeIfgQYFggAJhYhBAtHB4XH
cPYWINgEggSfAlVKz3h5BQJaSjl8AhsMBQkJZgGAAAoJEASfAlVKz3h5Q6gA/0jF
mzql7ZsKdAt8VrcO7NL5Jel20w/X6VtvyG3Gi/rMAQCRzzxEkc9DpQXC9XClcpXS
ZH4Dxm577SFdMmEDdTkiBA==
=TnMU
-----END PGP PUBLIC KEY BLOCK-----`;

  if (source === 'local')
    return fallbackValue;
  
  try {
    const response = await fetch(remoteEndpoint);

    if (response.ok) {
      return await response.text();
    } else {
      if (useFallback) {
        return fallbackValue;
      } else {
        throw new Error(`Could not fetch public key from ${remoteEndpoint}. Source is set to '${source}' and useFallback is set to '${useFallback}'.`);
      }
    }

  } catch (error) {
      throw error;
  }
};

export default { extractNameAndEmailFromPublicKey, encryptMessage, fetchPublicKey };