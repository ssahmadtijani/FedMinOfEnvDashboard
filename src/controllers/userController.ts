import { Users, UserRoles, Roles, DepartmentHeads } from '../models'
import { Request, Response } from 'express'

export const getPendingUsers = async (req: Request, res: Response): Promise<void> => {
    try {
        const { userId } = req.query as Record<string, string>
        const approver = await Users.findByPk(
                userId,
            { 
                include: [{ 
                    model: UserRoles,
                    foreignKey: 'userId',
                        include: [{
                            model: Roles,
                            foreignKey: 'roleId'
                    }] 
                }] 
            }
        )

        if (!approver) {
            res.status(404).json({ message: 'Approver not found' })
            return
        }

        const isAdmin = approver?.UserRoles?.some((userRole: any) => userRole.Role.roleName === 'admin')

        if (isAdmin) {
            const pendingUsers = await Users.findAll({
                where: { 
                    isVerified: false 
                },
                include: [
                    { 
                        model: UserRoles, 
                        include: [
                            { 
                                model: Roles,
                                foreignKey: 'userId', 
                                where: { name: 'DEPARTMENTHEAD' } 
                            }
                        ] 
                    }
                ],
            });
            res.json(pendingUsers)
            return 
        }

        const deptHead = await DepartmentHeads.findOne({ 
            where: { 
                userId 
            } 
        })

        if (!deptHead) {
            res.status(403).json({ message: 'Only Admins or Department Heads can approve users' })
            return 
        }

        const pendingUsers = await Users.findAll({
            where: { 
                departmentId: deptHead.departmentId, 
                isVerified: false 
            },
            include: [{ 
                model: UserRoles, 
                foreignKey: 'userId',
                include: [{
                    model: Roles,
                    foreignKey: 'userId',
                }] 
            }],
        })

        res.json(pendingUsers)
    } catch (error) {
        res.status(500).json({ message: 'Error fetching pending users', error })
    }
};
