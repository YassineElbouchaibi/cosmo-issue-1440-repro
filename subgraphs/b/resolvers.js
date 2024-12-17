export const resolvers = {
  Query: {
    b(_, __, context) {
      return { id: "1", fieldFromB: "fieldFromB" };
    },
  },
  B: {
    __resolveReference(ref) {
      return { id: "1", fieldFromB: "fieldFromB" };
    },
  },
  A1: {
    fieldFromB: {
      resolve: ({ id }, _, context) => "fieldFromB"
    }
  }
};
