# Sanity

Install the CLI tool  
`npm install -g @sanity/cli`  

Start Sanity  
`sanity start`  
(or `sanity start --port=[port-num]` if you get a port conflict

Visit `localhost:3333` and you'll be asked to login. Login or ask another team 
member to create an account for you. After logging in, you will be 
redirected to https://manage.sanity.io/, but that's only to create
datasets, manage users, etc. You'll want to go back to your `localhost:3333`
to interact with the Sanity Studio, which is where we manage our content.

To create new content types, you'll need to add schemas to `/backend/schemas` and then
import the new schema in `/backend/schemas/schema.js`. Instructions on creating schemas can be found here: https://www.sanity.io/docs/content-studio/the-schema

But you can also look at the existing schemas and learn from those too.


## Creating New Pages
To create a new page content type/schema, you can use the HomePage schema as an example.
Routes are a reusable schema that contain metadata, paths, and ability to enable/disable a route.
When creating a new page, you should have a field for the route:
```$javascript
export default {
  name: 'homepage',
  title: 'Home Page',
  type: 'document',
  fields: [
    ...
    {
      name: 'route',
      title: 'Route',
      type: 'reference',
      to: [{ type: 'route' }],
    },
  ],
};

```

Routes could also be referenced by buttons or links for consistency.

## Adding Your New Page To Gatsby
In `Page.jsx`:
```$graphql
query($slug: String) {
  sanityHomepage(route: {slug: { current: { eq: $slug } } }) {
      _rawBanner (resolveReferences: {maxDepth:10})
  }
  sanity[YourNewPage](route: {slug: { current: { eq: $slug } } }) {
      _raw[YourPageSection] (resolveReferences: {maxDepth:10})
  }
}
```
