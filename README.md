# eslint-plugin-no-findorcreate

An ESLint plugin to disallow the use of Sequelize’s findOrCreate method, promoting the use of upsert instead. This plugin was created after encountering a race condition in production caused by findOrCreate, leading to unique constraint violations in a PostgreSQL database. By enforcing the use of upsert, this plugin helps avoid such issues and ensures more robust, atomic operations.

# Why Use This Plugin?

Sequelize’s findOrCreate method is not atomic—it executes a SELECT followed by an INSERT, which can result in race conditions in high-concurrency environments. This can lead to unexpected behavior like unique constraint violations if multiple instances of the same service try to insert the same record simultaneously.

In contrast, upsert (powered by PostgreSQL’s ON CONFLICT) performs these operations atomically in a single query, making it the preferred method for ensuring data consistency and preventing race conditions.

# Installation

To install the plugin, use the following command:

`npm install eslint-plugin-no-findorcreate --save-dev`

# Usage

1.	Add the plugin to your .eslintrc.js configuration file:

```javascript
module.exports = {
  plugins: ['no-findorcreate'],
  rules: {
    'no-findorcreate/no-find-or-create': 'warn',
  },
};
```

2.	Run ESLint on your codebase. Any usage of findOrCreate will now trigger a warning:
Example:

```javascript
sequelizeClient.phone.findOrCreate({
  where: { phoneNumber },
  defaults: { phoneNumber },
});
```
Output:

`warning: Avoid using 'findOrCreate' in Sequelize. Use 'upsert' instead.`

# License

This project is licensed under the MIT License.
