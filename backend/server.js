const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/digital-shield-academy', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.error('MongoDB Connection Error:', err));

// Routes
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/modules', require('./routes/modules.routes'));
app.use('/api/progress', require('./routes/progress.routes'));
app.use('/api/simulations', require('./routes/simulations.routes'));
app.use('/api/threat-of-week', require('./routes/threatOfTheWeek.routes'));
app.use('/api/business', require('./routes/business.routes'));
app.use('/api/blog', require('./routes/blog.routes'));
app.use('/api/spam-submissions', require('./routes/spamSubmissions.routes'));

// Basic route
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to Digital Shield Academy API' });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});