// src/controllers/utmController.js

const utmService = require("../../services/utmService");

class UTMController {
  async createUTM(req, res) {
    try {
      const utm = await utmService.createUTM(req.body);
      return res.status(201).json({ success: true, data: utm });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  }

  async getAllUTMs(req, res) {
    try {
      const utms = await utmService.getAllUTMs();
      return res.status(200).json({ success: true, data: utms });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  }

  async getUTMById(req, res) {
    try {
      const utm = await utmService.getUTMById(req.params.id);
      if (!utm) {
        return res
          .status(404)
          .json({ success: false, message: "UTM not found" });
      }
      return res.status(200).json({ success: true, data: utm });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  }

  async updateUTM(req, res) {
    try {
      const utm = await utmService.updateUTM(req.params.id, req.body);
      if (!utm) {
        return res
          .status(404)
          .json({ success: false, message: "UTM not found" });
      }
      return res.status(200).json({ success: true, data: utm });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  }

  async deleteUTM(req, res) {
    try {
      const deletedCount = await utmService.deleteUTM(req.params.id);
      if (!deletedCount) {
        return res
          .status(404)
          .json({ success: false, message: "UTM not found" });
      }
      return res
        .status(200)
        .json({ success: true, message: "UTM deleted successfully" });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  }
}

module.exports = new UTMController();
