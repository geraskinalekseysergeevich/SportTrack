const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Проверка, существует ли пользователь с таким email
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res
                .status(400)
                .json({ error: 'Пользователь с таким email уже существует' });
        }

        // Хеширование пароля
        const hashedPassword = await bcrypt.hash(password, 10);
        const userInformation = { height: 0, weight: 0, age: 0, info: '' };
        // Создание нового пользователя
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            information: userInformation,
        });

        // Сохранение пользователя в базе данных
        await newUser.save();

        res.status(201).json({
            message: 'Пользователь успешно зарегистрирован',
        });
    } catch (error) {
        console.error('Ошибка при регистрации пользователя:', error);
        res.status(500).json({ error: 'Внутренняя ошибка сервера' });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Поиск пользователя по email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: 'Неверные учетные данные' });
        }

        // Проверка пароля
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Неверные учетные данные' });
        }

        // Создание и отправка токена JWT
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });

        res.status(200).json({ token, userId: user._id });
    } catch (error) {
        console.error('Ошибка при входе пользователя:', error);
        res.status(500).json({ error: 'Внутренняя ошибка сервера' });
    }
};

const saveUserExercises = async (req, res) => {
    try {
        const { userId, insert } = req.body;
        // Поиск пользователя по ID
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'Пользователь не найден' });
        }
        console.log(req.body.exercises);
        // Обновление данных пользователя
        user.exercises.push(req.body.exercises);

        // Сохранение обновленных данных
        await user.save();

        res.status(200).json({
            message: 'Данные пользователя успешно сохранены',
        });
    } catch (error) {
        console.error('Ошибка при сохранении данных пользователя:', error);
        res.status(500).json({ error: 'Внутренняя ошибка сервера' });
    }
};

const saveUserCallorie = async (req, res) => {
    try {
        const { userId, insert } = req.body;
        // Поиск пользователя по ID
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'Пользователь не найден' });
        }
        console.log(req.body.items);
        // Обновление данных пользователя
        user.items.push(req.body.items);

        // Сохранение обновленных данных
        await user.save();

        res.status(200).json({
            message: 'Данные пользователя успешно сохранены',
        });
    } catch (error) {
        console.error('Ошибка при сохранении данных пользователя:', error);
        res.status(500).json({ error: 'Внутренняя ошибка сервера' });
    }
};

const getUserData = async (req, res) => {
    try {
        const userId = req.query.userId;
        console.log(userId);
        const userData = await User.findById(userId)
            .populate('items')
            .populate('exercises');

        res.json(userData);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const putUserData = async (req, res) => {
    try {
        const userId = req.body.userId;
        const newUserInfo = req.body.newUserInfo;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'Пользователь не найден' });
        }

        user.information = newUserInfo;
        const updatedUser = await user.save();

        console.log('Данные успешно обновлены:', updatedUser);
        res.json({ message: 'Данные успешно обновлены' });
        console.log(req.body.newUserInfo);
        console.log(req.body.information);
    } catch (error) {
        console.error('Ошибка при обновлении данных:', error);
        res.status(500).json({ error: 'Ошибка при обновлении данных' });
    }
};

const saveUserPreset = async (req, res) => {
    try {
        const { userId, insert } = req.body;
        // Поиск пользователя по ID
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'Пользователь не найден' });
        }
        console.log(req.body.exercises);
        // Обновление данных пользователя
        user.presets.push(req.body.exercises);

        // Сохранение обновленных данных
        await user.save();

        res.status(200).json({
            message: 'Данные пользователя успешно сохранены',
        });
    } catch (error) {
        console.error('Ошибка при сохранении данных пользователя:', error);
        res.status(500).json({ error: 'Внутренняя ошибка сервера' });
    }
};

module.exports = {
    registerUser,
    loginUser,
    saveUserCallorie,
    saveUserExercises,
    saveUserPreset,
    getUserData,
    putUserData,
};
