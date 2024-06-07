const { PrismaClient } = require("@prisma/client");

const database = new PrismaClient();
async function main() {
  try {
    await database.category.createMany({
      data: [
        { name: "Music" },
        { name: "Fitness" },
        { name: "Computer Science" },
        { name: "Designing" },
        { name: "Finance" },
        { name: "Art" },
        { name: "Spirituality" },
      ],
    });
    console.log("Success");
  } catch (error) {
    console.log("Error seeding the database categories", error);
  } finally {
    await database.$disconnect();
  }
}

main();
