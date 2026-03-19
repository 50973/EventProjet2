/**
 * Middleware pour vérifier les rôles
 * Doit être utilisé APRÈS le middleware authenticate
 */

/**
 * Exiger un ou plusieurs rôles
 * @param {...string} allowedRoles - Rôles autorisés
 */
export function requireRole(...allowedRoles) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        error: 'Authentication required.',
        code: 'AUTH_REQUIRED',
      });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        error: 'Access denied. Insufficient permissions.',
        code: 'FORBIDDEN',
      });
    }

    next();
  };
}

/**
 * Exiger le rôle admin
 */
export function requireAdmin(req, res, next) {
  if (!req.user) {
    return res.status(401).json({
      error: 'Authentication required.',
      code: 'AUTH_REQUIRED',
    });
  }

  if (req.user.role !== 'ADMIN') {
    return res.status(403).json({
      error: 'Admin access required.',
      code: 'ADMIN_REQUIRED',
    });
  }

  next();
}

/**
 * Exiger le rôle organisateur ou admin
 */
export function requireOrganizer(req, res, next) {
  if (!req.user) {
    return res.status(401).json({
      error: 'Authentication required.',
      code: 'AUTH_REQUIRED',
    });
  }

  if (!['ORGANIZER', 'ADMIN'].includes(req.user.role)) {
    return res.status(403).json({
      error: 'Organizer access required.',
      code: 'ORGANIZER_REQUIRED',
    });
  }

  next();
}

export default {
  requireRole,
  requireAdmin,
  requireOrganizer,
};