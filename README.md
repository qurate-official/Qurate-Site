# Qurate-Site
The main GitHub repository to host the website landing-page and the e-commerce platform

# <a href="https://qurate-official.github.io/Qurate-Site/">Hosted Site</a>
Click on the link to explore the Qurate site. It might take a few seconds to load the images and graphics fully. 

# What is Qurate?

Qurate is an app for reselling/ selling second-hand student goods. It is a trusted and very secure platform as it has AI Scan for the item pictures, date detection and much more

# Site functioning 

The site has the static landing page, which links to the platform. this platform links to Supabase for authentication and fetching listings, and sending listings. The AI scan works with a Supabase edge function which links to gemini via openrouter. Supabase edge function is secure since the key is stored in an encrypted form and is not exposed directly on the html which can be easily exposed by opening the editor window on a browser. 
