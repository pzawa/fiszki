// Przykładowe zdania do packs/ai.ts. Format: angielski | przykładowe zdanie
export const EXAMPLES_AI = `
## AI (sztuczna inteligencja)
artificial intelligence | Artificial intelligence is changing the way we write, search and even learn languages.
machine learning | Machine learning lets computers find patterns in data without being programmed step by step.
deep learning | Deep learning made huge progress possible in image and speech recognition.
neural network | A neural network learns by adjusting millions of connections between its artificial neurons.
neuron | Each artificial neuron takes some numbers, combines them and passes the result to the next layer.
layer | Modern models have dozens of layers, each one learning more abstract patterns.
hidden layer | The hidden layer sits between the input and the output, and we can't easily see what it learns.
weights | During training, the model's weights are adjusted billions of times.
bias | If the training data contains bias, the model will probably repeat it.
parameter | The new model has billions of parameters, but it still runs surprisingly fast.
model | We switched to a smaller model because it was cheaper and fast enough for our app.
large language model | A large language model is trained on huge amounts of text to predict the next word.
LLM | Our support team uses an LLM to draft answers, but a person always checks them.
language model | A language model doesn't look things up, it generates text based on what it has learned.
foundation model | Many companies build their products on top of a foundation model instead of training their own.
frontier model | Each new frontier model can solve problems that seemed impossible a year earlier.
generative AI | Generative AI can create text, images and music from a short description.
chatbot | The bank's old chatbot only understood a few questions and was really frustrating.
assistant | I use an AI assistant to help me plan my week and write difficult emails.
AI agent | An AI agent can book a flight, fill in forms and send you a summary when it's done.
agentic | Agentic tools don't just answer questions, they take actions on your computer.
autonomous | The agent worked autonomously for an hour and fixed all the failing tests.
transformer | The transformer architecture, introduced in 2017, is behind almost every modern language model.
attention | The attention mechanism helps the model decide which words in a sentence are most important.
self-attention | Thanks to self-attention, the model can connect a pronoun with the noun it refers to.
architecture | The model's architecture determines how information flows through its layers.
token | A token is often just part of a word, so "unbelievable" might be split into three tokens.
tokenization | Polish words often need more tokens than English words because of tokenization.
tokenizer | The tokenizer splits your text into small pieces before the model can process it.
context window | The context window is big enough to fit a whole book in a single conversation.
context length | Longer context length means the model can remember more of the conversation at once.
embedding | An embedding turns a sentence into a list of numbers that represents its meaning.
vector | Similar sentences end up as vectors that are close to each other in space.
vector database | We store all our help articles in a vector database, so we can search them by meaning.
semantic search | With semantic search, "cheap flights" also finds articles about "low-cost airlines".
similarity | The system measures the similarity between your question and each document.
RAG | We use RAG, so the chatbot answers questions using our own documentation.
retrieval | The retrieval step finds the five most relevant documents before the model writes an answer.
retrieval-augmented generation | Retrieval-augmented generation helps reduce hallucinations by giving the model real sources.
knowledge base | The assistant can answer questions about our products using the company's knowledge base.
knowledge cutoff | Because of its knowledge cutoff, the model didn't know about last month's election.
training | Training a large model can take months and cost millions of dollars.
training data | The quality of the training data matters more than the amount.
dataset | We built a small dataset of customer emails to test the new model.
pretraining | During pretraining, the model reads a huge amount of text from books and websites.
fine-tuning | Fine-tuning taught the model to write in our company's friendly style.
fine-tune | We decided not to fine-tune the model, because good prompts worked well enough.
RLHF | RLHF uses human ratings to teach the model which answers people prefer.
reinforcement learning | With reinforcement learning, the model improves by getting rewards for good results.
reward | The model gets a reward when its code passes all the tests.
supervised learning | In supervised learning, the model learns from examples with correct answers.
unsupervised learning | Unsupervised learning finds groups and patterns in data without any labels.
label | Each photo in the dataset has a label, like "cat", "dog" or "car".
labeled data | Getting enough labeled data is often the most expensive part of a project.
annotation | Hundreds of people worked on the annotation of the medical images.
inference | Inference is much cheaper than training, but it adds up when millions of people use the model.
prediction | The model's prediction was correct in nine out of ten cases.
predict | The app tries to predict which word you'll type next.
next token prediction | At its core, a language model is just doing next token prediction, over and over again.
probability | The model chooses each word based on its probability in the given context.
output | Always check the output carefully before you send it to a client.
input | The input can be text, an image or even a whole PDF document.
prompt | A clear prompt with examples usually gives much better results.
prompt engineering | Prompt engineering is the skill of explaining clearly what you want the model to do.
system prompt | The system prompt tells the assistant to always answer politely and in Polish.
user prompt | The user prompt was only three words long, so the answer was very general.
instruction | The model followed the instruction to keep the answer under a hundred words.
few-shot | In a few-shot prompt, you show the model several examples of the task first.
zero-shot | The model translated the text zero-shot, without seeing any examples.
example | Adding just one good example to the prompt improved the format of the answers.
chain of thought | Asking for a chain of thought helps the model solve maths problems more accurately.
reasoning | The new model's reasoning is much better on complex, multi-step problems.
reasoning model | A reasoning model thinks for longer before it answers, so it's slower but more accurate.
extended thinking | With extended thinking turned on, Claude works through hard problems before answering.
step by step | If you ask the model to think step by step, it makes fewer mistakes.
response | The response was helpful, but it was much longer than I needed.
completion | The API returns a completion that continues the text you sent.
generate | The tool can generate ten versions of a headline in a few seconds.
temperature | Set the temperature low if you want consistent, predictable answers.
deterministic | Even with temperature at zero, the model isn't always fully deterministic.
randomness | A little randomness makes creative writing more interesting.
hallucination | The model's answer included a hallucination, a book that doesn't exist.
hallucinate | Language models can hallucinate facts, so always check important information.
accuracy | The accuracy of the new model on medical questions is impressive.
ground truth | We compared the model's answers with the ground truth written by experts.
benchmark | The company published benchmark results showing that the new model beats the old one.
evaluation | A careful evaluation showed that the model often struggled with Polish grammar.
evals | Before changing the prompt, we run our evals to make sure nothing gets worse.
metric | Accuracy isn't the only metric that matters, speed and cost are important too.
overfitting | Overfitting happens when a model memorises the training data instead of learning general patterns.
underfitting | The simple model was underfitting, so it performed badly even on the training data.
generalization | Good generalization means the model works well on data it has never seen before.
algorithm | The algorithm decides which videos you see next on the app.
gradient descent | Gradient descent slowly adjusts the weights to reduce the model's errors.
backpropagation | Backpropagation calculates how much each weight contributed to the error.
loss function | The loss function measures how far the model's predictions are from the correct answers.
epoch | After the tenth epoch, the model stopped improving, so we ended the training.
batch | The training data is split into small batches that the GPU processes one at a time.
GPU | Training a model like this requires thousands of GPUs working together for weeks.
compute | AI companies are spending billions of dollars on compute for the next generation of models.
scaling | Scaling up the model and the data led to surprising new abilities.
scaling laws | Scaling laws predict how much better a model gets when you add more data and compute.
open source | There are many open source tools for running language models on your own laptop.
open-weight model | An open-weight model can be downloaded and run on your own servers.
API | We connected our app to the API, so users can ask questions about their documents.
API key | Never put your API key in public code, or someone might use it and leave you with a huge bill.
endpoint | The app sends every request to the same endpoint and gets a response in JSON.
rate limit | We hit the rate limit during the demo, so the app stopped responding for a minute.
latency | Low latency is important for voice assistants, nobody likes waiting for an answer.
streaming | With streaming, users see the answer appear word by word instead of waiting.
pricing | The pricing is based on the number of tokens you send and receive.
input tokens | Long documents use a lot of input tokens, so we only send the relevant parts.
output tokens | Output tokens usually cost more than input tokens.
prompt caching | Prompt caching made our app much cheaper, because the long instructions are reused.
tool use | With tool use, the model can check the weather or search a database before answering.
function calling | Function calling lets the model ask your app to run code, like sending an email.
MCP | Thanks to MCP, the assistant can connect to our calendar and project management tool.
multimodal | A multimodal model can describe a photo, read a chart and answer questions about it.
computer vision | Computer vision helps self-driving cars recognise pedestrians and road signs.
image recognition | Image recognition in my phone can find all my photos of cats.
image generation | Image generation tools can create a picture of almost anything in seconds.
text-to-image | She used a text-to-image model to create illustrations for her children's book.
diffusion model | A diffusion model creates an image by slowly removing noise from random pixels.
speech recognition | Speech recognition has improved so much that it understands my Polish accent perfectly.
speech-to-text | I use speech-to-text to write messages while I'm walking.
text-to-speech | Modern text-to-speech sounds so natural that it's hard to tell it's not a real person.
natural language processing | Natural language processing allows computers to understand and generate human language.
sentiment analysis | The company uses sentiment analysis to see if customer reviews are positive or negative.
classification | The model handles the classification of emails into categories like urgent and spam.
summarization | Summarization saves me hours, because I can read the key points of long reports.
summarize | Can you summarize this article in three sentences?
translation | Machine translation is good for everyday texts, but legal documents still need a human.
chain | We built a chain of prompts, where each step uses the result of the previous one.
pipeline | Our pipeline extracts text from PDFs, cleans it and then sends it to the model.
workflow | AI has changed my daily workflow, especially when it comes to writing and research.
orchestration | The orchestration layer decides which agent handles each part of the task.
subagent | The main agent sent a subagent to search the codebase while it continued planning.
multi-agent system | In a multi-agent system, one agent writes code while another reviews it.
memory | With memory turned on, the assistant remembers my preferences between conversations.
guardrails | The company added guardrails, so the chatbot won't give medical or legal advice.
safety | Safety testing took several months before the new model was released.
alignment | Alignment research tries to make sure AI systems do what people actually want.
AI safety | Many researchers believe AI safety is one of the most important problems of our time.
responsible AI | Responsible AI means thinking about the impact on people before launching a product.
ethics | The course covers the ethics of using AI in hiring and healthcare.
fairness | We tested the model for fairness, to make sure it treated all groups equally.
transparency | Users want more transparency about how their data is used to train AI models.
explainability | In banking, explainability is essential, because customers have a right to know why a loan was refused.
black box | Critics say that AI is a black box, because even its creators can't fully explain its decisions.
interpretability | Interpretability research tries to understand what is happening inside a neural network.
jailbreak | Someone found a jailbreak that tricked the chatbot into ignoring its rules.
prompt injection | A hidden prompt injection on a website tried to make the AI agent send private data.
red teaming | Red teaming involves experts trying to make the model do harmful things before release.
misuse | The company monitors for misuse, such as creating spam or scams.
deepfake | The deepfake video of the politician looked completely real, but it was fake.
misinformation | AI can spread misinformation quickly if people share its answers without checking them.
privacy | Read the privacy policy to find out whether your chats are used for training.
personal data | Don't paste personal data, like customers' addresses, into public AI tools.
copyright | Artists are worried about copyright, because their work was used to train image models.
AI Act | The AI Act is the European Union's law that sets rules for high-risk AI systems.
regulation | Some people think regulation will slow down innovation, others think it's absolutely necessary.
human in the loop | For important decisions, we keep a human in the loop who checks every recommendation.
oversight | AI systems used in hospitals need careful human oversight.
automation | Automation has taken over many boring tasks, like copying data between spreadsheets.
automate | We used AI to automate the first draft of our weekly reports.
productivity | Many developers say AI tools have doubled their productivity.
use case | Our first use case was answering simple customer questions at night.
copilot | The coding copilot suggests whole functions while I type.
AGI | Experts disagree about when, or even if, AGI will arrive.
artificial general intelligence | Artificial general intelligence would be able to learn any task a human can do.
superintelligence | Some philosophers write about the risks of superintelligence that is far smarter than people.
narrow AI | A chess program is an example of narrow AI, it's brilliant at one thing only.
Turing test | Modern chatbots could probably pass the Turing test in a short conversation.
emergent abilities | Researchers were surprised by emergent abilities, like solving puzzles nobody trained the model for.
capability | The model's coding capability has improved dramatically in the last year.
limitation | One limitation of the model is that it can't access the internet without special tools.
model card | The model card explains what the model is good at and where it might fail.
system card | The system card describes the safety tests that were done before the release.
release | The release of the new model was announced with a short video and a blog post.
version | Make sure you're using the latest version of the model in your app.
upgrade | The upgrade to the new model made our answers faster and more accurate.
Anthropic | Anthropic was founded by researchers who wanted to focus on AI safety.
Claude | I asked Claude to explain the difference between "make" and "do" with examples.
Opus, Sonnet, Haiku | Opus, Sonnet, Haiku are model families with different sizes, speeds and prices.
conversation | The conversation got so long that I started a new one with a short summary.
chat history | You can find your old answers in the chat history on the left.
regenerate | If you don't like the answer, click regenerate and get a different version.
feedback | Your feedback helps the company improve the model's future answers.
thumbs up | I gave the answer a thumbs up because it solved my problem straight away.
upload a file | You can upload a file, like a PDF, and ask questions about its content.
attachment | The assistant read the attachment and pulled out all the important dates.
artifact | Claude created an artifact with an interactive chart that I could share with my team.
knowledge worker | Every knowledge worker will probably use AI tools in some way in the next few years.
data science | She switched from marketing to data science after a year of evening courses.
data scientist | The data scientist cleaned the dataset before training the model.
synthetic data | We used synthetic data to test the system without using real customer information.
cutting-edge | The lab works on cutting-edge research in robotics and AI.
state of the art | The new model is state of the art in coding, at least until next month.
breakthrough | The discovery of protein structures with AI was a major scientific breakthrough.
hype | There's a lot of hype around AI, so it's important to test the tools yourself.
`;
