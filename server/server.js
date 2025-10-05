const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

dotenv.config();

// Import Routes
const eventRoutes = require('./routes/eventRoutes');
const userRoutes = require('./routes/userRoutes');
const uploadRoutes = require('./routes/uploadRoutes');
const postRoutes = require('./routes/postRoutes');
const executiveRoutes = require('./routes/executiveRoutes');
const contactRoutes = require('./routes/contactRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');

const app = express();
connectDB();

// --- PRODUCTION CORS SETUP ---
// We'll define a list of allowed origins.
// For now, it's empty, but we'll add our live frontend URL later.
const allowedOrigins = ['http://localhost:5173']; 
if (process.env.FRONTEND_URL) {
  allowedOrigins.push(process.env.FRONTEND_URL);
}
app.use(cors({
  origin: function(origin, callback){
    if(!origin) return callback(null, true);
    if(allowedOrigins.indexOf(origin) === -1){
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
}));
// --- END CORS SETUP ---

app.use(express.json());

const PORT = process.env.PORT || 5001;

// Use Routes
app.get('/', (req, res) => res.send('LSS UNILORIN API is running...'));
app.use('/api/events', eventRoutes);
app.use('/api/users', userRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/executives', executiveRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/dashboard', dashboardRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));