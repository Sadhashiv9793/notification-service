import { Router } from "express";

import templateController from "../controllers/template.controller";

const router = Router();

/**
 * Create Template
 */
router.post(
  "/",
  templateController.create
);

/**
 * Get Templates
 */
router.get(
  "/",
  templateController.getAll
);

export default router;