// Przykładowe zdania do packs/wcag.ts. Format: angielski | przykładowe zdanie
export const EXAMPLES_WCAG = `
## WCAG i dostępność cyfrowa
accessibility | Accessibility should be part of the design process from day one, not a fix at the end.
accessible | We rebuilt the booking form to make it accessible for people who use only a keyboard.
inaccessible | The old login page was completely inaccessible to screen reader users.
digital accessibility | Digital accessibility means that everyone can use websites and apps, regardless of disability.
a11y | Our team has a weekly a11y review where we test new components together.
WCAG | Most public websites in the EU must meet WCAG requirements at level AA.
guideline | Each WCAG guideline is split into several testable success criteria.
success criterion | This button fails the success criterion for minimum target size.
success criteria | The audit report lists all the success criteria that the website doesn't meet.
conformance | Full conformance with WCAG is hard to achieve on a large, old website.
conformance level | Our client asked which conformance level the new app would reach.
Level A | Level A covers the most basic requirements, like text alternatives for images.
Level AA | Level AA is the standard most laws require, so that's our target for every project.
Level AAA | Level AAA is very strict, and it's rarely required for a whole website.
compliance | Legal compliance is important, but real usability for people matters even more.
compliant | The company claimed the website was compliant, but it failed half of our tests.
European Accessibility Act | The European Accessibility Act requires many online shops to be accessible from 2025.
accessibility statement | Every public institution in Poland must publish an accessibility statement on its website.
accessibility audit | The accessibility audit found over two hundred issues, mostly with forms and contrast.
assistive technology | Assistive technology includes screen readers, magnifiers and special keyboards.
screen reader | A screen reader reads the content of the page aloud, including buttons and links.
screen magnifier | She uses a screen magnifier to enlarge the text up to four times.
braille display | He reads emails on a braille display that changes the dots under his fingers.
voice control | With voice control, you can say "click Submit" instead of using a mouse.
switch access | People with limited movement can use switch access to control a phone with one button.
eye tracking | Eye tracking allows some users to move the cursor just by looking at the screen.
VoiceOver | Turn on VoiceOver on your iPhone and try to order a pizza without looking at the screen.
TalkBack | We tested the app with TalkBack on an Android phone and found several unlabeled buttons.
NVDA | NVDA is a free screen reader, so it's a great tool for testing on Windows.
JAWS | Many blind office workers use JAWS, so we always test important forms with it.
rotor | With the VoiceOver rotor, you can jump between headings, links or form fields.
swipe | Swipe right with one finger to move to the next element on the screen.
double tap | With VoiceOver on, you double tap anywhere on the screen to activate the selected button.
disability | Around one in four adults lives with some kind of disability.
person with a disability | A person with a disability should be able to book a ticket online just like anyone else.
visual impairment | Users with a visual impairment often rely on high contrast and large text.
blind | My blind colleague is the fastest person on our team at navigating websites.
low vision | People with low vision often zoom the page to two hundred percent or more.
color blindness | Because of color blindness, some users can't tell the red and green status icons apart.
hearing impairment | Videos without captions exclude people with a hearing impairment.
deaf | Many deaf people prefer content in sign language rather than written captions.
hard of hearing | My grandfather is hard of hearing, so he always watches TV with captions on.
motor impairment | Users with a motor impairment may find small buttons almost impossible to press.
cognitive disability | Clear language and simple layouts help people with a cognitive disability.
dyslexia | Short paragraphs and clear fonts make reading easier for people with dyslexia.
neurodivergent | Many neurodivergent users find autoplaying videos and animations distracting.
temporary disability | A broken arm is a temporary disability that changes how you use your phone.
situational disability | Holding a baby in one arm creates a situational disability when you use your phone.
inclusive design | Inclusive design starts by asking who might be excluded by our decisions.
universal design | Universal design aims to create products that work for as many people as possible.
barrier | A CAPTCHA without an audio option is a serious barrier for blind users.
POUR principles | The POUR principles help explain WCAG in four simple words.
perceivable | Content must be perceivable, so a video needs captions for users who can't hear it.
operable | Every function must be operable with a keyboard, not only with a mouse.
understandable | Error messages should be understandable, not just a red border around the field.
robust | Robust code works well with current and future assistive technologies.
text alternative | Every meaningful image needs a text alternative that describes its purpose.
alt text | Good alt text describes what's important in the image, not every tiny detail.
decorative image | A decorative image, like a background pattern, should be ignored by screen readers.
informative image | An informative image, like a chart, needs a description of the data it shows.
empty alt | Use an empty alt for decorative images, so screen readers skip them.
caption | The caption under the photo explains who is in the picture and where it was taken.
captions | Captions help deaf users, but also people watching videos on a noisy bus.
closed captions | You can turn on closed captions by clicking the CC button in the player.
subtitles | Subtitles translate the dialogue, but they don't describe sounds like music or laughter.
transcript | We added a full transcript below the podcast, so people can read it instead.
audio description | Audio description tells blind viewers what is happening on screen between the dialogue.
sign language | The president's speech was broadcast with a sign language interpreter in the corner.
autoplay | Autoplay videos with sound can make it impossible for screen reader users to hear anything.
pause, stop, hide | Moving carousels must have pause, stop, hide controls so users can stop the motion.
flashing content | Flashing content more than three times per second can trigger seizures.
seizure | A video with fast flashing lights can cause a seizure in people with photosensitive epilepsy.
motion sensitivity | People with motion sensitivity can feel sick when the page has big parallax effects.
reduced motion | We turn off most animations when the user has enabled reduced motion in their system.
color contrast | Light grey text on a white background often fails the color contrast requirements.
contrast ratio | The contrast ratio between the button text and its background is only two to one.
4.5:1 | Normal body text needs a contrast ratio of at least 4.5:1 against its background.
3:1 | Large headings and icons need a contrast ratio of at least 3:1.
foreground | The foreground color of the links is too light to read on the beige background.
background | Avoid placing text on a busy background image, it's very hard to read.
large text | In WCAG, large text is at least eighteen points, or fourteen points if it's bold.
use of color | Don't rely on use of color alone, add an icon or text to show errors.
legibility | Thin, decorative fonts look elegant, but their legibility is often poor.
readability | We improved readability by using shorter sentences and more headings.
plain language | Writing in plain language helps everyone, not only people with disabilities.
easy-to-read | The city published an easy-to-read version of its guide for people with intellectual disabilities.
reading level | The reading level of the article was far too high for a general audience.
abbreviation | The first time you use an abbreviation, write out what it stands for.
jargon | Our help pages were full of technical jargon that customers didn't understand.
resize text | Users must be able to resize text up to two hundred percent without losing content.
zoom | When I zoom in on this site, the menu covers half of the screen.
reflow | Thanks to reflow, the page fits a narrow screen without horizontal scrolling.
horizontal scrolling | Horizontal scrolling is very tiring for people who zoom in a lot.
text spacing | The layout broke when we increased the text spacing for testing.
line height | A larger line height makes long paragraphs much easier to read.
orientation | The app shouldn't force portrait orientation, some users have their tablet fixed to a wheelchair.
keyboard accessible | Every menu, button and form field must be keyboard accessible.
keyboard navigation | Try keyboard navigation on your own website, using only the Tab and Enter keys.
keyboard trap | The video player was a keyboard trap, once you tabbed into it, you couldn't get out.
focus | When the dialog opens, the focus should move to its first interactive element.
focus visible | Focus visible means that keyboard users can always see where they are on the page.
focus indicator | Designers often remove the focus indicator because they think it looks ugly.
focus order | The focus order jumped from the header straight to the footer, which was very confusing.
focus trap | A modal needs a focus trap, so the keyboard focus doesn't escape behind it.
focus management | Good focus management is essential in single-page applications.
focus not obscured | Focus not obscured means a sticky footer must never cover the focused element.
tab order | The tab order should follow the visual order of the page.
tabindex | Avoid using a positive tabindex, because it breaks the natural order of the page.
skip link | The skip link appears when you press Tab for the first time on the page.
skip to main content | A "skip to main content" link saves keyboard users from tabbing through the whole menu.
bypass blocks | Landmarks and skip links help users bypass blocks of repeated content.
shortcut | The app has a keyboard shortcut for search, but it isn't documented anywhere.
character key shortcuts | Character key shortcuts can be triggered by accident when voice control users speak.
timing adjustable | Timing adjustable means users can ask for more time before a form expires.
time limit | The ticket booking had a five-minute time limit, which was too short for many users.
session timeout | Warn users before a session timeout and let them extend it with one click.
pointer gestures | Complex pointer gestures, like pinching, need a simple alternative such as buttons.
pointer cancellation | Thanks to pointer cancellation, the action happens on release, so you can still slide away.
target size | The target size of these icons is too small for people with shaky hands.
touch target | Each touch target should be at least twenty-four by twenty-four pixels.
dragging movements | Sorting the list required dragging movements, so we added up and down buttons too.
motion actuation | Shaking the phone to undo is motion actuation, and it needs an alternative.
semantic HTML | Using semantic HTML gives you a lot of accessibility for free.
heading | Each section of the article starts with a clear heading that describes its content.
heading structure | Screen reader users often scan the heading structure to understand the page.
heading level | Don't skip a heading level just because you like the size of a smaller heading.
landmark | The nav element creates a landmark that screen reader users can jump to.
region | Each important region of the page should have a clear label.
main content | The main content of the page should be inside a main element.
navigation | The navigation menu was hidden behind an icon without any text label.
page title | A good page title tells the user where they are before they read anything else.
link purpose | The link purpose should be clear from the link text alone or from its context.
descriptive link text | Descriptive link text like "Download the 2025 report" is much better than "more".
click here | A list of ten links that all say "click here" is useless for a screen reader user.
language of page | Set the language of page correctly, or the screen reader will use the wrong pronunciation.
lang attribute | Without the lang attribute, VoiceOver read our Polish text with an English accent.
consistent navigation | Consistent navigation means the menu is in the same place on every page.
consistent identification | Consistent identification means the same icon always has the same name.
consistent help | Consistent help means the contact link is always in the same place on every page.
on focus | Nothing unexpected should happen on focus, like a new window suddenly opening.
on input | Changing a setting on input shouldn't submit the whole form without warning.
form label | Every form field needs a visible form label, not just a grey placeholder.
label in name | Because of label in name, a button labelled "Send" must also be called "Send" in code.
placeholder | A placeholder disappears when you start typing, so it can't replace a label.
required field | Mark each required field clearly, not only with a red asterisk.
instructions | Give clear instructions before the form, for example about the password format.
input purpose | Defining the input purpose helps browsers fill in your name and address automatically.
autocomplete | Adding the right autocomplete values saves users with motor impairments a lot of typing.
error identification | Error identification means telling users which field has a problem and why.
error message | The error message just said "Invalid input", which didn't help anyone.
error suggestion | A good error suggestion says what to do, like "Enter the date as DD-MM-YYYY".
error prevention | For payments, error prevention means letting users check and correct the data first.
redundant entry | To avoid redundant entry, the form copies the delivery address to the billing address.
accessible authentication | Accessible authentication means users don't have to solve puzzles or memorise codes to log in.
CAPTCHA | The image CAPTCHA stopped bots, but it also stopped every blind customer.
status message | A status message like "Item added to cart" must be announced by screen readers.
live region | We put the search results counter in a live region, so it's read aloud when it changes.
announce | The screen reader should announce the error as soon as the form is submitted.
accessible name | The icon button had no accessible name, so the screen reader just said "button".
name, role, value | Every custom control must expose its name, role, value to assistive technologies.
accessibility tree | Browser developer tools let you inspect the accessibility tree of the page.
ARIA | ARIA can fix some problems, but bad ARIA can make a page even less accessible.
role | Adding role="button" to a div doesn't make it work with the keyboard.
state | The screen reader announces the state of the checkbox, checked or not checked.
property | aria-required is a property that tells assistive technologies a field is mandatory.
aria-label | We added an aria-label to the search icon, so it's read as "Search".
aria-labelledby | The dialog uses aria-labelledby to point to its visible heading.
aria-describedby | The password field uses aria-describedby to read the password rules.
aria-hidden | Never put aria-hidden on an element that can still receive keyboard focus.
aria-live | Use aria-live="polite" for messages that shouldn't interrupt the user.
aria-expanded | The menu button uses aria-expanded to tell users whether the menu is open.
first rule of ARIA | The first rule of ARIA says that a native HTML element is almost always the better choice.
visually hidden | The visually hidden text "opens in a new tab" is read only by screen readers.
data table | A data table needs proper headers, so users know what each number means.
table header | Use the th element for each table header, not just bold text.
reading order | The reading order of the code didn't match what sighted users saw on the screen.
meaningful sequence | Content should be in a meaningful sequence even when the CSS is turned off.
sensory characteristics | Instructions like "click the round green button" rely only on sensory characteristics.
non-text content | All non-text content, like icons and charts, needs a text alternative.
images of text | Avoid images of text, because they get blurry when users zoom in.
content on hover or focus | Content on hover or focus must be dismissable without moving the mouse away.
tooltip | The tooltip disappeared before I could read it, which is a classic accessibility problem.
modal dialog | When the modal dialog closes, return the focus to the button that opened it.
dark mode | Dark mode helps some users with light sensitivity, but it needs good contrast too.
high contrast mode | Some icons disappeared completely when we turned on high contrast mode.
forced colors | In forced colors mode, your custom focus styles might become invisible.
accessibility checker | An accessibility checker finds obvious errors, but it can't judge if alt text makes sense.
automated testing | Automated testing finds only about a third of all accessibility issues.
manual testing | Manual testing with a keyboard and a screen reader found most of the real problems.
user testing | User testing with disabled people showed us problems we had never imagined.
axe | We run axe in our test pipeline, so new accessibility errors are caught early.
Lighthouse | Lighthouse gave the site a hundred points, but it was still hard to use with a keyboard.
WAVE | The WAVE extension shows accessibility errors directly on the page with little icons.
false positive | The tool reported a contrast error, but it was a false positive caused by a background image.
remediation | Remediation of the old website will take several months.
EN 301 549 | Public tenders in the EU often require products to meet EN 301 549.
W3C | The W3C develops the standards that browsers use, including HTML and WCAG.
WAI | The WAI website has great tutorials on accessible forms, tables and images.
lived experience | Testers with lived experience of disability notice problems that experts often miss.
nothing about us without us | "Nothing about us without us" means disabled people must be involved in design decisions.
`;
