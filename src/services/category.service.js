// const httpStatus = require('http-status');
// const { Category } = require('../models/category.model');
// const ApiError = require('../utils/ApiError');
// const { buildWhereCondition } = require('../utils/FilterSort');

// /**
//  * Fetch all categories
//  * @param {Object} filter
//  * @param {string} filter.name
//  * @returns {Promise<*>}
//  */
// const fetchAllCategories = async (filter) => {
//   return Category.findAll({
//     where: buildWhereCondition(filter),
//   });
// };

// /**
//  * Fetch a category by id
//  * @param {number} id
//  * @returns {Promise<*>}
//  */
// const fetchCategoryById = async (id) => {
//   return Category.findByPk(id);
// };

// /**
//  * Create category
//  * @param {Object} categoryBody
//  * @returns {Promise<*>}
//  */
// const createCategory = async (categoryBody) => {
//   // Check if the category already exists
//   if (await Category.isNameTaken(categoryBody.name)) {
//     throw new ApiError(httpStatus.BAD_REQUEST, 'Category already taken');
//   }

//   return Category.create(categoryBody);
// };

// /**
//  * Update category by id
//  * @param {number} categoryId
//  * @param {Object} updateBody
//  * @param {string} updateBody.name
//  * @param {number} updateBody.parentId
//  * @param {string} updateBody.url
//  * @returns {Promise<*>}
//  */
// const updateCategoryById = async (categoryId, updateBody) => {
//   const category = await fetchCategoryById(categoryId);
//   if (!category) {
//     throw new ApiError(httpStatus.NOT_FOUND, 'Category not found');
//   }

//   // Check if the category already exists
//   if (updateBody.name && (await Category.isNameTaken(updateBody.name, categoryId))) {
//     throw new ApiError(httpStatus.BAD_REQUEST, 'Category already taken');
//   }

//   // Check if the parent category exists
//   if (updateBody.parentId && !(await fetchCategoryById(updateBody.parentId))) {
//     throw new ApiError(httpStatus.BAD_REQUEST, 'Parent category not found');
//   }

//   Object.assign(category, updateBody);
//   await category.save();
//   return category;
// };

// /**
//  * Delete category by id
//  * @param {number} categoryId
//  * @returns {Promise<*>}
//  */
// const deleteCategoryById = async (categoryId) => {
//   const category = await fetchCategoryById(categoryId);
//   if (!category) {
//     throw new ApiError(httpStatus.NOT_FOUND, 'Category not found');
//   }
//   await category.destroy();
//   return category;
// };

// module.exports = {
//   fetchAllCategories,
//   fetchCategoryById,
//   createCategory,
//   updateCategoryById,
//   deleteCategoryById,
// };
