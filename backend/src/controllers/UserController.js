import UserService from '../services/UserService.js';

class UserController {
  async getProfile(req, res, next) {
    try {
      const profile = await UserService.getProfile(req.userId);
      res.json({ user: profile });
    } catch (error) {
      next(error);
    }
  }

  async updateProfile(req, res, next) {
    try {
      const updated = await UserService.updateProfile(req.userId, req.body);
      res.json({ user: updated });
    } catch (error) {
      next(error);
    }
  }

  async changePassword(req, res, next) {
    try {
      const { currentPassword, newPassword } = req.body;
      const result = await UserService.changePassword(req.userId, currentPassword, newPassword);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }

  async getInscriptions(req, res, next) {
    try {
      const options = {
        page: req.query.page,
        limit: req.query.limit,
      };
      const result = await UserService.getInscriptions(req.userId, options);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }
}

export default new UserController();
