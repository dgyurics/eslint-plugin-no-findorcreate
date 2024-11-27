module.exports = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Disallow the use of findOrCreate in Sequelize',
      category: 'Best Practices',
      recommended: true,
    },
    messages: {
      avoidFindOrCreate: "Avoid using 'findOrCreate' in Sequelize. Use 'upsert' instead.",
    },
    schema: [],
  },
  create(context) {
    return {
      MemberExpression(node) {
        // Check if the property being accessed is 'findOrCreate'
        if (node.property && node.property.name === 'findOrCreate') {
          context.report({
            node,
            messageId: 'avoidFindOrCreate',
          });
        }
      },
    };
  },
};