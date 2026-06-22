import { Router } from "express";

import templateController from "../controllers/template.controller";

const router = Router();

/**
 * @swagger
 * /api/v1/templates:
 *   post:
 *     summary: Create template
 *     tags:
 *       - Templates
 *     requestBody:
 *       required: true
 *     responses:
 *       201:
 *         description: Template created
 */
router.post("/", templateController.create);

/**
 * @swagger
 * /api/v1/templates:
 *   get:
 *     summary: Get all templates
 *     tags:
 *       - Templates
 *     responses:
 *       200:
 *         description: Success
 */
router.get("/", templateController.getAll);

export default router;