// import mongoose from 'mongoose';
// import { createClient } from 'redis';
//
// const client = createClient();
// const exec = mongoose.Query.prototype.exec;
//
// mongoose.Query.prototype.cache = function (options = {}) {
//   this.useCache = true;
//   this.hashKey = JSON.stringify(options.key ?? '');
//   return this;
// };
//
// mongoose.Query.prototype.exec = async function () {
//   if (!this.useCache) return exec.apply(this, arguments);
//   console.log('Caching is working!');
//   // const key = `${JSON.stringify(this.mongooseCollection.name)}_${JSON.stringify(
//   //   this.getQuery(),
//   // )}`;
//   // console.log(key);
//   const key = JSON.stringify(
//     Object.assign({}, this.getQuery(), {
//       collection: this.mongooseCollection.name,
//     }),
//   );
//   await client.connect();
//   const cachedValue = await client.hGet(this.hashKey, key);
//   if (cachedValue) {
//     await client.disconnect();
//     const doc = JSON.parse(cachedValue);
//     console.log(doc);
//     return Array.isArray(doc)
//       ? doc.map((d) => new this.model(d))
//       : new this.model(doc);
//   }
//
//   const result = await exec.apply(this, arguments);
//   await client.hSet(this.hashKey, key, JSON.stringify(result), { EX: 5 });
//   await client.disconnect();
//
//   return result;
// };
//
// module.exports = {
//   async clearHash(hashKey) {
//     await client.del(JSON.stringify(hashKey));
//   },
// };
