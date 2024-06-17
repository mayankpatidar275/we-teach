export const isPublisher = (userId?: string | null) => {
  return userId === process.env.NEXT_PUBLIC_PUBLISHER_ID;
};
