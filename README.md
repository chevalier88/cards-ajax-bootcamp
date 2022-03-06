# Rocket Academy Coding Bootcamp: AJAX Cards

Note the gameState attribute's data type on line 10: JSON. We can use the JSON data type to break the rule of not storing data structures in a table cell. This is for the following reasons:

# Card Data Structure Simplicity

We want to store data representing a standard deck of cards. Normally we would think about how to represent this with relational tables- a deck and hand table that are related through foreign keys. However, it will be easier to store the all the game's cards in a JSON column rather than creating a set of tables and joining across multiple tables to perform simple operations such as dealing or playing cards.

# Relational-ness of Card Data

We do not need to query for game state data across games.

So far, we've set up a relational database schema that allows you to query relationships in multiple "directions". For example, when we store users and messages, we can get messages sent by user A and messages received by user A. We can get all recipes with the ingredient soy sauce, and we can get all the ingredients in the chicken noodle recipe.

In a card game we most likely only need to retrieve data from one "direction" or one perspective- that is, when we know about a single game, get that game's cards. Most likely we will never need have a card where we need to get all games with that card- for example that would be every game that has an Ace.
Depending on what specific application you are building, your data will necessitate having these relationships or not. It is up to the database designer to decide between having foreign key relationships and storing non-relational data is the appropriate choice, given a business situation or set of real world data.
