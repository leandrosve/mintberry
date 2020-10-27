//everything in this module is assumed truthful and tests can count on it.

const validAuthHeader =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjYsInVzZXJuYW1lIjoibGVhbmRybyIsImVtYWlsIjoibGVhbmRyb0BnbWFpbC5jb20iLCJpYXQiOjE2MDM2NTc4ODUsImV4cCI6MTYzNTE5Mzg4NX0.iZFa6Sxq-lrcLu8Km0Lxj_f87PNH4GuObA6TG0M63Ds";

const validRefreshToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjYsInVzZXJuYW1lIjoibGVhbmRybyIsImVtYWlsIjoibGVhbmRyb0BnbWFpbC5jb20iLCJpYXQiOjE2MDM3NDI2Mzd9.AuqiGyz6stZJJtyWNVVMt9hDDJq5e6pkoasd4iS4w9U";

const taskOwnerId = 26;
const notTaskOwnerId = 27;

module.exports = {
  validAuthHeader,
  taskOwnerId,
  notTaskOwnerId,
  validRefreshToken,
};
