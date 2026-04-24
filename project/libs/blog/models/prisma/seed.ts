import { PrismaClient, PostType } from '@prisma/client';

const FIRST_COMMENT_UUID = '39614113-7ad5-45b6-8093-06455437e1e2';
const SECOND_COMMENT_UUID = 'efd775e2-df55-4e0e-a308-58249f5ea202';
const FIRST_POST_UUID = '6d308040-96a2-4162-bea6-2338e9976540';
const SECOND_POST_UUID = 'ab04593b-da99-4fe3-8b4b-e06d82e2efdd';

const getMockComments = () => [
  {
    id: FIRST_COMMENT_UUID,
    text: 'First test comment',
    post: {
      connect: { id: FIRST_POST_UUID },
    },
    userId: '1',
  },
  {
    id: SECOND_COMMENT_UUID,
    text: 'Second test comment',
    post: {
      connect: { id: SECOND_POST_UUID },
    },
    userId: '2',
  },
];

const getMockPosts = () => [
  {
    id: FIRST_POST_UUID,
    type: PostType.Video,
    tags: ['news'],
    title: 'Test video',
    videoUrl: 'some.url',
    authorId: '1',
  },
  {
    id: SECOND_POST_UUID,
    type: PostType.Text,
    tags: ['books'],
    title: 'Title for test text',
    announce: 'Announce for text text',
    text: 'Test text about some interesting book',
    authorId: '2',
  },
];

const seedDb = async (prismaClient: PrismaClient) => {
  const mockPosts = getMockPosts();
  for (const post of mockPosts) {
    await prismaClient.post.upsert({
      where: { id: post.id },
      update: {},
      create: post,
    });
  }

  const mockComments = getMockComments();
  for (const comment of mockComments) {
    await prismaClient.comment.upsert({
      where: { id: comment.id },
      update: {},
      create: comment,
    });
  }

  console.info('Database was filled');
};

const bootstrap = async () => {
  const prismaClient = new PrismaClient();

  try {
    await seedDb(prismaClient);
    globalThis.process.exit(0);
  } catch (error: unknown) {
    console.error(error);
    globalThis.process.exit(1);
  } finally {
    await prismaClient.$disconnect();
  }
};

bootstrap();
