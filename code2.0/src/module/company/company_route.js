const express = require("express");
const validate = require("../../middlewares/validate");
const companyValidation = require("./company_validation");
const companyController = require("./company_controller");
const auth = require("../../middlewares/auth");
const router = express.Router();

router.post(
  "/addCompany",
  auth(),
  validate(companyValidation.createCompany),
  companyController.createCompany
);

router.put(
  "/updateCompany",
  auth(),
  validate(companyValidation.updateCompany),
  companyController.updateCompany
);

router.post(
  "/listCompany",
  auth(),
  validate(companyValidation.listCompany),
  companyController.listCompany
);

router
  .route("/:Code")
  .get(
    auth(),
    validate(companyValidation.listCompanyByCode),
    companyController.listCompanyByCode
  )
  .delete(
    auth(),
    validate(companyValidation.deleteCompany),
    companyController.deleteCompany
  );

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Company
 *   description: Company management
 */

/**
 * @swagger
 * /Company/addCompany:
 *   post:
 *     summary: Create a Company
 *     description: Only admins can create a company.
 *     tags: [Company]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - Code
 *               - Name
 *               - Address
 *               - City
 *               - State
 *               - Country
 *               - PinCode
 *               - LicenseNo
 *               - CompanyType
 *             properties:
 *               Code:
 *                 type: string
 *               Name:
 *                 type: string
 *               Address:
 *                 type: string
 *               City:
 *                 type: string
 *               State:
 *                 type: string
 *               Country:
 *                 type: string
 *               PinCode:
 *                 type: string
 *               LicenseNo:
 *                 type: string
 *               CompanyType:
 *                 type: number
 *             example:
 *               Code: "3333"
 *               Name: "Mankind Limited"
 *               Address: "A-36 ground Floor Sector 4 Noida"
 *               City: "Paonta"
 *               State: "Himachal"
 *               Country: "India"
 *               PinCode: "342131"
 *               LicenseNo: "2542345224"
 *               CompanyType: 4566
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Company'
 */

/**
 * @swagger
 * /Company/updateCompany:
 *   put:
 *     summary: Update a Company
 *     description: Only admins can update a company.
 *     tags: [Company]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - Code
 *               - Name
 *               - Address
 *               - City
 *               - State
 *               - Country
 *               - PinCode
 *               - LicenseNo
 *               - CompanyType
 *             properties:
 *               Code:
 *                 type: string
 *               Name:
 *                 type: string
 *               Address:
 *                 type: string
 *               City:
 *                 type: string
 *               State:
 *                 type: string
 *               Country:
 *                 type: string
 *               PinCode:
 *                 type: string
 *               LicenseNo:
 *                 type: string
 *               CompanyType:
 *                 type: number
 *             example:
 *               Code: "222"
 *               Name: "Control Print Limited"
 *               Address: "A-36 ground Floor Sector 4 Noida"
 *               City: "GAUTAM BUDDHA NAGAR"
 *               State: "UTTAR PRADESH"
 *               Country: "India"
 *               PinCode: "201333"
 *               LicenseNo: "5432554"
 *               CompanyType: 444
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Company'
 *       "400":
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Invalid request body"
 *       "404":
 *         description: Not Found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Company not found"
 */

/**
 * @swagger
 * /Company/listCompany:
 *   post:
 *     summary: List Companies
 *     description: List companies with pagination and sorting.
 *     tags: [Company]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               sortBy:
 *                 type: string
 *                 description: Field to sort by
 *               limit:
 *                 type: integer
 *                 description: Maximum number of results per page
 *               page:
 *                 type: integer
 *                 description: Page number
 *             example:
 *               sortBy: "createdAt"
 *               limit: 5
 *               page: 1
 *     responses:
 *       "200":
 *         description: A list of companies
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: "Companies Details"
 *                 data:
 *                   type: object
 *                   properties:
 *                     docs:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Company'
 *                     totalDocs:
 *                       type: integer
 *                       example: 100
 *                     limit:
 *                       type: integer
 *                       example: 10
 *                     totalPages:
 *                       type: integer
 *                       example: 10
 *                     page:
 *                       type: integer
 *                       example: 1
 *                     pagingCounter:
 *                       type: integer
 *                       example: 1
 *                     hasPrevPage:
 *                       type: boolean
 *                       example: false
 *                     hasNextPage:
 *                       type: boolean
 *                       example: true
 *                     prevPage:
 *                       type: integer
 *                       nullable: true
 *                       example: null
 *                     nextPage:
 *                       type: integer
 *                       example: 2
 *       "400":
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Invalid request body"
 */

/**
 * @swagger
 * /Company/{Code}:
 *   get:
 *     summary: Get a company by code
 *     description: Only admins can retrieve a company by its code.
 *     tags: [Company]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: Code
 *         required: true
 *         schema:
 *           type: string
 *         description: Company code
 *     responses:
 *       "200":
 *         description: A company object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Company'
 *       "404":
 *         description: Company not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Company not found"
 *       "400":
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Invalid request"
 */

/**
 * @swagger
 * /Company/{Code}:
 *   delete:
 *     summary: Delete a company by code
 *     description: Only admins can delete a company by its code.
 *     tags: [Company]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: Code
 *         required: true
 *         schema:
 *           type: string
 *         description: Company code
 *     responses:
 *       "200":
 *         description: Company deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Company deleted successfully"
 *       "404":
 *         description: Company not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Company not found"
 *       "400":
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Invalid request"
 */
