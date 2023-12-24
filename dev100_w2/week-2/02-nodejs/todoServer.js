/**
  You need to create an express HTTP server in Node.js which will handle the logic of a todo list app.
  - Don't use any database, just store all the data in an array to store the todo list data (in-memory)
  - Hard todo: Try to save responses in files, so that even if u exit the app and run it again, 
  the data remains (similar to databases)

  Each todo has a title and a description. The title is a string and the description is a string.
  Each todo should also get an unique autogenerated id every time it is created
  The expected API endpoints are defined below,
  1.GET /todos - Retrieve all todo items
    Description: Returns a list of all todo items.
    Response: 200 OK with an array of todo items in JSON format.
    Example: GET http://localhost:3000/todos
    
  2.GET /todos/:id - Retrieve a specific todo item by ID
    Description: Returns a specific todo item identified by its ID.
    Response: 200 OK with the todo item in JSON format if found, or 404 Not Found if not found.
    Example: GET http://localhost:3000/todos/123
    
  3. POST /todos - Create a new todo item
    Description: Creates a new todo item.
    Request Body: JSON object representing the todo item.
    Response: 201 Created with the ID of the created todo item in JSON format. eg: {id: 1}
    Example: POST http://localhost:3000/todos
    Request Body: { "title": "Buy groceries", "completed": false, description: "I should buy groceries" }
    
  4. PUT /todos/:id - Update an existing todo item by ID
    Description: Updates an existing todo item identified by its ID.
    Request Body: JSON object representing the updated todo item.
    Response: 200 OK if the todo item was found and updated, or 404 Not Found if not found.
    Example: PUT http://localhost:3000/todos/123
    Request Body: { "title": "Buy groceries", "completed": true }
    
  5. DELETE /todos/:id - Delete a todo item by ID
    Description: Deletes a todo item identified by its ID.
    Response: 200 OK if the todo item was found and deleted, or 404 Not Found if not found.
    Example: DELETE http://localhost:3000/todos/123

    - For any other route not defined in the server return 404

  Testing the server - run `npm run test-todoServer` command in terminal
 */
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const { error } = require('console');

const app = express();

app.use(bodyParser.json());

app.get("/todos", (req, res) => {
  fs.readFile("../todos.json", "utf-8", (err, data) => {
    if(err) {
      throw err
    }
    res.status(200).json(JSON.parse(data))
  })
})

app.get("/todos/:id", (req, res) => {
    const searchId = req.params['id']
    // console.log(searchId)

    fs.readFile("../todos.json", "utf-8", (err, data) => {
      if(err) throw err;

      const fileData = JSON.parse(data);

      // console.log(fileData)

      const matchEntry = fileData.filter((entry) => {
        // console.log("Inside:")
        // console.log(entry)
        return entry.id == searchId
      })

      // console.log(matchEntry)

      if(matchEntry.length>0) {
        res.status(200).json(matchEntry[0])
      } else {
        res.status(404).json({})
      }

    })
})

app.post("/todos", (req, res) => {
  newTodo = {
    id: Math.ceil(Math.random() * 100000000),
    title: req.body.title,
    description: req.body.description
  }

  fs.readFile("../todos.json", "utf-8", (err, data) => {
    if(err) throw err
    // console.log(data)
    // console.log(newTodo)
    const newData = JSON.parse(data)
    newData.push(newTodo);
    // console.log("HERE")
    // console.log(newData)
    fs.writeFile("../todos.json", JSON.stringify(newData), (error) => {
      if (error) {
        throw error
      }
      res.status(201).json({id: newTodo.id})
    })
  })
})

app.put("/todos/:id", (req, res) => {
  const reqId = req.params['id']
  // console.log(reqId)
  // console.log(req.body)

  fs.readFile("../todos.json", "utf-8", (err, data) => {
    if(err) throw err

    const fileData = JSON.parse(data);
    // console.log(fileData)

    let foundIndex = -1

    for(i=0; i< fileData.length;i++) {
      if(fileData[i].id == reqId) {
        foundIndex = i
      }
    }

    // console.log(foundIndex)

    if(foundIndex !== -1) {
      // console.log("Inside if")
      
      const updatedEntry = {
        id: fileData[foundIndex].id,
        title: req.body.title,
        description: req.body.description
      }

      // console.log("filedata")
      // console.log(fileData)
      fileData[foundIndex] = updatedEntry
      // console.log(fileData)

      fs.writeFile("../todos.json", JSON.stringify(fileData), (err) => {
        // console.log("Inside write file")
        if(err) throw err
        else res.status(200).json(updatedEntry)
   
      })
 } else {
      res.status(404).json({})
    }

  })
  
})

app.delete("/todos/:id", (req, res) => {
  res.json({})
})

module.exports = app;