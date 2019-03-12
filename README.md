# PyFuel
Python rewrite of my fuel tracker from PHP. Largely just an excuse to play with Django.

## Dependencies
### Backend
* Python 3.5+
* [Django](https://www.djangoproject.com/)
* [Django REST Framework](https://www.django-rest-framework.org/)
* [Django-environ](https://github.com/joke2k/django-environ)
* mysqlclient [see below](README.md#Database)

[*backend/requirements.txt*](backend/requirements.txt) is a ```pip freeze``` of the full environment. It contains some helper scripts for AWS ElasticBeanstalk hosting.

### Frontend
* Node.js 8.10.0+
* [React](https://reactjs.org/)
* [React Bootstrap](https://react-bootstrap.github.io/)
* [React Router](https://reacttraining.com/react-router/)

Again, the above are the main pieces and the full compliment is in [*frontend/package.json*](frontend/package.json). Managed using [Create React App](https://facebook.github.io/create-react-app/).

## Environment Variables

The [*backend/pyfuel/.env.example*](backend/pyfuel/.env.example) file outlines the environment variables that are required by the backend, most are security related in Django.

The [*frontend/.env.example*](frontend/.env.example) file outlines the environment variables for the front end.

## Database

MySQL was used for legacy reasons. Using any supported Django backend on a fresh instance should not pose any issues. 

There were problems with some [functions only properly supporting positional arguments on PostgreSQL](https://docs.djangoproject.com/en/2.1/ref/models/querysets/#distinct) which led to some limitations/early frustrations.

## Overview

### Dashboard
Served by the frontend providing a basic reporting overview of fuel and vehicle data.

### Browsable API Documentation
Served by the backend it outlines all routes and endpoints available in addition to the API itself.

### Authentication & Permissions
Anonymouse requests are restricted to only safe methods (`GET`, `HEAD`, `OPTIONS`). All methods are available to authenticated requests.

To authenticate, include your token in the HTTP `Authorization` header, prefixed by the string literal "Token".
The browsable API includes a log in option for accessing html forms of the protected methods.

Example header:

```
Authorization: Token meowmeowmeow123
```
