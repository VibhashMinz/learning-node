# Core Concept: Event-Driven Programming in Node.js

This file explains the "event-driven" model, which is the heart of how Node.js works, and how it directly relates to **Blocking vs. Non-Blocking** code.

You can't understand one without the other. They are cause and effect.

* **The Strategy:** Event-Driven Programming (your app waits for and reacts to events).
* **The Tactic:** Non-Blocking I/O (the *how* that makes the strategy possible).

---

## 1. What is Event-Driven Programming?

At its core, it's a programming style where the flow of your application is determined by **events**—things that happen.

Think of the difference between reading a recipe and waiting for push notifications.

* **Traditional (Synchronous) Code:** Is like a **recipe** 👨‍🍳. You *must* do Step 1 (chop vegetables), then Step 2 (heat pan), then Step 3 (cook). Your program is "blocked" at each step until it's done.
* **Event-Driven (Asynchronous) Code:** Is like waiting for **push notifications** 📱. Your phone isn't constantly checking for texts. It just waits. When a new text arrives (an **event**), the phone notifies you (the **listener**) and you react.

A Node.js application starts, sets up all its "listeners," and then **waits** for events to happen.

### The 3 Core Components

1.  **Event Emitter:** This is the "thing" that produces or "emits" an event.
    * *Example:* An `http` server, which emits a `'request'` event when a new user visits.
    * *Example:* A file reader, which emits an `'end'` event when it's done reading.

2.  **Event Listener (Handler/Callback):** This is the **function you write** that *reacts* to an event. It's the "what to do" code.
    * *Example:* The function you give to `server.on('request', ...)` is the listener.

3.  **The Event Loop:** This is the manager that constantly checks, "Has an event fired?" When it sees one, it takes the corresponding **listener function** and runs it.

---

## 2. The Key Tactic: Blocking vs. Non-Blocking I/O

This is the *implementation* that makes the event-driven model work.

Let's use our **waiter analogy**:

* **The Strategy:** The waiter's job is to be event-driven (react to `'customer-arrived'`, `'food-ready'`, `'waving-for-bill'`).
* **The Problem:** What happens when a customer orders food (a slow I/O task)?
* **Blocking (The Mistake):** The waiter gives the order to the kitchen and *stands there staring at the chef* until the food is done. They are now **blocked**. They cannot react to any new events (like a new customer arriving). This breaks the event-driven model.
* **Non-Blocking (The Tactic):** The waiter gives the order to the kitchen and **immediately** walks away. They are now free to react to other events. When the food is ready, the chef fires a `'food-ready'` event (rings a bell), and the waiter (the Event Loop) handles it when they are free.

**In Node.js, you MUST use non-blocking code to keep your event-driven system responsive.**

### Code Example: Reading a File

Let's see the difference in code. We want to read a file and then print "Done!".

#### ❌ Blocking (Synchronous) - `readFileSync`

This is the **wrong** way. It blocks the single thread.

```javascript
const fs = require('fs');

console.log('1. Starting...');

// BLOCKS HERE!
// The entire program freezes until the file is read.
// No other events can be handled.
const data = fs.readFileSync('./my-file.txt');

console.log('2. File content is ready.');

console.log('3. Done!');
```

**Output:**
```
1. Starting...
2. File content is ready.
3. Done!
```
The flow is predictable (1, 2, 3) but the program is *frozen* during the file-reading step.

#### ✅ Non-Blocking (Asynchronous) - `readFile`

This is the **correct** way. It uses an event listener (a callback).

```javascript
const fs = require('fs');

console.log('1. Starting...');

// DOES NOT BLOCK!
// It tells the system "Go get this file" and moves on.
// The (err, data) => { ... } function is the listener
// for the "file read is complete" event.
fs.readFile('./my-file.txt', (err, data) => {
  // This code runs LATER, when the event fires
  console.log('2. File content is ready.');
});

console.log('3. Done!');
```

**Output:**
```
1. Starting...
3. Done!
2. File content is ready.
```
Notice the order! The program starts the file read, immediately moves on to print "3. Done!", and *only when the file is finished* does the Event Loop run the listener to print "2. File content is ready."

This is the power of the event-driven model. Your program is never stuck.

---

## 3. Examples in Practice

These two examples show how the concepts work together.

### Example 1: The `http` Server (Putting it all together)

This is the most common example. Your server is an **Event Emitter** that uses **Non-Blocking I/O** inside its **Event Listeners**.

```javascript
const http = require('http');
const fs = require('fs');

// 1. Create the emitter (the server)
const server = http.createServer();

// 2. Register a Listener for the 'request' event
server.on('request', (req, res) => {
  
  console.log(`Event: 'request' for ${req.url}`);
  
  // This is a NEW, NON-BLOCKING task.
  // The server does not block here. It delegates this
  // file reading and is ready for ANOTHER request.
  fs.readFile('./my-webpage.html', (err, data) => {
    // This listener runs when the 'file-ready' event fires
    if (err) {
      res.writeHead(500);
      res.end('Error loading page');
    } else {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(data);
    }
  });
  
});

// 3. Start the server
//    It now just WAITS for 'request' events.
server.listen(8000, () => {
  console.log('Server is listening... waiting for events.');
});
```

### Example 2: Creating Your Own Events

Node.js lets you create your own custom events using the `EventEmitter` class. This is great for organizing complex logic in your application.

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

**Output of the code above:**
```
Setting up my listeners... now I'm ready.
Hello, Alice! The 'greet' event fired.
Someone was greeted!
Fired the event. Now waiting for more...
```