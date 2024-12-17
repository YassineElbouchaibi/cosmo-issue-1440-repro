export const resolvers = {
  Query: {
    c(_, __, context) {
      return { id: "1", fieldFromC: "fieldFromC", a: { id: "1"} };
    },
  },
  C: {
    __resolveReference(ref) {
      return { id: "1", fieldFromC: "fieldFromC", a: { id: "1" } };
    },
  },
};
