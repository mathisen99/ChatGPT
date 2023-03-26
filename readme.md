
# ChatGPT web client

Just a fun little side project to create a website to use as a ChatGPT client.

# Demo

- https://www.youtube.com/watch?v=YhBb46U0WbI


## Authors

- [@Mathisen](https://www.github.com/mathisen99)


## Deployment

To deploy this project run

```bash
  go run .
  Then just go to localhost:8080 in your browser
```


## Notes

Remeber to set your API key!!!


Get your key here >> https://platform.openai.com/account/api-keys

DANGER NOTES!

- Dont go crazy on the Token_value default is 500 if you start doing experiments your money can go bye bye if you do something realy wierd.
- Dont overdo the history_length size as your are also paying for that you are sending.
## Features

- Remebers conversation (you can easy modify how long yourself by changing the history_length variable under the API key)
- By changing API enpoint you can bypass chatgpt safe guards. (Note json body is diffrent for other models)
- Handles code blocks and newlines in the responses.

## Coming Soon
- Syntaxhighlighting with Prism https://prismjs.com/ for code blocks
