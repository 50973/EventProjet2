   import { Event, User, Inscription } from '../models/index.js';
import { Op } from 'sequelize';

class EventRepository {
  /**
   * Trouver un événement par ID avec l'organisateur
   * @param {string} id - UUID de l'événement
   * @returns {Promise<Event|null>}
   */
  async findById(id) {
    return Event.findByPk(id, {
      include: [
        {
          model: User,
          as: 'organizer',
          attributes: ['id', 'full_name', 'email', 'avatar_url'],
        },
      ],
    });
  }

  /**
   * Créer un événement
   * @param {Object} eventData - Données de l'événement
   * @returns {Promise<Event>}
   */
  async create(eventData) {
    return Event.create({
      organizer_id: eventData.organizerId,
      title: eventData.title,
      description: eventData.description,
      location: eventData.location,
      start_datetime: eventData.startDatetime,
      end_datetime: eventData.endDatetime,
      capacity: eventData.capacity || 100,
      price: eventData.price || 0,
      currency: eventData.currency || 'EUR',
      status: eventData.status || 'DRAFT',
      image_url: eventData.imageUrl,
      tags: eventData.tags || [],
    });
  }

  /**
   * Mettre à jour un événement
   * @param {string} id - ID de l'événement
   * @param {Object} updates - Données à mettre à jour
   * @returns {Promise<Event|null>}
   */
  async update(id, updates) {
    const event = await Event.findByPk(id);
    if (!event) return null;
    await event.update(updates);
    return event;
  }

  /**
   * Supprimer un événement
   * @param {string} id - ID de l'événement
   * @returns {Promise<boolean>}
   */
  async delete(id) {
    const event = await Event.findByPk(id);
    if (!event) return false;
    await event.destroy();
    return true;
  }

  /**
   * Lister les événements avec filtres et pagination
   * @param {Object} options - Options de requête
   * @returns {Promise<Object>}
   */
  async findAll(options = {}) {
    const {
      page = 1,
      limit = 20,
      status,
      search,
      location,
      minPrice,
      maxPrice,
      startDate,
      endDate,
      organizerId,
      categoryId,
      sortBy = 'start_datetime',
      sortOrder = 'asc',
      includeUnpublished = false,
    } = options;

    const where = {};

    // Filtrer par statut
    if (status) {
      where.status = status;
    } else if (!includeUnpublished) {
      where.status = 'PUBLISHED';
    }

    // Filtrer par organisateur
    if (organizerId) {
      where.organizer_id = organizerId;
    }

    // Filtrer par catégorie
    if (categoryId) {
      where.category_id = categoryId;
    }

    // Recherche textuelle
    if (search) {
      where[Op.or] = [
        { title: { [Op.like]: `%${search}%` } },
        { description: { [Op.like]: `%${search}%` } },
        { location: { [Op.like]: `%${search}%` } },
      ];
    }

    // Filtrer par localisation
    if (location) {
      where.location = { [Op.like]: `%${location}%` };
    }

    // Filtrer par prix
    if (minPrice !== undefined) {
      where.price = { ...where.price, [Op.gte]: minPrice };
    }
    if (maxPrice !== undefined) {
      where.price = { ...where.price, [Op.lte]: maxPrice };
    }

    // Filtrer par date
    if (startDate) {
      where.start_datetime = { ...where.start_datetime, [Op.gte]: new Date(startDate) };
    }
    if (endDate) {
      where.start_datetime = { ...where.start_datetime, [Op.lte]: new Date(endDate) };
    }

    const { count, rows } = await Event.findAndCountAll({
      where,
      order: [[sortBy, sortOrder.toUpperCase()]],
      limit: Math.min(limit, 100), // Maximum 100 résultats
      offset: (page - 1) * limit,
      include: [
        {
          model: User,
          as: 'organizer',
          attributes: ['id', 'full_name', 'avatar_url'],
        },
        {
          model: Category,
          as: 'category',
          attributes: ['id', 'name'],
        },

      ],
    });

    return {
      events: rows,
      total: count,
      page,
      limit,
      totalPages: Math.ceil(count / limit),
    };
  }

  /**
   * Incrémenter le nombre de participants
   * @param {string} id - ID de l'événement
   * @returns {Promise<Event|null>}
   */
  async incrementParticipants(id) {
    const event = await Event.findByPk(id);
    if (!event) return null;
    await event.increment('current_participants');
    await event.reload();
    return event;
  }

  /**
   * Décrémenter le nombre de participants
   * @param {string} id - ID de l'événement
   * @returns {Promise<Event|null>}
   */
  async decrementParticipants(id) {
    const event = await Event.findByPk(id);
    if (!event || event.current_participants <= 0) return null;
    await event.decrement('current_participants');
    await event.reload();
    return event;
  }
}

export default new EventRepository();