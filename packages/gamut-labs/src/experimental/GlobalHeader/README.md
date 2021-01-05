(WIP)

The Global Header is the component to be consumed. It takes in one prop called variant - which is of type
AnonHeader (logged out user), FreeHeader (logged in, free user), or ProHeader (logged in, pro user).

The variant tells us 1) what type of user we have, so we can get the header items for that user and 2) whether we need to render the Search, Notification, and Profile components.


How to add a new item to the app header?
First, determine what type of item you need and who needs to see it? Is it a button, link, a drop down? Do all users see this? Does logged in status matter? What about membership type?

1) Add the appropriate item to the AppHeaderItems.tsx file
2) Add the item in the render functions for each type of app header where you need it. (in AppHeaderVariants.tsx)

examples:
The sign up button is of type AppHeaderFillButton - only anonymous users see this so it only appears in the anonHeaderItems
AppHeaderLink: course catalog,
AppHeaderRenderPopover: app header item that renders a popover; ex. Plans + Pricing or Resources
AppHeaderPopover: this is a collection of AppHeaderLinks that appear in a popover (ex plansPricingDropdown)
AppHeaderTextButton: log in button
