# TODO List for Fixing Errors in server.js and ChatPage.js

- [ ] Fix prompt extraction in server.js: Change `const prompt = req;` to `const prompt = req.body.message;`
- [ ] Fix console.log in server.js: Update to log the actual Gemini response text
- [ ] Fix response handling in server.js: Extract text from Gemini API response properly (data.candidates[0].content.parts[0].text)
- [ ] Update fetch URL in ChatPage.js: Change from localhost:3000 to localhost:8080
- [ ] Test the server and client to ensure chat functionality works
