import pool from '../config/db.js'; // ESM import, make sure your db config uses export default

export const getEval = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM evaluation');
    res.json(result.rows);
  } catch (error) {
    console.error("Error", error);
    res.status(500).json({
      error: "failed"
    });
  }
};

export const postEval = async (req, res) => {
  try {
    const { BERTSCOREPrecision, BERTSCORERecall, BERTSCOREF1, ROGUE1, ROGUE2, ROGUEL } = req.body;

    const result = await pool.query(
      'INSERT INTO PerformanceReport ("BERTSCOREPrecision", "BERTSCORERecall", "BERTSCOREF1", "ROGUE1", "ROGUE2", "ROGUEL") VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [BERTSCOREPrecision, BERTSCORERecall, BERTSCOREF1, ROGUE1, ROGUE2, ROGUEL]
    );

    res.status(201).json({
      message: "Success",
      result: result.rows[0]
    });
  } catch (error) {
    console.error("Error!", error);
    res.status(500).json({
      message: "Failed"
    });
  }
};
