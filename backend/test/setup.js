const { testHero, testVillain, testHeroValidRefreshToken } = require("./premises");

const { User } = require("../src/db/models");

const { encryptPassword } = require("../src/helpers/passwords");

before(async () => {  
    await User.destroy({ where: { id: 1 } });

      await User.destroy({ where: { id: 2 } });

      await User.create({...testHero, password:encryptPassword(testHero.password)});
      await User.create({...testVillain, password:encryptPassword(testVillain.password)});
    

  })