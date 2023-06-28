module.exports = {
  exportPathMap: async function() {
    const paths = {
      "/": { page: "/" },
      "/about": { page: "/about" },
      "/sp50": { page: "/sp50" },
      // other static routes...
    };

    // Assume your latest ID is 10
    const latestId = 5;

    // Create routes for each id
    for (let id = 1; id <= latestId; id++) {
      paths[`/sp50/${id}`] = { page: `/sp50/[id]`, query: { id } };
    }

    return paths;
  },
  assetPrefix: './',
};
