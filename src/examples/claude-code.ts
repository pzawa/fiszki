// Przykładowe zdania do packs/claude-code.ts. Format: angielski | przykładowe zdanie
export const EXAMPLES_CLAUDE_CODE = `
## Claude Code
terminal | I open the terminal in my project folder and type "claude" to start a session.
command line | Many developers prefer the command line because it's faster than clicking through menus.
command | Type the command "npm test" to check if everything still works after the change.
prompt | I wrote a short prompt describing the bug, and Claude found the problem in a minute.
shell | On Windows, the default shell is PowerShell, but you can also use Git Bash.
working directory | Claude can read and edit files in the working directory without asking every time.
directory | Create a new directory for the examples, so they don't get mixed up with the main code.
path | The error says the path is wrong, because there's a typo in the folder name.
file | Claude opened the file, found the broken function and suggested a fix.
codebase | Before changing anything, Claude explored the codebase to understand how it works.
project | Each project can have its own CLAUDE.md with rules for that specific code.
session | I started a new session in the morning, so the old conversation didn't get in the way.
conversation | The conversation got really long, so I used /compact to summarise it.
Thinking… | "Thinking…" appeared on the screen for a few seconds before Claude answered.
Working… | The terminal showed "Working…" while Claude was running the tests in the background.
Reading | It said "Reading src/db.ts", so I knew Claude was looking at the database code.
Searching | Claude was searching the whole project for every place where the function was used.
Writing | When I saw "Writing" on the screen, I knew Claude was creating the new file.
Running | "Running npm run build" means Claude is checking that the project still builds.
Read file | The Read file tool lets Claude look at the code without changing anything.
Write file | Claude used the Write file tool to create a new test for the migration.
Edit file | With the Edit file tool, Claude changes only the lines that need fixing.
Create file | I asked Claude to create a file with fifty new words for the travel category.
Update | Claude showed an "Update" message with the changes it made to the configuration file.
Search | Use search to find every file that mentions the old category name.
Run | Run the dev server and open the page in the browser to see the change.
tool | Claude chooses the right tool for each step, like reading, searching or running a command.
tool call | Each tool call is shown in the terminal, so you can see exactly what Claude is doing.
tool use | Tool use lets Claude do real work, not just suggest code in a chat window.
permission | Claude asks for permission before running commands that could change something important.
Do you want to proceed? | Before deleting the old files, Claude asked, "Do you want to proceed?"
Do you want to make this edit? | Claude showed the change in red and green and asked, "Do you want to make this edit?"
Yes | I pressed Yes, because the change looked exactly like what I wanted.
No | I chose No, because I didn't want Claude to touch the database file yet.
Yes, and don't ask again | I picked "Yes, and don't ask again" for npm test, because it's always safe to run.
No, and tell Claude what to do differently | I picked "No, and tell Claude what to do differently" and explained that I wanted shorter sentences.
allow | You can allow certain commands in the settings, so Claude doesn't ask about them every time.
deny | I added the deploy command to the deny list, so Claude can never run it by accident.
approve | Read the plan carefully before you approve it.
reject | I rejected the first suggestion because it changed too many files at once.
accept edits | When I'm sure about the task, I switch to accept edits, so I don't have to approve every change.
auto-accept | With auto-accept turned on, Claude can edit files without stopping to ask.
plan mode | In plan mode, Claude only reads the code and prepares a plan without changing anything.
auto mode | In auto mode, Claude works on the task on its own and only asks about risky actions.
Here is Claude's plan | "Here is Claude's plan" appeared, followed by a list of five steps.
Would you like to proceed? | After showing the plan, Claude asked, "Would you like to proceed?"
interrupt | You can interrupt Claude at any moment if you see it's going in the wrong direction.
Interrupted by user | The message "Interrupted by user" appeared after I pressed Escape.
press Esc to interrupt | The hint at the bottom says "press Esc to interrupt" while Claude is working.
press Enter to continue | When the summary appeared, I had to press Enter to continue.
shortcut | The keyboard shortcut Shift and Tab switches between the different modes.
slash command | A slash command starts with a slash, like /help or /clear.
/help | Type /help to see a list of all the available commands.
/clear | I used /clear to start fresh, because the old conversation was about a different feature.
/compact | When the context is almost full, /compact makes a short summary and frees up space.
/init | Run /init in a new project, and Claude will write a CLAUDE.md that describes the code.
/model | I used /model to switch to a faster model for simple tasks.
/resume | With /resume, you can go back to yesterday's conversation and continue where you stopped.
/config | Open /config to change the theme or other settings.
/cost | Type /cost to see how much the current session has cost so far.
/memory | Use /memory to open the file where Claude keeps notes about your preferences.
/review | I ran /review before merging, and it found a bug in the migration.
context | Claude reads only the files it needs, so the context doesn't fill up too quickly.
context window | A big context window means Claude can keep a lot of code in mind at once.
context left | The status bar shows how much context is left before Claude needs to compact.
compacting conversation | "Compacting conversation" means Claude is summarising earlier messages to save space.
summary | After the work was done, Claude wrote a short summary of everything it changed.
memory | Thanks to memory, Claude remembers that I prefer answers in Polish.
CLAUDE.md | We wrote the rules about protecting saved words in CLAUDE.md, so Claude never forgets them.
instructions | Clear instructions in CLAUDE.md save you from repeating the same things in every session.
settings | You can change which commands are allowed in the project settings file.
configuration | The configuration is stored in a JSON file inside the .claude folder.
hook | We added a hook that runs the formatter automatically after every edit.
skill | A skill is a package of instructions that teaches Claude how to do a specific task.
plugin | I installed a plugin that adds a new slash command for writing release notes.
MCP server | The MCP server lets Claude read tickets from our project management tool.
agent | The agent read the code, wrote the fix and ran the tests by itself.
subagent | Claude started a subagent to search through hundreds of files while it planned the change.
background task | The build is running as a background task, so we can keep talking in the meantime.
run in background | I asked Claude to run in background anything that takes longer than a minute, like the full test suite.
todo list | Claude made a todo list with six steps and ticked each one off as it finished.
task | The task was bigger than expected, so Claude split it into smaller steps.
in progress | The second step is marked as in progress while Claude writes the tests.
completed | All the steps on the list were completed in about twenty minutes.
pending | Two tasks are still pending, because they depend on the database change.
done | When everything was done, Claude ran the build one more time to make sure.
failed | The command failed because the package wasn't installed.
error | Claude read the error carefully and found that a bracket was missing.
warning | The warning wasn't serious, but Claude fixed it anyway.
Error: file not found | "Error: file not found" appeared because I gave the wrong file name.
No such file or directory | The terminal said "No such file or directory", because we were in the wrong folder.
Permission denied | "Permission denied" means your user isn't allowed to change that file.
command not found | I got "command not found" because Node wasn't installed on the new laptop.
exit code | An exit code of zero means the command finished without any errors.
timeout | The test hit a timeout because it waited too long for the server.
timed out | The request timed out, so Claude tried again a few seconds later.
retry | If the connection drops, just retry the last command.
retrying | The message said "retrying" a few times, and then the request finally worked.
rate limit | We hit the rate limit, so Claude had to wait a minute before continuing.
usage limit | I reached my usage limit for the day, so I'll continue tomorrow morning.
overloaded | The service was overloaded for a few minutes, so the answers came back slowly.
connection | Check your internet connection if Claude stops responding.
API error | An API error appeared, but after a short wait everything worked again.
log in | You need to log in with your account the first time you use Claude Code.
log out | Log out on the shared computer, so nobody else can use your account.
authenticate | The browser opened so I could authenticate and connect the terminal to my account.
token usage | Long files increase token usage, so it's better to point Claude to the exact place.
cost | The cost of the session was much lower than I expected.
output | The output of the test command was very long, but only one test was failing.
truncated | The output was truncated, so Claude ran the command again with a filter.
diff | Claude showed me a diff, with removed lines in red and added lines in green.
added lines | The added lines include a new database version and a test for it.
removed lines | There are no removed lines, because Claude only added new code.
line | The error is on line forty-two, in the function that saves the word.
changes | Before committing, Claude listed all the changes and explained each one.
unchanged | The old database versions remain unchanged, just as the instructions say.
overwrite | Be careful, saving this file will overwrite your old version.
undo | If you don't like the edit, you can undo it and try a different approach.
rewind | I used rewind to go back to the moment before Claude changed the layout.
checkpoint | Claude Code saves a checkpoint before each edit, so you can always go back.
restore | We restored the previous version of the file from the checkpoint.
git | Thanks to git, we can always see who changed the code and why.
repository | The whole project is saved in a git repository on my laptop.
commit | I asked Claude to commit the changes once all the tests had passed.
commit message | Claude wrote a clear commit message explaining what changed and why.
branch | Create a new branch for this experiment, so the main code stays safe.
main branch | Never push untested code directly to the main branch.
push | After the commit, I pushed the changes, so the new version could be published.
pull | Pull the latest changes before you start working, so you don't get conflicts.
pull request | Claude opened a pull request with a description of all the changes.
merge | We can merge the branch once the review is finished.
merge conflict | Claude solved the merge conflict by keeping both sets of changes.
staged changes | git status shows the staged changes that will go into the next commit.
untracked files | The new example files are untracked files until you add them to git.
working tree | A clean working tree means there are no changes that haven't been committed.
clean | The working tree is clean, so it's a good moment to start a new feature.
worktree | Claude used a separate worktree, so its experiments didn't touch my files.
install | Install the dependencies before you run the project for the first time.
dependencies | The project has very few dependencies, which makes it easy to maintain.
build | Run the build to create the files that will be published.
build succeeded | "Build succeeded" means the project is ready to be deployed.
build failed | The build failed because one of the imports pointed to a file that didn't exist.
test | Claude wrote a test that checks every example sentence matches a real word.
tests passed | All the tests passed, so I felt safe publishing the new version.
tests failed | Two tests failed after the change, so Claude went back to investigate.
run the tests | Always run the tests before you publish a new version of the app.
lint | Run lint to find unused variables and small style problems.
type check | The type check found a place where a number was used as a string.
dev server | The dev server reloads the page automatically when you save a file.
deploy | We deploy the app after checking that the old data survives the migration.
fix | The fix was just one line, but finding the problem took an hour.
bug | Claude found a bug that made the flashcards show the wrong translation.
refactor | I asked Claude to refactor the long function into three smaller ones.
implement | Claude can implement the whole feature, from the database to the user interface.
feature | The new feature adds example sentences to every flashcard.
investigate | Before fixing anything, Claude decided to investigate why the test was failing.
root cause | The root cause of the problem was an old version of the library.
let me check | "Let me check the database file first," Claude said before suggesting any changes.
let me look at | "Let me look at how the words are saved," Claude wrote, and opened the file.
I'll start by | "I'll start by reading the tests to understand the expected behaviour," Claude explained.
I found the issue | "I found the issue," Claude said, "the category name had an extra space."
the issue is | The issue is that the function runs before the data has finished loading.
issue | I opened an issue on GitHub describing the problem with the dark mode.
now let me | "Now let me run the tests to make sure nothing is broken," Claude wrote.
I've updated | "I've updated the migration and added a test for it," Claude reported at the end.
verify | Always verify that the old data is still there after the update.
works as expected | After the fix, the app works as expected on both the phone and the laptop.
edge case | Claude also handled the edge case where a user has deleted a category.
approach | Claude suggested a simpler approach that needed fewer changes to the database.
trade-off | The trade-off is that the app is a little bigger, but it works offline.
recommend | I recommend running the migration test before publishing, just to be safe.
suggestion | Claude made a suggestion to split the long list into several smaller files.
optional | The new field is optional, so old words without it still work perfectly.
required | A title is required, so the form won't let you save an empty category.
deprecated | This command is deprecated and will be removed in the next version.
experimental | The feature is still experimental, so it might change or disappear.
default | By default, Claude asks for permission before editing any file.
enable | Enable dark mode in the settings if you work late at night.
disable | You can disable notifications if they distract you while you work.
toggle | Press the shortcut to toggle between plan mode and normal mode.
expand | Click the arrow to expand the details of the tool call.
collapse | Collapse the long output, so the conversation is easier to read.
scroll up | Scroll up to see the plan that Claude wrote at the beginning.
copy to clipboard | Click the small icon next to the suggested command to copy to clipboard.
paste | You can paste a screenshot directly into the terminal to show Claude the problem.
screenshot | I sent Claude a screenshot of the broken layout on my iPhone.
attach | You can attach an image to your message to show exactly what's wrong.
upgrade | Upgrade Claude Code regularly to get the newest features and fixes.
version | Check which version you have installed by running "claude --version".
Welcome back! | "Welcome back!" appeared on the screen when I started Claude Code the next morning.
Tips for getting started | The "Tips for getting started" section suggests running /init in a new project.
What's new | The "What's new" list shows the features added in the latest update.
`;
