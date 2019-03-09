# PyFuel
Python rewrite of my fuel tracker from PHP. Largely just an excuse to play with Django.

## Dependencies
### Backend
* Python 3.5+
* [Django](https://www.djangoproject.com/)
* [Django REST Framework](https://www.django-rest-framework.org/)
* [Django-environ](https://github.com/joke2k/django-environ)
* mysqlclient [see below](README.md#Database)

Above are the main pieces. Inside [*requirements.txt*](requirements.txt) is a ```pip freeze``` of the full environment.

### Frontend
* Node.js 8.10.0+
* [React](https://reactjs.org/)
* [React Bootstrap](https://react-bootstrap.github.io/)
* [React Router](https://reacttraining.com/react-router/)

Again, the above are the main pieces and the full compliment is in [*dashboard/package.json*](dashboard/package.json). Managed using [Create React App](https://facebook.github.io/create-react-app/).

## Environment Variables

The included [*pyfuel/.env.example*](pyfuel/.env.example) file outlines the environment variables that are required by the backend

## Database

MySQL was used for legacy reasons. Using any supported Django backend on a fresh instance should not pose any issues. 

There were problems with some [functions only properly supporting positional arguments on PostgreSQL](https://docs.djangoproject.com/en/2.1/ref/models/querysets/#distinct) which led to some limitations/frustrations.

## Overview

### Dashboard
Served by the frontend providing a basic reporting overview of fuel and vehicle data

### API Documentation
Served by the backend it outlines all routes and endpoints available.

### Authentication & Permissions
Anonymouse requests are restricted to only safe methods (`GET`, `HEAD`, `OPTIONS`). All methods are available to authenticated requests.

To authenticate, include your token in the HTTP `Authorization` header, prefixed by the string literal "Token". 

Example:

```
Authorization: Token meowmeowmeow123
```

