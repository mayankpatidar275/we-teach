export const isPublisher = (
  userId?: string | null,
  userMail?: string | null
) => {
  return (
    userId === process.env.NEXT_PUBLIC_PUBLISHER_ID ||
    userMail === process.env.NEXT_PUBLIC_PUBLISHER_EMAIL
  );
};
