import { Departments } from "../models/departments.model"
import { Request, Response } from "express";


export const addDepartment = async (req: Request, res: Response): Promise<void>  => {
    try {
      const { departmentName, departmentShortName } = req.body

      if (!departmentName) {
        throw "Department name is required"
      }

      const existingDepartment = await Departments.findOne({ where: { departmentName } })
      if (existingDepartment) {
        throw "Department already exists" 
      }

      const department = await Departments.create({ departmentName, departmentShortName })
     res.status(201).json({ message: "Department created", department })
     return
    } catch (error) {
      throw `Error occurred while creating department: ${error}`
    }
}

