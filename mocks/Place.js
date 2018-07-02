import casual from 'casual';

const mocks = {
  Query: () => ({
    place: (root, args) => ({ name: args.name }),
  }),
  Place: () => ({ name: casual.title, text: casual.sentences(3) }),
};

export default mocks;
