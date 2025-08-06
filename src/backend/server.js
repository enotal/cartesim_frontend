// server.js (Node.js backend)
const express = require('express')
const sqlite3 = require('sqlite3').verbose()
// Initialiser l'application
const app = express()
const cors = require('cors') // For handling CORS if React app is on a different origin
const port = 3001

app.use(cors())
app.use(express.json())
app.use(express.urlencoded())
// app.use(bodyParser.json()) // depreciated

let sqlQuery
let params

const db = new sqlite3.Database('./optiacademiqplus_db.db', (err) => {
  if (err) {
    console.error(err.message)
  }
  console.log('Connected to the SQLite database.')
})

//=== TYPEREPONDANTS ===

// Example API endpoint to get data
app.get('/api/typerepondants', (req, res) => {
  try {
    sqlQuery = 'SELECT * FROM typerepondants ORDER BY (id) DESC'
    /*const queryObject = url.parse(req.url, true).query  // query parameters
    if (queryObject.field &&  queryObject.type){
      sqlQuery += ` WHERE ${queryObject.field} LIKE %${queryObject.type}%`
    }*/
    db.all(sqlQuery, [], (err, rows) => {
      if (err) {
        return res.json({ status: 300, success: false, error: err.message })
      }
      if (rows.length < 1) {
        return res.json({ status: 300, success: false, error: 'No match' })
      }
      return res.json({
        status: 200,
        success: true,
        message: 'Items matched',
        data: rows,
      })
    })
  } catch (error) {
    return res.json({
      status: 400,
      success: false,
      message: 'No match',
      error: error.message,
    })
  }
})

// Example API endpoint to add data
app.post('/api/typerepondants', (req, res) => {
  try {
    const { libelle, code } = req.body
    sqlQuery = 'INSERT INTO typerepondants (libelle, code) VALUES (?, ?)'
    params = [libelle, code]
    db.run(sqlQuery, params, (err) => {
      if (err) {
        return res.json({ status: 300, success: false, error: err.message })
      }
      return res.json({
        status: 200,
        success: true,
        message: 'Item added successfully',
        id: this.lastID,
      })
    })
  } catch (error) {
    return res.json({
      status: 400,
      success: false,
      message: 'Item not added',
    })
  }
})

// Example API endpoint to update data
app.patch('/api/typerepondants/:id', (req, res) => {
  try {
    const { id, libelle, code } = req.body
    sqlQuery = 'UPDATE typerepondants SET libelle = ?, code = ? WHERE id = ?'
    params = [libelle, code, id]
    db.run(sqlQuery, params, (err) => {
      if (err) {
        return res.json({ status: 300, success: false, error: err.message })
      }
      return res.json({
        status: 200,
        success: true,
        message: 'Item edited successfully',
        // id: this.lastID,
      })
    })
  } catch (error) {
    return res.json({
      status: 400,
      success: false,
      message: 'Item not edited',
    })
  }
})

// Example API endpoint to update data
app.delete('/api/typerepondants/:id', (req, res) => {
  try {
    const { id } = req.params
    params = id.toString()
    sqlQuery = 'DELETE FROM typerepondants WHERE id IN (' + params + ')'
    db.run(sqlQuery, (err) => {
      if (err) {
        return res.json({ status: 300, success: false, error: err.message })
      }
      return res.json({
        status: 200,
        success: true,
        message: 'Items deleted successfully',
        // id: this.lastID,
      })
    })
  } catch (error) {
    return res.json({
      status: 400,
      success: false,
      message: 'Items not deleted',
    })
  }
})

//=== TYPEREPONDANTS ===

// Example API endpoint to get data
app.get('/api/modalites', (req, res) => {
  try {
    sqlQuery = 'SELECT * FROM modalites ORDER BY (id) DESC'
    db.all(sqlQuery, [], (err, rows) => {
      if (err) {
        return res.json({ status: 300, success: false, error: err.message })
      }
      if (rows.length < 1) {
        return res.json({ status: 300, success: false, error: 'No match' })
      }
      return res.json({
        status: 200,
        success: true,
        message: 'Items matched',
        data: rows,
      })
    })
  } catch (error) {
    return res.json({
      status: 400,
      success: false,
      message: 'No match',
      error: error.message,
    })
  }
})

// Example API endpoint to add data
app.post('/api/modalites', (req, res) => {
  try {
    const { libelle, code } = req.body
    sqlQuery = 'INSERT INTO modalites (libelle) VALUES (?)'
    params = [libelle, code]
    db.run(sqlQuery, params, (err) => {
      if (err) {
        return res.json({ status: 300, success: false, error: err.message })
      }
      return res.json({
        status: 200,
        success: true,
        message: 'Item added successfully',
        id: this.lastID,
      })
    })
  } catch (error) {
    return res.json({
      status: 400,
      success: false,
      message: 'Item not added',
    })
  }
})

// Example API endpoint to update data
app.patch('/api/modalites/:id', (req, res) => {
  try {
    const { id, libelle } = req.body
    sqlQuery = 'UPDATE modalites SET libelle = ? WHERE id = ?'
    params = [libelle, id]
    db.run(sqlQuery, params, (err) => {
      if (err) {
        return res.json({ status: 300, success: false, error: err.message })
      }
      return res.json({
        status: 200,
        success: true,
        message: 'Item edited successfully',
        // id: this.lastID,
      })
    })
  } catch (error) {
    return res.json({
      status: 400,
      success: false,
      message: 'Item not edited',
    })
  }
})

// Example API endpoint to update data
app.delete('/api/modalites/:id', (req, res) => {
  try {
    const { id } = req.params
    params = id.toString()
    sqlQuery = 'DELETE FROM modalites WHERE id IN (' + params + ')'
    db.run(sqlQuery, (err) => {
      if (err) {
        return res.json({ status: 300, success: false, error: err.message })
      }
      return res.json({
        status: 200,
        success: true,
        message: 'Items deleted successfully',
        // id: this.lastID,
      })
    })
  } catch (error) {
    return res.json({
      status: 400,
      success: false,
      message: 'Items not deleted',
    })
  }
})


//=== THEMATIQUES ===

// Example API endpoint to get data
app.get('/api/thematiques', (req, res) => {
  try {
    sqlQuery = 'SELECT * FROM thematiques ORDER BY (id) DESC'
    db.all(sqlQuery, [], (err, rows) => {
      if (err) {
        return res.json({ status: 300, success: false, error: err.message })
      }
      if (rows.length < 1) {
        return res.json({ status: 300, success: false, error: 'No match' })
      }
      return res.json({
        status: 200,
        success: true,
        message: 'Items matched',
        data: rows,
      })
    })
  } catch (error) {
    return res.json({
      status: 400,
      success: false,
      message: 'No match',
      error: error.message,
    })
  }
})

// Example API endpoint to add data
app.post('/api/thematiques', (req, res) => {
  const { libellecourt, libellelong, code } = req.body
  const params = [libellecourt, libellelong, code]
  const sqlQuery = 'INSERT INTO thematiques (libellecourt, libellelong, code) VALUES (?, ?, ?)'
  db.run(sqlQuery, params, function (err) {
    if (err) {
      res.status(500).json({ error: err.message })
      return
    }
    res.json({ message: 'Item added successfully', id: this.lastID })
  })
})

// Example API endpoint to update data
app.patch('/api/thematiques/:id', (req, res) => {
  const { id, libellecourt, libellelong, code } = req.body
  const params = [libellecourt, libellelong, code, id]
  const sqlQuery = 'UPDATE thematiques SET libellecourt = ?, libellelong = ?, code = ? WHERE id = ?'
  db.run(sqlQuery, params, function (err) {
    if (err) {
      res.status(500).json({ error: err.message })
      return
    }
    res.json({ message: 'Item updated successfully', id: this.lastID })
  })
})

// Example API endpoint to update data
app.delete('/api/thematiques/:id', (req, res) => {
  const { id } = req.params
  const params = id.toString()
  var sqlQuery = ''
  sqlQuery = 'DELETE FROM thematiques WHERE id IN (' + params + ')'
  db.run(sqlQuery, function (err) {
    if (err) {
      res.status(500).json({ error: err.message })
      return
    }
    res.json({ message: 'Item deleted successfully', id: this.lastID })
  })
})

//=== DIMENSIONS ===

// Example API endpoint to get data
app.get('/api/dimensions', (req, res) => {
  try {
    sqlQuery = 'SELECT * FROM dimensions ORDER BY (id) DESC'
    db.all(sqlQuery, [], (err, rows) => {
      if (err) {
        return res.json({ status: 300, success: false, error: err.message })
      }
      if (rows.length < 1) {
        return res.json({ status: 300, success: false, error: 'No match' })
      }
      return res.json({
        status: 200,
        success: true,
        message: 'Items matched',
        data: rows,
      })
    })
  } catch (error) {
    return res.json({
      status: 400,
      success: false,
      message: 'No match',
      error: error.message,
    })
  }
})

// Example API endpoint to add data
app.post('/api/dimensions', (req, res) => {
  const { thematique_id, libellecourt, libellelong, code, typerepondant } = req.body
  const params = [libellecourt, libellelong, code, typerepondant, thematique_id]
  const sqlQuery =
    'INSERT INTO dimensions (libellecourt, libellelong, code, typerepondant, thematique_id) VALUES (?, ?, ?, ?, ?)'
  db.run(sqlQuery, params, function (err) {
    if (err) {
      res.status(500).json({ error: err.message })
      return
    }
    res.json({ message: 'Item added successfully', id: this.lastID })
  })
})

// Example API endpoint to update data
app.patch('/api/dimensions/:id', (req, res) => {
  const { id, thematique_id, libellecourt, libellelong, code, typerepondant } = req.body
  const params = [libellecourt, libellelong, code, typerepondant, thematique_id, id]
  const sqlQuery =
    'UPDATE dimensions SET libellecourt = ?, libellelong = ?, code = ?, typerepondant = ?, thematique_id = ? WHERE id = ?'
  db.run(sqlQuery, params, function (err) {
    if (err) {
      res.status(500).json({ error: err.message })
      return
    }
    res.json({ message: 'Item added successfully', id: this.lastID })
  })
})

// Example API endpoint to update data
app.delete('/api/dimensions/:id', (req, res) => {
  const { id } = req.params
  const params = id.toString()
  var sqlQuery = ''
  sqlQuery = 'DELETE FROM dimensions WHERE id IN (' + params + ')'
  db.run(sqlQuery, function (err) {
    if (err) {
      res.status(500).json({ error: err.message })
      return
    }
    res.json({ message: 'Item deleted successfully', id: this.lastID })
  })
})

//=== VARIABLES ===

// Example API endpoint to get data
app.get('/api/variables', (req, res) => {
  try {
    sqlQuery = 'SELECT * FROM variables ORDER BY (id) DESC'
    db.all(sqlQuery, [], (err, rows) => {
      if (err) {
        return res.json({ status: 300, success: false, error: err.message })
      }
      if (rows.length < 1) {
        return res.json({ status: 300, success: false, error: 'No match' })
      }
      return res.json({
        status: 200,
        success: true,
        message: 'Items matched',
        data: rows,
      })
    })
  } catch (error) {
    return res.json({
      status: 400,
      success: false,
      message: 'No match',
      error: error.message,
    })
  }
})

// Example API endpoint to add data
app.post('/api/variables', (req, res) => {
  const { dimension_id, libelle } = req.body
  const params = [libelle, dimension_id]
  const sqlQuery = 'INSERT INTO variables (libelle, dimension_id) VALUES (?, ?)'
  db.run(sqlQuery, params, function (err) {
    if (err) {
      res.status(500).json({ error: err.message })
      return
    }
    res.json({ message: 'Item added successfully', id: this.lastID })
  })
})

// Example API endpoint to update data
app.patch('/api/variables/:id', (req, res) => {
  const { id, dimension_id, libelle } = req.body
  const params = [libelle, dimension_id, id]
  const sqlQuery = 'UPDATE variables SET libelle = ?, dimension_id = ? WHERE id = ?'
  db.run(sqlQuery, params, function (err) {
    if (err) {
      res.status(500).json({ error: err.message })
      return
    }
    res.json({ message: 'Item added successfully', id: this.lastID })
  })
})

// Example API endpoint to update data
app.delete('/api/variables/:id', (req, res) => {
  const { id } = req.params
  const params = id.toString()
  var sqlQuery = ''
  sqlQuery = 'DELETE FROM variables WHERE id IN (' + params + ')'
  db.run(sqlQuery, function (err) {
    if (err) {
      res.status(500).json({ error: err.message })
      return
    }
    res.json({ message: 'Item deleted successfully', id: this.lastID })
  })
})

//=== QUESTIONS ===

// Example API endpoint to get data
app.get('/api/questions', (req, res) => {
  try {
    sqlQuery = 'SELECT * FROM questions ORDER BY (id) DESC'
    db.all(sqlQuery, [], (err, rows) => {
      if (err) {
        return res.json({ status: 300, success: false, error: err.message })
      }
      if (rows.length < 1) {
        return res.json({ status: 300, success: false, error: 'No match' })
      }
      return res.json({
        status: 200,
        success: true,
        message: 'Items matched',
        data: rows,
      })
    })
  } catch (error) {
    return res.json({
      status: 400,
      success: false,
      message: 'No match',
      error: error.message,
    })
  }
})

// Example API endpoint to add data
app.post('/api/questions', (req, res) => {
  const { dimension_id, libelle } = req.body
  const params = [libelle, dimension_id]
  const sqlQuery = 'INSERT INTO questions (libelle, dimension_id) VALUES (?, ?)'
  db.run(sqlQuery, params, function (err) {
    if (err) {
      res.status(500).json({ error: err.message })
      return
    }
    res.json({ message: 'Item added successfully', id: this.lastID })
  })
})

// Example API endpoint to update data
app.patch('/api/questions/:id', (req, res) => {
  const { id, dimension_id, libelle } = req.body
  const params = [libelle, dimension_id, id]
  const sqlQuery = 'UPDATE questions SET libelle = ?, variable_id = ? WHERE id = ?'
  db.run(sqlQuery, params, function (err) {
    if (err) {
      res.status(500).json({ error: err.message })
      return
    }
    res.json({ message: 'Item added successfully', id: this.lastID })
  })
})

// Example API endpoint to update data
app.delete('/api/questions/:id', (req, res) => {
  const { id } = req.params
  const params = id.toString()
  var sqlQuery = ''
  sqlQuery = 'DELETE FROM questions WHERE id IN (' + params + ')'
  db.run(sqlQuery, function (err) {
    if (err) {
      res.status(500).json({ error: err.message })
      return
    }
    res.json({ message: 'Item deleted successfully', id: this.lastID })
  })
})

// ... other API endpoints for CRUD operations

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
/*
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));*/
