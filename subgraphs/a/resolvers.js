export const resolvers = {
  Query: {
    a(_, __, context) {
      return { id: "1", fieldFromA: "fieldFromA", fieldFromA1: "fieldFromA1" };
    },
  },
  A: {
    __resolveType(x) {
      return "A1"
    }
  },
  A1: {
    __resolveReference(ref) {
      return { id: "1", fieldFromA: "fieldFromA", fieldFromA1: "fieldFromA1" };
    }
  },
  A2: {
    __resolveReference(ref) {
      return { id: "1", fieldFromA: "fieldFromA", fieldFromA2: "fieldFromA2" };
    }
  },
};
