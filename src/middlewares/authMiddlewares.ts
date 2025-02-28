import { Request, Response, NextFunction } from "express"
import { UsersAttr } from "../interface/users.interface"
import { UserRoles } from "../models/userRoles.model"
import { Roles } from "../models/roles.model"

export const hasAccess = (role: string) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const user = req.user as UsersAttr

    if (!user) {
      throw "Unauthorized access" 
    }

    const userRole = await UserRoles.findOne({
      where: { userId: user.userId },
      include: [
        {
          model: Roles,
          attributes: ["roleName"],
        }
      ],
    })

    if (!userRole || !userRole.Role) {
      throw new Error("User does not have a role yet")
    }

    if (userRole.Role.roleName  !== role) {
     throw new Error("Forbidden: Access denied")
    }

    next()
    } catch (error) {
      next(error)
    }
  }
}
