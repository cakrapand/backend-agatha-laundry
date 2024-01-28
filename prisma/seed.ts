import prisma from "../src/utils/db.server";
import { services, users } from "./data";

async function main() {
  for (let user of users) {
    await prisma.user.create({ data: user });
  }
  for (let service of services) {
    await prisma.service.create({ data: service });
  }
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
