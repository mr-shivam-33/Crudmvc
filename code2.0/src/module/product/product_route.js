const express = require("express");
const validate = require("../../middlewares/validate");
const productValidation = require("./product_validation");
const productController = require("./product_controller");
const auth = require("../../middlewares/auth");
const multer = require("multer");

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/products");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 10);
    cb(null, file.fieldname + "-" + uniqueSuffix + ".png");
  },
});

const upload = multer({ storage: storage });
const cpUpload = upload.fields([{ name: "Image", maxCount: 1 }]);

router
  .route("/")
  .get(validate(productValidation.listProducts), productController.listProducts)
  .post(
    cpUpload,
    validate(productValidation.addProduct),
    productController.addProduct
  );

router.post(
  "/listProducts",
  validate(productValidation.listProducts),
  productController.listProducts
);

router
  .route("/:productCode")
  .get(validate(productValidation.getProduct), productController.getProduct)
  .put(
    cpUpload,
    validate(productValidation.updateProduct),
    productController.updateProduct
  );

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Product
 *   description: Product
 */

/**
 * @swagger
 * /product:
 *   post:
 *     summary: Create a product
 *     description: Only admins can create product.
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - ProductCode
 *               - ProductName
 *               - GenericName
 *               - BrandName
 *             properties:
 *               ProductCode:
 *                 type: string
 *               ProductName:
 *                 type: string
 *               GenericName:
 *                 type: string
 *               BrandName:
 *                 type: string
 *               Description:
 *                 type: string
 *               GTIN:
 *                 type: string
 *               UOM:
 *                 type: string
 *               Image:
 *                 type: string
 *               PackSize:
 *                 type: string
 *               Active:
 *                 type: Boolean,
 *             example:
 *               ProductName: ProductName value
 *               GenericName: GenericName value
 *               BrandName: BrandName value
 *               Description: Description value
 *               GTIN: GTIN value
 *               UOM: UOM value
 *               Image: Image value
 *               PackSize: PackSize value
 *               PackSize: PackSize value
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Product'
 */
