import { Inscription, Event, User } from '../models/index.js';
import { Op } from 'sequelize';

class InscriptionRepository {
  async findById(id) {
    return Inscription.findByPk(id, {
      include: [
        { model: Event, as: 'event' },
        { model: User, as: 'user', attributes: ['id', 'full_name', 'email'] },
      ],
    });
  }

  async findByUserAndEvent(userId, eventId) {
    return Inscription.findOne({
      where: { user_id: userId, event_id: eventId },
    });
  }

  async create(data) {
    return Inscription.create({
      user_id: data.userId,
      event_id: data.eventId,
      status: data.status || 'CONFIRMED',
      notes: data.notes,
    });
  }

  async update(id, updates) {
    const inscription = await Inscription.findByPk(id);
    if (!inscription) return null;
    await inscription.update(updates);
    return inscription;
  }

  async findByEvent(eventId, options = {}) {
    const page = parseInt(options.page, 10) || 1;
    const limit = parseInt(options.limit, 10) || 20;

    const { count, rows } = await Inscription.findAndCountAll({
      where: { event_id: eventId },
      order: [['created_at', 'DESC']],
      limit,
      offset: (page - 1) * limit,
      include: [
        { model: User, as: 'user', attributes: ['id', 'full_name', 'email', 'avatar_url'] },
      ],
    });

    return {
      inscriptions: rows,
      total: count,
      page,
      limit,
      totalPages: Math.ceil(count / limit),
    };
  }
}

export default new InscriptionRepository();
