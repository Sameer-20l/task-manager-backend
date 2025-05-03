const User = require('../../models/User');
const Application = require('../../models/Application');
const Applicant = require('../../models/Applicant');
const {responsePayload}=require('../../utils/responseModel');
require("dotenv").config();
const { sequelize } = require('../../config/db'); 
const { raw } = require('express');

const cardData=async (req,res)=>{
    try {
        const userCount= await User.findAll({
            attributes: [
              'role',
              [sequelize.fn('COUNT', sequelize.col('role')), 'count']
            ],
            where: {
                is_active: true
              },
            group: ['role'],
            raw: true
          });
        const userTotalCount= await User.findOne({
            attributes: [
                [sequelize.literal('COUNT(*)'), 'count']
            ],
            where: {
                is_active: true
              },
              raw: true
          });
          const applicationCard = await Application.findOne({
            attributes: [
              [sequelize.literal('COUNT(*)'), 'count']
            ],
            where: {
              is_active: true
            },
            raw: true
          });
          const applicationStatus = await Applicant.findAll({
            attributes: [
              'is_approved',
              [sequelize.fn('COUNT', sequelize.col('is_approved')), 'count']
            ],
            group: ['is_approved'],
            raw:true 
          });
            
           const totalUser = userTotalCount.count;
           const admin = userCount.find(item => item.role === 'admin')?.count || 0;
           const recruiter = userCount.find(item => item.role === 'recruiter')?.count || 0;
           const student = userCount.find(item => item.role === 'student')?.count || 0;
           const pending = applicationStatus.find(item => !item.is_approved)?.count || 0;
           const approved = applicationStatus.find(item => item.is_approved)?.count || 0;
           const totalApplications = applicationCard.count;

           const response = {
            total_users: totalUser ? parseInt(totalUser) : 0,
            admin_count: parseInt(admin),
            recruiter_count: parseInt(recruiter),
            applicant_count: parseInt(student),
            total_application: totalApplications ? parseInt(totalApplications) : 0,
            pending_application : parseInt(pending),
            approved_application : parseInt(approved)
          };

          return res.status(200).json(responsePayload(true,200,"Card Count Fetched Successfully",response));
    } catch (error) {
       console.error("Post Application Error:", error.message);
                  if (!res.headersSent) {
                      return res.status(500).json(responsePayload(false, 500, error.message, null));
                  }  
    }
}
const tableData = async (req, res) => {
  const { page, category } = req.body;

  const validCategories = ['all', 'admin', 'student', 'recruiter'];

  if (isNaN(Number(page)) || page === '') {
    return res
      .status(400)
      .json(responsePayload(false, 400, "Invalid Page number", null));
  }

  if (!validCategories.includes(category)) {
    return res
      .status(400)
      .json(responsePayload(false, 400, "Invalid Role", null));
  }

  const page_number = Number(page);
  const offset_ = (page_number - 1) * 10;
  const where_condition = category === 'all' ? {} : { role: category };

  try {
    const limit = 10;

    const query_data = await User.findAll({
      attributes: ["name", "email", "role", "createdAt", "updatedAt", "is_active"],
      raw: true,
      limit: limit,
      order: [['serial_no']],
      where: where_condition,
      offset: offset_
    });

    if (query_data.length > 0) {
      const response = query_data.map((data) => ({
        name: !data.name || data.name === '' ? 'N/A' : data.name,
        email: !data.email || data.email === '' ? 'N/A' : data.email,
        role: !data.role || data.role === '' ? 'N/A' : data.role.charAt(0).toUpperCase() + data.role.slice(1),
        createdAt: !data.createdAt || data.createdAt === '' ? 'N/A' : data.createdAt,
        updatedAt: !data.updatedAt || data.updatedAt === '' ? 'N/A' : data.updatedAt,
        is_active: typeof data.is_active !== 'boolean' ? false : data.is_active
      }));

      return res
        .status(200)
        .json(responsePayload(true, 200, "Table Data Fetched Successfully", response));
    } else {
      return res
        .status(200)
        .json(responsePayload(true, 200, "No data Found", []));
    }

  } catch (error) {
    console.error("Post Application Error:", error.message);
    if (!res.headersSent) {
      return res
        .status(500)
        .json(responsePayload(false, 500, error.message, null));
    }
  }
};


module.exports={
    cardData,
    tableData
}