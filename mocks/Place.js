import casual from 'casual';

const mocks = {
  // String: () => 'It Works!',
  // Query: () => ({
  //   place: (root, args) => ({ name: args.title, text: args.text }),
  // }),
  Place: () => ({ name: casual.title, text: casual.sentences(3) }),
};

export default mocks;
