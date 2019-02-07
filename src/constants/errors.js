export const ERROR_CODES = {
  USER_EXISTS: '1',
  USER_DOES_NOT_EXIST: '2',
  OLD_PASS: '3', // When updating known password, if provided old password does not match with (current) password.
  PASS_NO_MATCH: '4', // When registering user, if password and matchPassword values are not valid.
  INVALID_CREDENTIALS: '5', // Upon "Log In" into the application, if the provided username or password are not valid.
  WRONG_USER: '6', // When accessing my profile, if profile not found.

  TOKEN_EXPIRED: '10', // Token provided has expired.
  TOKEN_NOT_FOUND: '11', // Token is not found in the database.

  REGION_NOT_FOUND: '20',
  ROLE_NOT_FOUND: '21',

  WALLET_NOT_FOUND: '30', // When provided wallet address cannot be found using address hash.
  WALLET_ADDRESS_ALREADY_EXISTS: '31', // When address hash already exists.
  WALLET_ADDRESS_LENGTH_IS_NOT_VALID: '32', // Address hash cannot have the size different than 32 characters

  USER_NOT_VERIFIED: 'User is disabled',
  BAD_CREDENTIALS: 'Bad credentials',

  PARTNER_USER_ID_ALREADY_EXISTS: '40', // The queryparam value that was provided from external registration point is already within database - somebody is already registered with this partner id.

  MGO_EXCHANGE_RATE_FETCHING_ERROR: '51', // There was a failed attempt to fetch data for ENRG exchange rate from either Crex or CMC.
};
