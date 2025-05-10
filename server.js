// Importar dependencias necesarias
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const app = express();

// Conectar con MongoDB Atlas (actualiza esta cadena con tu propia URL)
const dbURI = 'mongodb+srv://mariaelizondo:1234@cluster0.sslpwls.mongodb.net/floreria?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Conectado a MongoDB Atlas'))
    .catch((error) => console.error('Error de conexión:', error));

// Configuración de EJS y Express
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

// Servir archivos estáticos (CSS, imágenes, JS, etc.)
app.use(express.static('public'));

// Crear el esquema y modelo de "Florería"
const florSchema = new mongoose.Schema({
    nombre: String,
    color: String,
    precio: Number
});

const Flor = mongoose.model('Flor', florSchema);

// Rutas

// Ruta para mostrar todas las flores
app.get('/', async (req, res) => {
    try {
        const flores = await Flor.find();
        res.render('index', { flores: flores });
    } catch (error) {
        console.log(error);
        res.status(500).send('Error al obtener flores.');
    }
});

// Ruta para ver los detalles de una flor
app.get('/flor/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const flor = await Flor.findById(id);
        res.render('detalle', { flor: flor });
    } catch (error) {
        console.log(error);
        res.status(500).send('Error al obtener la flor.');
    }
});

// Ruta para agregar una nueva flor (formulario)
app.get('/agregar', (req, res) => {
    res.render('agregar');
});

// Ruta para procesar el formulario de agregar flor
app.post('/agregar', async (req, res) => {
    const { nombre, color, precio } = req.body;
    const nuevaFlor = new Flor({
        nombre: nombre,
        color: color,
        precio: precio
    });
    try {
        await nuevaFlor.save();
        res.redirect('/');
    } catch (error) {
        console.log(error);
        res.status(500).send('Error al guardar la flor.');
    }
});

// Ruta para editar una flor (formulario)
app.get('/editar/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const flor = await Flor.findById(id);
        res.render('editar', { flor: flor });
    } catch (error) {
        console.log(error);
        res.status(500).send('Error al obtener la flor para editar.');
    }
});

// Ruta para procesar el formulario de edición de flor
app.post('/editar/:id', async (req, res) => {
    const id = req.params.id;
    const { nombre, color, precio } = req.body;
    try {
        await Flor.findByIdAndUpdate(id, { nombre, color, precio });
        res.redirect('/');
    } catch (error) {
        console.log(error);
        res.status(500).send('Error al editar la flor.');
    }
});

// Ruta para eliminar una flor
app.post('/eliminar/:id', async (req, res) => {
    const id = req.params.id;
    try {
        await Flor.findByIdAndDelete(id);
        res.redirect('/');
    } catch (error) {
        console.log(error);
        res.status(500).send('Error al eliminar la flor.');
    }
});

// Iniciar el servidor
const port = 3000;
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});

