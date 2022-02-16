import { PrismaClient } from '@prisma/client';
const db = new PrismaClient();

async function seed() {
  const kody = await db.user.create({
    data: {
      username: 'kody',
      // this is a hashed version of "twixrox"
      passwordHash:
        '$2b$10$K7L1OJ45/4Y2nIvhRVpCe.FSmhDdWoXehVzJptJ/op0lSsvqNu/1u',
    },
  });
  const urls = [
    'https://media1.giphy.com/media/UuGeADR2Ky6d2InLbI/200.gif',
    'https://media4.giphy.com/media/1jfDB5CvFEih25U56M/200.gif',
    'https://media0.giphy.com/media/0T9Dd9Tk0CC7fcpfPW/200.gif',
    'https://media0.giphy.com/media/tqj4m9BRURayxQAIW9/200.gif',
    'https://media0.giphy.com/media/KRmFiwBaADFsbtGznQ/200.gif',
    'https://media2.giphy.com/media/tw4lw9R8Z23eXBaDy4/200.gif',
    'https://media4.giphy.com/media/Wnk2fIuR8QvJFn0gip/200.gif',
    'https://media3.giphy.com/media/4drOrLqVQdkiQYLjcz/200.gif',
    'https://media4.giphy.com/media/vUHcwYtCiXBY8FNMiE/200.gif',
    'https://media3.giphy.com/media/AT5wCqwaWeu2mLYINM/200.gif',
    'https://media3.giphy.com/media/JlSqMgIKp5xSglNloM/200.gif',
    'https://media1.giphy.com/media/fuamoND1Hv0KPk8sOm/200.gif',
  ];
  await Promise.all(
    urls.map((url) => {
      const data = { url, userId: kody.id };
      return db.giphy.create({ data });
    })
  );
}

seed();
