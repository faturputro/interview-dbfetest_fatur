# Danabijak Interview

This project is made with **Vue 3 + Vite** along with other 3rd party libraries such as, **TailwindCSS**, **Element Plus** and **Axios**

## Features:
1. In the `Account` page, users can add, edit, and close account.
2. User can search for a specific account name and upon refreshing the page search results will persists
3. In the `Payment` page, users can add payment
4. User can search for a specific payment name and upon refreshing the page search results will persists
5. Users can type in the `Beneficiary` or `Remitter` fields to search for a specific account that they may want to create payment


**Setting Up**

To run this project please follow the provided `.example.env` file and copy the variables
into your own `.env` files

| Var | Description |
|----------|-------------|
|`VITE_API_BASE_URL`| API url host|
|`VITE_API_AUTH_USERNAME`| API Basic Auth Username|
|`VITE_API_AUTH_PASS`| API Basic Auth Password|


To run this project in development
```
yarn dev
```

Build for production environment
```
yarn build
```

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar)
