# Jobfinder-platform-ts
Full stack app that allow users to apply for a job

# Mongodb insert date in mongosh

```js
db.collection.updateMany({}, { $currentDate: { createdAt: true } });
```