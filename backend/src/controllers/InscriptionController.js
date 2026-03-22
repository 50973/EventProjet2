import InscriptionService from '../services/InscriptionService.js';

class InscriptionController {
  async register(req, res, next) {
    try {
      const inscription = await InscriptionService.registerForEvent(
        req.userId,
        req.params.eventId
      );
      res.status(201).json({ inscription });
    } catch (error) {
      next(error);
    }
  }

  async cancel(req, res, next) {
    try {
      const result = await InscriptionService.cancelInscription(
        req.params.id,
        req.userId
      );
      res.json(result);
    } catch (error) {
      next(error);
    }
  }
}

export default new InscriptionController();
