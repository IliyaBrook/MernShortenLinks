const {Router} = require('express')
const User = require('../models/User')
const router = Router()
const bcrypt = require('bcryptjs')
const {body} = require('express-validator');
const jwt = require('jsonwebtoken')
const config = require('config')
const user = require("mongodb/lib/collection");
const {check, validationResult} = require('express-validator')


router.post(
    '/register',
    body('email', 'Incorrect email address').isEmail(),
    body('password', 'Minimum length password 6 character').isLength({min: 6})
    ,
    async (req, res) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                let errorsMsg = []
                errors.errors.forEach((elem) => errorsMsg = [elem.msg])
                return res.status(400).json({
                    errors: errors.array(),
                    message: [...errorsMsg]
                })
            }

            const {email, password} = req.body

            const candidate = await User.findOne({email})

            if (candidate) {
                return res.status(400).json({message: 'user already exist'})
            }

            const hashedPassword = await bcrypt.hash(password, 12)

            const user = new User({email, password: hashedPassword})
            await user.save()

            res.status(201).json({message: "user has been created"})
        } catch (e) {
            res.status(500).json({message: 'Something went wrong, Please try again'})
        }
    })

//api/auth/login
router.post(
    '/login',
    body('email', 'Enter correct email address').normalizeEmail().isEmail(),
    body('password', 'Enter password').exists()
    ,
    async (req, res) => {
        try {
            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: "incorrect data during login...."
                })
            }

            const {email, password} = req.body
            const user = await User.findOne({ email })
            if (!user) {
                return res.status(400).json({ message: 'User not found'})
            }
            const isMatch = await  bcrypt.compare(password, user.password)
            if (!isMatch) {
                return res.status(400).json({ message: 'Password incorrect please try again'})
            }

            const token = jwt.sign(
                { userId: user.id },
                config.get('jwtSecret'),
                {expiresIn: '1h'}
            )
            res.json({ token, userId: user.id})

        } catch (e) {
            res.status(500).json({message: 'Something went wrong, Please try again'})
        }
    })

module.exports = router