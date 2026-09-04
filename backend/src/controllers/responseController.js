const { pool } = require('../config/db');

// GET /api/health
async function checkHealth(req, res) {
  try {
    const result = await pool.query('SELECT NOW()');
    return res.json({ status: 'ok', dbTime: result.rows[0].now });
  } catch (err) {
    return res.status(500).json({ status: 'error', message: err.message });
  }
}

// POST /api/responses
async function createResponse(req, res) {
  try {
    const { email, dateIdea, coffeeType, foodPreference, selectedDate, selectedTime, notes } = req.body;

    if (!email || !email.trim()) {
      return res.status(400).json({ error: 'Email là bắt buộc' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return res.status(400).json({ error: 'Email không hợp lệ' });
    }

    if (!dateIdea) {
      return res.status(400).json({ error: 'Vui lòng chọn ý tưởng hẹn hò' });
    }

    if (!coffeeType) {
      return res.status(400).json({ error: 'Vui lòng chọn loại quán cafe' });
    }

    if (!selectedDate || !selectedTime) {
      return res.status(400).json({ error: 'Vui lòng chọn ngày và giờ hẹn' });
    }

    const query = `
      INSERT INTO date_responses (email, date_idea, coffee_type, selected_date, selected_time, food_preference, notes)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *;
    `;
    const values = [
      email.trim(),
      dateIdea.trim(),
      coffeeType.trim(),
      selectedDate,
      selectedTime.trim(),
      (foodPreference || '').trim() || null,
      (notes || '').trim() || null,
    ];

    const result = await pool.query(query, values);
    console.log(`🎉 New date response recorded from: ${email.trim()} (${dateIdea.trim()} - ${coffeeType.trim()}) for ${selectedDate}`);

    return res.status(201).json({
      success: true,
      message: 'Hẹn hò đã được lưu thành công! 💕',
      data: result.rows[0],
    });
  } catch (err) {
    console.error('Error saving date response:', err);
    return res.status(500).json({
      error: 'Có lỗi xảy ra khi lưu thông tin. Vui lòng thử lại!',
      details: err.message,
    });
  }
}

// GET /api/responses
async function getResponses(req, res) {
  try {
    const result = await pool.query(`
      SELECT 
        id, 
        email, 
        date_idea, 
        coffee_type,
        TO_CHAR(selected_date, 'YYYY-MM-DD') as selected_date, 
        selected_time, 
        food_preference, 
        notes, 
        created_at 
      FROM date_responses 
      ORDER BY created_at DESC
    `);
    return res.json({
      success: true,
      count: result.rowCount,
      data: result.rows,
    });
  } catch (err) {
    console.error('Error fetching responses:', err);
    return res.status(500).json({
      error: 'Lỗi lấy dữ liệu phản hồi',
      details: err.message,
    });
  }
}

module.exports = {
  checkHealth,
  createResponse,
  getResponses,
};
