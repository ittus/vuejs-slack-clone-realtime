# Slack Clone real time VueJS

> Slack clone real time Using VueJS and Firebase

# Technology
- VueJS
- Firebase
- SemanticUI
- Gravatar

## Build Setup

- Open `src/config/firebaseConfig.js` and change `const config` to your project's configuration

- Change Database rules in firebase to

```json
{
  "rules": {
    "channels": {
      ".read": "auth != null",
      "$channelId": {
        ".write": "auth != null",
        ".validate": "newData.hasChildren(['id', 'name'])",
        "name": {
          ".validate": "newData.val().length > 0"
        },
          "id": {
            ".validate": "newData.val() === $channelId"
          }
      }
    },
    "users": {
      "$uid": {
        ".read": "auth != null",
        ".write": "auth != null && auth.uid === $uid",
        ".validate": "newData.hasChildren(['name', 'avatar'])",
          "name": {
            ".validate": "newData.val().length > 0"
          },
          "avatar": {
            ".validate": "newData.val().length > 0"
          }
      }
    }
  }
}
```


``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```
