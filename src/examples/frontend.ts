// Przykładowe zdania do packs/frontend.ts. Format: angielski | przykładowe zdanie
export const EXAMPLES_FRONTEND = `
## Frontend (HTML, CSS, JS)
frontend | She works on the frontend, so she spends most of her day with HTML, CSS and React.
backend | The backend stores all the users' data and sends it to the app when needed.
full stack | As a full stack developer, he builds both the database and the user interface.
web developer | She became a web developer after a six-month course and lots of practice at night.
website | We rebuilt the company website, so it now loads in less than a second.
web app | This web app works in the browser, so you don't need to install anything.
browser | Always test your page in more than one browser, because they don't all behave the same.
HTML | HTML describes the structure of a page, like headings, paragraphs and links.
markup | Clean markup makes the page easier to style and much more accessible.
tag | Every paragraph should be wrapped in a p tag, not just separated by line breaks.
opening tag | The opening tag starts the element, and it can contain attributes like class or id.
closing tag | I forgot the closing tag, so the whole page below it turned bold.
self-closing tag | The img element is a self-closing tag, so it doesn't need a separate closing tag.
attribute | The href attribute tells the browser where the link should go.
nested | The list is nested inside a navigation element at the top of the page.
parent | When you hover over the card, the parent element gets a shadow.
child | The first child of the list has a different color from the others.
sibling | The error message is a sibling of the input, so they sit next to each other in the code.
head | The head of the document contains the page title and links to the stylesheets.
body | Everything the user sees on the page goes inside the body element.
heading | Use only one main heading on each page, usually an h1.
paragraph | Each paragraph should focus on one idea, so the text is easy to scan.
anchor | An anchor element with an href is the right way to create a link.
ordered list | Use an ordered list for steps in a recipe, because the order matters.
unordered list | The menu is an unordered list of links, styled to look like a horizontal bar.
list item | Each list item in the menu contains a single link.
form | The contact form has three fields and a big blue button.
input | The email input checks the format of the address before the form is sent.
button | Use a real button element for actions, not a div with a click handler.
checkbox | Tick the checkbox if you want to receive our newsletter.
radio button | Radio buttons let the user choose only one option from a group.
dropdown | The country dropdown has almost two hundred options, so we added a search field.
textarea | The textarea grows automatically when the user writes a longer message.
submit | The submit button stays disabled until all required fields are filled in.
div | The page was built only with divs, so screen readers had no idea what anything was.
span | Wrap the word in a span if you want to give it a different color.
semantic | Semantic elements like nav and main tell the browser what each part of the page means.
header | The header contains the logo, the main menu and a search field.
footer | You'll find the contact details and privacy policy in the footer.
section | Each section of the landing page describes a different feature of the product.
article | Every blog post on the page is wrapped in its own article element.
aside | The aside contains related links that aren't part of the main content.
class | Add the class "active" to the menu item for the current page.
id | Each id must be unique, so you can't use the same one twice on a page.
comment | I left a comment in the code to explain why this strange fix is needed.
doctype | The doctype at the top of the file tells the browser to use modern standards.
meta tag | The meta tag for the description is often shown in search engine results.
viewport | Without the viewport meta tag, the page looks tiny on mobile phones.
CSS | With CSS, you can completely change how a page looks without touching the HTML.
stylesheet | We keep all the common styles in one stylesheet that every page uses.
selector | This selector targets every link inside the main navigation.
property | The color property changes the color of the text, not the background.
declaration | Each declaration is a property and a value, like "color: red".
rule | This CSS rule makes all the headings dark blue and slightly bigger.
cascade | Thanks to the cascade, styles defined later in the file can override earlier ones.
specificity | The style didn't work because another selector had higher specificity.
inheritance | Because of inheritance, the font you set on the body is used by all its children.
pseudo-class | The :hover pseudo-class changes the button's color when the mouse is over it.
pseudo-element | We used a ::before pseudo-element to add a small icon before each link.
hover | Don't hide important information behind hover, touch screens don't have it.
box model | Understanding the box model helps you see why an element is wider than you expected.
margin | Add some margin below each paragraph, so the text has room to breathe.
padding | The button needs more padding, so the text isn't touching the edges.
border | The input has a thin grey border that turns blue when it's focused.
border radius | A small border radius makes the cards look softer and more friendly.
display | Changing the display to none hides the element completely, also from screen readers.
block | A block element, like a div, always starts on a new line.
inline | Links are inline elements, so they sit inside the text without breaking the line.
flexbox | With flexbox, centering an element both horizontally and vertically finally became easy.
grid | We used CSS grid to create a gallery that changes the number of columns on smaller screens.
layout | The layout breaks on small phones because the sidebar is too wide.
align | Use align-items to align the icons and the text in the middle of the row.
justify | justify-content: space-between pushes the logo to the left and the menu to the right.
gap | The gap property adds the same space between all the items in the grid.
position | Changing the position of the menu to fixed keeps it at the top while you scroll.
absolute | The badge has an absolute position, so it sits in the corner of the card.
relative | Set the card to relative position, so the absolute badge is placed inside it.
fixed | The fixed header covered the headings when users jumped to a section of the page.
sticky | The table header is sticky, so you can always see the column names while you scroll.
z-index | The dropdown was hidden behind the image, so we gave it a higher z-index.
overflow | Set overflow to auto, so long tables can scroll inside their box.
font size | Don't set the font size in pixels if you want users to be able to change it.
font weight | We used a heavier font weight for headings to make them stand out.
bold | Use bold sparingly, or nothing on the page will look important.
italic | Book titles are often written in italic.
background color | The background color of the page is a very light beige.
opacity | Lower the opacity of disabled buttons, so users can see they're not active.
shadow | A subtle shadow makes the card look like it's floating above the page.
gradient | The hero section has a gradient from dark blue to purple.
pixel | Designers sometimes argue about a single pixel of spacing.
rem | Using rem for font sizes respects the user's browser settings.
media query | The media query changes the layout to one column on screens narrower than six hundred pixels.
breakpoint | At the tablet breakpoint, the menu turns into a hamburger button.
responsive design | Responsive design means the same page works well on a phone, a tablet and a big monitor.
mobile first | We design mobile first, because most of our users visit the site on their phones.
transition | A short transition makes the color change on hover feel smooth.
animation | The loading animation spins until the data arrives.
transform | We used transform to scale the image slightly when the user hovers over it.
custom property | We store the brand colors in a custom property, so we can change them in one place.
variable | Use a CSS variable for the main color, so dark mode only needs a few changes.
JavaScript | JavaScript makes the page interactive, for example by opening menus or checking forms.
syntax | A tiny syntax error, like a missing bracket, can stop the whole script from working.
statement | Each statement in JavaScript usually ends with a semicolon.
expression | An expression like "2 + 2" produces a value.
declare | Declare your variables at the top of the function, so they're easy to find.
const | Use const for values that never change, like the address of the API.
let | Use let for a counter that changes every time the loop runs.
assign | Assign the result of the calculation to a new variable.
data type | JavaScript doesn't force you to declare the data type of a variable.
string | The user's name is stored as a string, even if it contains numbers.
number | The input returns text, so you need to convert it to a number before you add it.
boolean | isLoggedIn is a boolean, so it's either true or false.
null | The function returns null when it can't find the user.
undefined | The value is undefined because we forgot to pass the argument.
array | The words are stored in an array, so we can shuffle them for the flashcards.
object | Each word is an object with fields like en, pl and example.
index | Arrays in JavaScript start at index zero, which confuses many beginners.
function | Write a function that checks if the answer is correct.
arrow function | An arrow function is a shorter way to write a function, especially inside map or filter.
argument | The function takes two arguments, the word and the answer.
return | Don't forget to return the result, or the function will give you undefined.
method | The map method creates a new array from the old one.
loop | The loop goes through every word in the list and checks its due date.
iterate | We iterate over all the categories and count the words in each one.
condition | The message is shown only if the condition is true.
if statement | The if statement checks whether the user has typed anything.
operator | The plus operator adds numbers, but it joins strings together.
strict equality | Always use strict equality, so "5" isn't treated as equal to 5.
scope | The variable isn't available here, because it's outside its scope.
global | Avoid global variables, because any part of the code can change them.
module | Each component lives in its own module, so the code is easier to manage.
import | Import the function at the top of the file before you use it.
export | Export the helper function, so other files can use it too.
DOM | JavaScript changes the DOM to update what the user sees on the page.
Document Object Model | The Document Object Model represents the page as a tree of elements.
node | Each element and piece of text on the page is a node in the DOM tree.
query selector | Use a query selector to find the first button with the class "save".
event | Every click, key press and scroll is an event that JavaScript can react to.
event listener | We added an event listener that saves the form when the user presses Enter.
click event | The click event fires when the user taps the button on a phone too.
callback | Pass a callback that runs when the data has finished loading.
asynchronous | Loading data from the server is asynchronous, so the page doesn't freeze while it waits.
promise | fetch returns a promise that is resolved when the response arrives.
async/await | async/await makes asynchronous code look almost like normal code.
fetch | We fetch the list of products from the API when the page loads.
request | The request failed because the user's internet connection dropped.
response | Check the status of the response before you try to read the data.
JSON | The server sends the data as JSON, which JavaScript can read easily.
local storage | We saved the user's theme in local storage, so it stays the same after a refresh.
cookie | The login cookie expires after thirty days.
bug | We found a bug that deleted the user's progress when they changed the language.
debug | I spent the whole afternoon trying to debug a problem caused by one missing letter.
console | Open the console to see if there are any errors on the page.
console.log | I added a console.log to check what value the variable had at that moment.
breakpoint (debugger) | Set a breakpoint (debugger) on that line, so the code stops and you can inspect the variables.
developer tools | Press F12 to open the developer tools in most browsers.
inspect | Right-click the button and choose "Inspect" to see its HTML and CSS.
framework | Choosing a framework for a new project always starts a long discussion in our team.
library | We use a small library to handle dates, because JavaScript dates are painful.
React | This app is built with React, and each part of the screen is a component.
component | The flashcard is a reusable component that we use on several pages.
props | The component receives the word and its translation as props.
hook | The useState hook lets the component remember whether the card is flipped.
render | The list renders again every time the user adds a new word.
TypeScript | TypeScript caught the mistake before we even ran the code.
type | Define a type for the word object, so the editor can help you with its fields.
interface | The Word interface describes all the fields that each word has in the database.
compile | TypeScript has to compile your code into JavaScript before the browser can run it.
build | Run the build before you publish, to make sure there are no errors.
bundle | The bundle is too big, so the page takes a long time to load on slow phones.
package | We installed a package that makes it easy to store data in IndexedDB.
dependency | Every new dependency is another thing that might break in the future.
npm | Run npm install to download all the packages the project needs.
dev server | Start the dev server, and the page will refresh every time you save a file.
localhost | The app runs on localhost while you're developing, so only you can see it.
deploy | We deploy a new version of the app every Friday afternoon, which is probably a bad idea.
hosting | Static hosting is cheap and fast, perfect for a small app like this.
domain | Don't change the domain of the app, or the saved data will stay at the old address.
URL | Copy the URL from the address bar and send it to me.
performance | We improved performance by loading images only when they're needed.
lazy loading | With lazy loading, images further down the page load only when you scroll to them.
cache | Clear the cache if you don't see the latest version of the page.
service worker | The service worker saves the app's files, so it works even without the internet.
offline | The app works offline, so I can practise my flashcards on the plane.
cross-browser | Cross-browser testing showed that the animation didn't work in Safari.
polyfill | We added a polyfill, so the new feature also works in older browsers.
version control | Without version control, we'd have no idea who changed what and when.
repository | The code for the whole project lives in one repository on GitHub.
commit | Write a clear message for every commit, so others know what you changed.
branch | Create a new branch for each feature, so the main code stays stable.
merge | We can merge the branch after someone has reviewed the changes.
pull request | I opened a pull request and asked two colleagues to review it.
code review | During code review, my colleague found a bug I had completely missed.
refactor | We need to refactor this file, it's over two thousand lines long.
clean code | Clean code is easy to read, even for someone who sees it for the first time.
linter | The linter warns you about unused variables and other small mistakes.
formatter | The formatter fixes the spacing and quotes automatically every time I save.
unit test | Write a unit test for the function that calculates the next review date.
snippet | She shared a short snippet of code that solved my problem in two lines.
boilerplate | The template gives you all the boilerplate, so you can start writing real code immediately.
`;
