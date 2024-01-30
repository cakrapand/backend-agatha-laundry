import { hashPassword } from "../src/helpers/hash";
import prisma from "../src/utils/db.server";
import { faker } from "@faker-js/faker";

async function main() {
  const seedUsers = async () => {
    const password = await hashPassword("password");
    for (let i = 0; i < 5; i++) {
      const id = faker.string.uuid();

      await prisma.userCredential.create({
        data: {
          id: id,
          email: faker.internet.email(),
          password: password,
        },
      });

      await prisma.userProfile.create({
        data: {
          name: faker.person.fullName(),
          address: faker.location.street(),
          user_credential_id: id,
        },
      });
    }
  };

  const seedServices = async () => {
    await prisma.service.createMany({
      data: [
        { name: "Reguler", price: 4000 },
        { name: "Express", price: 6000 },
        { name: "Same Day", price: 10000 },
      ],
    });
  };

  seedUsers();
  seedServices();
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
