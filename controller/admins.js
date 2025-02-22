import { query } from './config'; // Import your PostgreSQL pool

const getAdmins = async (req, res) => { // No 'export' here
  try {
    const result = await query('SELECT * FROM admins');
    console.log('Admins (async/await):', result.rows);
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching admins (async/await):', error);
    res.status(500).json({ error: 'Failed to fetch admins: ' + error.message });
  }
};

export default {  // Export the function using module.exports
  getAdmins, // You can also export other functions if you have them
};
