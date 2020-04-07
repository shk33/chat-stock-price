# Chat with consulting Stock command

## Overview
A simple chat application using socket.io for real time communication, using Mongo for storing the messages.
The users can connect to different rooms.
The chat accepts a consulting stock price command through `/stock=STOCK_SYMBOL` where `STOCK_SYMBOL` is the stock code from `stooq.com`; e.g. aapl.us
Those requests for consulting the priced are published and consumed via Rabbit MQ Queue.

You can join with any name and any chat room.
E.g. name: test1, rooom: room1

There cannot be two users with the same name on the same room.
If you join a room with already existing messages you can see the lastest 50 messages.

## Backend Folder Structure
* `config`: Folder containing files for configuration values such as Mongo and RabbitMQ
* `controllers`: A single controller is found for retreiving messages in a chat room.
* `database`: Mongo Connection and Mongo Schema are defined there.
* `helpers`: Helpers for parsing csv data.
* `services`: Many services for the differents actions required on the backend
* `test`: Unit tests
* `worker`: Worker for consuming the RabbitMQ queue

## Installation
First make sure the have installed on your computer `Mongo 4`, `Node v12.14.1`.

The Rabbit MQ is on the cloud, so there is no need to have installed locally.

Mongo Database name is `chat-mc`;

For installation simplicity and since this a code challange I did not hide some sensitive values `RabbitMQ Cloud`, otherwise I would have read them from an `.env` file.

* Clone the repository

* Install the client (Front end) dependencies 
```
cd client
npm install
```

* Install server (backend) dependencies
```
cd server
npm install
```

## Running the project

* Start the server
```
cd server
npm run start
```

* Start the client
```
cd client
npm start
```

Open the browser on `http://localhost:3000/`

## Server Unit testing

```
cd server
npm run test
```