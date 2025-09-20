import express from 'express'
import { addItem } from '../controllers/item.controller.js';
import isAuthenticated from '../middlewares/isAuthenticated.js';
const router = express.Router();

router.route('/addItem').post(isAuthenticated, addItem)

export default router