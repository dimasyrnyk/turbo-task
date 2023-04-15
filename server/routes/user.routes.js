const { Router } = require("express");
const { check } = require("express-validator");
const authMiddleware = require("../middlewares/auth.middleware");
const userController = require("../controllers/user.controller");
const router = Router();

router.post(
  "/registration",
  [
    check("login", "Login must have more than 4 characters")
      .not()
      .isEmpty()
      .isLength({ min: 4, max: 20 }),
    check("email", "Your email is not valid").not().isEmpty(),
    check("password", "Your password must be at least 6 characters")
      .not()
      .isEmpty()
      .isLength({ min: 6, max: 32 }),
  ],
  userController.registration
);

router.post(
  "/login",
  [
    check("email", "Please, enter correct email").isEmail(),
    check("password", "Please, enter correct password").exists(),
  ],
  userController.login
);

router.post("/logout", userController.logout);

router.get("/refresh", userController.refresh);

router.get("/:id", authMiddleware, userController.getOneUser);

router.get(
  "/filter/:value",
  authMiddleware,
  userController.getFilteredUsersByEmail
);

module.exports = router;
