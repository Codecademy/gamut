(Work In Progress; will update as we continue to build the Global Header + then integrate it w/ the monolith)

The Global Header is the component to be consumed. It takes in one prop called 'variant' - which is of type
AnonHeader (the header an 'anonyous user' i.e. logged out user will see), FreeHeader (the header a user with a free membership will see), or ProHeader (the header a user with a pro membership will see).

The variant tells us 1) what type of user we have, so we can get the header items for that user and 2) whether we need to render the Search, Notification, and Profile components.

The Global Header passes to the AppHeader the header items, and the AppHeader renders the header content in App Sections (left + right). The AppHeader has no knowledge of the user, it just takes as a prop an object that has a left property (an array of AppHeaderItems) to render on the left side of the header & a right property (an array of AppHeaderItems) to render on the right side of the header.

How to add a new item to the app header?
First, determine what type of item you need and who needs to see it? Is it a button, link, a drop down? Do all users see this? Does logged in status matter? What about membership type?

1) Add the appropriate item to the AppHeaderItems.tsx file, including the necessary properities like id, href, type, text 
2) Add the item in the functions for each type of app header where you need it. (you'll find these functions in AppHeaderVariants.tsx: they are anonHeaderItems, proHeaderItems, and freeHeaderItems). Each of these functions returns an object in the form {left: AppHeaderItem[], right: AppHeaderItem[]}. This object gets passed to the AppHeader as the "items" prop.

example usage:
The sign up button is of type AppHeaderFillButton - only anonymous users see this so it only appears in the anonHeaderItems
The course catalog link in the header is the most basic type of app header item: an AppHeaderLink. All users (anon, free, pro) see this so it exists in anonHeaderItems, proHeaderItems, and freeHeaderItems.


