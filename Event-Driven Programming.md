# Core Concept: Event-Driven Programming in Node.js

This file explains the "event-driven" model, which is the heart of how Node.js works.

## What is Event-Driven Programming?

At its core, it's a programming style where the flow of your application is determined by **events**—things that happen.

Think of the difference between reading a recipe and waiting for push notifications.

* **Traditional (Synchronous) Code:** Is like a **recipe**. You *must* do Step 1 (chop vegetables), then Step 2 (heat pan), then Step 3 (cook). Your program is "blocked" at each step until it's done.
* **Event-Driven (Asynchronous) Code:** Is like waiting for **push notifications** on your phone. Your phone isn't constantly checking for texts. It just waits. When a new text arrives (an **event**), the phone notifies you (the **listener**) and you react.

A Node.js application starts, sets up all its "listeners," and then **waits** for events to happen.

## The 3 Core Components

1.  **Event Emitter:** This is the "thing" that produces or "emits" an event.
    * *Example:* An `http` server, which emits a `'request'` event when a new user visits.
    * *Example:* A file reader, which emits an `'end'` event when it's done reading.

2.  **Event Listener (Handler/Callback):** This is the **function you write** that *reacts* to an event. It's the "what to do" code.
    * *Example:* The function you give to `server.on('request', ...)` is the listener.

3.  **The Event Loop:** This is the manager that constantly checks, "Has an event fired?" When it sees one, it takes the corresponding **listener function** and runs it.

---

## Example 1: The `http` Server

This is the most common example. When you create an `http` server, you are creating an **Event Emitter**.

The `http.createServer(...)` code you've seen is just a shortcut. The *real* (long-form) way it works is like this:

```javascript
const http = require('http');

// 1. Create the emitter (the server)
const server = http.createServer();

// 2. Register a Listener
//    You say: "Hey server, ON the 'request' event, run this function."
//    This function is your Event Listener (or callback).
server.on('request', (req, res) => {
  // This code only runs WHEN a user makes a request
  console.log('A request came in!');
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello, World!');
});

// 3. Start the server
//    The server now just WAITS for 'request' events.
server.listen(8000, () => {
  console.log('Server is listening on port 8000... waiting for events.');
});
```

Your program doesn't end. It just sits and *waits* for the `'request'` event to be emitted.

## Example 2: Creating Your Own Events

Node.js lets you create your own custom events using the `EventEmitter` class.



```javascript
// 1. Import the events module
const EventEmitter = require('events');

// 2. Create your own emitter
const myEmitter = new EventEmitter();

// 3. Register a listener
//    .on(eventName, listenerFunction)
//    "ON the 'greet' event, run this function"
myEmitter.on('greet', (name) => {
  console.log(`Hello, ${name}! The 'greet' event fired.`);
});

// 4. Register another listener for the same event
myEmitter.on('greet', () => {
  console.log('Someone was greeted!');
});

// Your code continues to run...
console.log("Setting up my listeners... now I'm ready.");

// 5. Sometime later, you "emit" (or fire) the event
//    .emit(eventName, ...args)
//    "EMIT the 'greet' event and pass 'Alice' as an argument"
myEmitter.emit('greet', 'Alice');

console.log('Fired the event. Now waiting for more...');
```

### Output of the code above:

```
Setting up my listeners... now I'm ready.
Hello, Alice! The 'greet' event fired.
Someone was greeted!
Fired the event. Now waiting for more...
```

### Key Takeaway

Your Node.js application is a collection of **listeners waiting for events**. This is what allows it to be non-blocking and handle many things at once without getting stuck.