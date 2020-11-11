//everything in this module is assumed truthful and tests can count on it.
require('dotenv').config();
const { generateTokensForUser } = require("../src/helpers/jwt");

const testHero = {
  id: 1,
  username: "testHero",
  email: "testHero@test.com",
  password: "TestHero123",
};
const testVillain = {
  id: 2,
  username: "testVillain",
  email: "testVillain@test.com",
  password: "TestVillain123",
};

const testHeroId = testHero.id;
const testVillainId = testVillain.id;

const generateAuth = () => {
  const tokens = generateTokensForUser(testHero);
  return {
    testHeroValidAuthHeader: "Bearer " + tokens.accessToken,
    testHeroValidRefreshToken: tokens.refreshToken,
  };
}
const { testHeroValidAuthHeader, testHeroValidRefreshToken } = generateAuth();

module.exports = {
  testHeroValidAuthHeader,
  testHeroValidRefreshToken,
  testHero,
  testVillain,
  testHeroId,
  testVillainId,
};
