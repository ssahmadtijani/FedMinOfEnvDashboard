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

    console.log(UserRoles.associations)

    const userRole = await UserRoles.findOne({
      where: { userId: user.userId },
      include: [
        {
          model: Roles,
          as: 'role',
          attributes: ["roleName"],
        },
      ],
    })

    if (!userRole || !userRole.role) {
      throw "User does not have a role yet"
    }

    if (userRole.role.roleName  !== role) {
     throw "Forbidden: Access denied"
    }

    next()
    } catch (error) {
      next(error)
    }
  }
}
