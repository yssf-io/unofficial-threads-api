# threads-api

This is an unofficial API for Instagram's new [Threads](https://www.threads.net/) app.

### Usage

Consider it unstable as it is reverse-engineered from [Threads' Web version](https://www.threads.net/@zuck).

```ts
const client = new Threads();

client.user(userId).then((user) => console.log(user));
client.threads(userId).then((threads) => console.log(threads));
```

Check `src/types.ts` for `User` and `Threads` types.
