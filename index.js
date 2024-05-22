/**
 * This is a simple example of how you can import
 * the ollama sdk and work with that
 * import ollama from "https://esm.sh/ollama/browser"
 * add the code below to your buttons click event listener
 * const respone = await ollama.chat({messages: [{role: 'user', content: 'What is the capital of the United States?'}]});
 * console.log(response);
 */
// ----------------------------
/**
 * There might be another way. The platform val.town
 * allows free requests to openai api. https://www.val.town/v/std/openai
 * Limits are:
 * - Usage Quota: We limit each user to 10 requests per minute.
 * - Features: Chat completions is the only endpoint available.
 * - There is no streaming support
 *
 * This might be enough for our usecase.
 * Do make this easier @ff6347 wrote this simple wrapper class
 * that you can use to interact with val.town openai api
 * mimicing the ollama sdk.
 * It is an esm module so you need to include type="module" in your script tag
 * <script type="module" src="index.js"></script>
 */

// import the wrapper class
import { LLM } from './llm.js';

// create an instance of the class
const llm = new LLM({
  host: 'https://melmoor-openai_api.web.val.run/',
});

// get the button#run and div#response elements from the index.html
const chatButton = document.getElementById('run');
const responseDiv = document.getElementById('response');

// add a click event listener to the button that runs the async function
chatButton.addEventListener('click', async () => {
  // some options for the chat
  const format = 'text'; // we want text output
  // we set the seed so we get always the same output
  // we set the temperature which controls the creativity of the model
  const options = {
    seed: 42,
    temperature: 0.5,
  };
  // the messages that we want to send to the model
  // allowed are 'system', 'assistant' and 'user' role for the messages
  const messages = [
    {
      role: 'system',
      content: 'You are a helpful assistant. Always respond with a picture made of punctuation marks. Without letters!.Create a different random picture of a sky full of stars, a moon, and different planets. Do not use emojis.create a minimum of 1000 signs',
    },
    { role: "assistant",
  content: `° 　. ● . ★ ° . *　　　° * 　.　 :　　:●. 　 *° :●. 　 *
.　 * 　.　 　 ˚ *.　　 *　　 * ⋆ 　 .
· 　　 ⋆ ˚ ˚ 　　 ✦⋆ · 　 *⋆ ✧　 　 · 　 ✧　✵　　. 　★ ° . *　　　°　.　°☆° 　. ● . ★ ° . *★ ° . *　　　°　.　°☆★ ° . * *☆°. ☆. * ● ¸ . 　　　★ 　° :●. 　 *° :●. 　 *★ ° . *º :●: :
• ○ ° ★　 .　 * 　.　 ○ ° ★　 .　 * 　. * ● ¸ . 　★ ° . *★　 　　　　　
° 　. ● . ★ ° . *　　　°　. * ● ¸ . 　　　★ 　° :
　 ° 　. ● . ★ ° . *　　　°　.　 * ● ¸ . 　　　★ 　° :
°☆ 　. * ● ¸. 　　　★ 　:●. 　 *° :●. 　 *☆
° :. 　 * •★ ° . *　　　°　.　°☆.　 * 　.　
　★　　　　. 　 ° 　. . 　 ★ 　　　　　　. * ● ¸ . 　　　★ 　° :●. 　 *:●. 　 *°:●. 　 *° :●. 　 *☆:●. 　 *° :●. 　 *☆
• ○ ° ★　 .　 * 　.　 　　　　　.:●. 　 *° . 　 *☆
　 ° 　. ● . ★ ° . *　　　°　　. * ● ¸ . ° :●. 　 *
　ﾟ ＊ ·̩　　 ｡　☆　　　ﾟ ＊ 　 ｡*　　+　 　＊ 　･ ｡　ﾟ ＊ 　☆　　★ ° . *　　　°　.　°☆　*
★　★ ° . *　　★ ° .★ ° . *　　　°　.　°☆ *　　　°　.　°☆　°　.　°☆°☆　. * ● ¸ . 　　　
　 ° 　. ● . ★ ° . *　　　° * 　.　 :　　:●. 　 *° :●. 　 *
.　 * 　.　 　 ˚ *.　　 *　　 * ⋆ 　 .
· 　　 ⋆ ˚ ˚ 　　 ✦⋆ · 　 *⋆ ✧　 　 · 　 ✧　✵　　. 　★ ° . *　　　°　.　°☆° 　. ● . ★ ° . *★ ° . *　　　°　.　°☆★ ° . * *☆°. ☆. * ● ¸ . 　　　★ 　° :●. 　 *° :●. 　 *★ ° . *º :●: :
• ○ ° ★　 .　 * 　.　 ○ ° ★　 .　 * 　. * ● ¸ . 　★ ° . *★　 　　　　　
° 　. ● . ★ ° . *　　　°　. * ● ¸ . 　　　★ 　° :
　 ° 　. ● . ★ ° . *　　　★   ★ * 　.　 ○ ° ★　 .　 * 　. * ● ¸ . 　★ ° . *★　 　　　　　
° 　. ● . ★ ° . *　　　°　. * ● ¸ . 　　　★ 　° :
　 ° 　. ● . ★ ° . *　　　°　.　 * ● ¸ . 　　　★ 　° :
°☆ 　. * ● ¸. 　　　★ 　:●. 　 *°"`
},

    {
      role: 'user',
      content: 'Create the sky',
    }
  ];

  try {
    // now we make the call to the api.
    // we wrap it in a try-catch block to catch any errors
    const response = await llm.chat({ format, options, messages });
    const result = response.completion.choices[0].message.content;
    console.log(result);
    // update the content of the response div
    responseDiv.textContent = result;
  } catch (error) {
    // we had an error lets handle it
    console.error('Error:', error);
  }
});
