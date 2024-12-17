// src/services/utmService.js

const { UtmModel } = require("../../models/UTM");

class UTMService {
  async createUTM(utmData) {
    try {
      // Create a new UTM entry
      const newUtm = await UtmModel.query().insert(utmData);
      return {
        success: true,
        message: "UTM successfully created.",
        data: newUtm,
      };
    } catch (error) {
      console.error("Error inserting UTM:", error);
      return {
        success: false,
        message: "Error creating UTM.",
        error: error.message,
      };
    }
    // return await UtmModel.query().insert(utmData);
  }

  async getAllUTMs() {
    return await UtmModel.query();
  }

  async getUTMById(id) {
    return await UtmModel.query().findById(id);
  }

  async updateUTM(id, utmData) {
    return await UtmModel.query().patchAndFetchById(id, utmData);
  }

  async deleteUTM(id) {
    return await UtmModel.query().deleteById(id);
  }
}

module.exports = new UTMService();
