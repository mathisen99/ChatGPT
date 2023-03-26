//Enter your OpenAI API Key here!!
const ApiKey = "Enter your OpenAI API Key here!!";
// Enter the number of messages you want to keep in the history (ChatGPT memory)
const history_length = 3;
// Enter the maximum number of tokens you want to generate
const Token_value = 500;

// Function to check if the API key is valid and display a warning if it isn't
async function checkApiKey() {
  const response = await fetch("https://api.openai.com/v1/engines", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Bearer " + ApiKey,
    },
  });

  const data = await response.json();

  // If respones is 401 then the API key is invalid
  if (response.status === 401) {
    document.getElementById("api-key-warning").style.display = "block";
  }

  // If response is 200 then the API key is valid
  if (response.status === 200) {
    document.getElementById("api-key-warning").style.display = "none";
  }
}

// Call the checkApiKey function when the page loads
checkApiKey();

// Initialize an empty messages array to store the chat history
var messages = [];

// if history is bigger then 3 then remove the first element in the array to keep the history to 3
function checkHistory() {
  if (messages.length > history_length) {
    messages.shift();
  }
}

// Add an event listener to the form to handle the submit event
document
  .getElementById("openai-form")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    // Get the input text from the form
    var inputText = document.getElementById("input-text").value;

    // Add the user message to the messages array
    messages.push({
      role: "user",
      content: inputText,
    });

    // Show the spinner when the API call is being made
    document.getElementById("spinner").style.display = "block";

    // Make an API call to the OpenAI API with the input text and context
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer " + ApiKey,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: messages,
        max_tokens: Token_value,
        temperature: 0,
      }),
    });

    const data = await response.json();

    // Add the assistant message to the messages array
    if (
      data.choices &&
      data.choices[0] &&
      data.choices[0].message &&
      data.choices[0].message.content
    ) {
      messages.push({
        role: "assistant",
        content: data.choices[0].message.content,
      });
    }

    // Display the response in the response area
    handleResponse(data);
    // Hide the spinner
    document.getElementById("spinner").style.display = "none";
  });

function handleResponse(response) {
  var responseArea = document.getElementById("response-area");
  if (
    response.choices &&
    response.choices[0] &&
    response.choices[0].message &&
    response.choices[0].message.content
  ) {
    var responseText = response.choices[0].message.content;
    var delay = 50; // delay between characters in milliseconds

    // Clear any existing text in the response area
    responseArea.innerHTML = "";

    // Replace newline characters with HTML line breaks
    responseText = responseText.replace(/\n/g, "<br>");

    // Wrap code blocks with <pre> and <code> tags
    var codeBlockRegex = /`{3}([\s\S]*?)`{3}/g;
    responseText = responseText.replace(
      codeBlockRegex,
      "<pre><code>$1</code></pre>"
    );

    // Create a new element to store the formatted response text
    var newElement = document.createElement("div");
    newElement.innerHTML = responseText;

    // Iterate through the child nodes of the new element
    for (var i = 0; i < newElement.childNodes.length; i++) {
      (function (i) {
        setTimeout(function () {
          // Append the current child node to the response area
          responseArea.appendChild(newElement.childNodes[i].cloneNode(true));
        }, delay * i);
      })(i);
    }
  } else {
    // Handle the case where the response doesn't contain the expected 'choices' field
    responseArea.innerHTML = "Error: Unexpected response from OpenAI API";
  }
}
