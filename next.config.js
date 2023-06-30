module.exports = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://sheetdb.io/api/v1/dnuw839ldawjx/:path*',
      },
    ];
  },
};