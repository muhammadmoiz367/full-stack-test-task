"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var AuthService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const mongoose_1 = require("@nestjs/mongoose");
const bcrypt = require("bcrypt");
const mongoose_2 = require("mongoose");
const user_schema_1 = require("./user.schema");
let AuthService = AuthService_1 = class AuthService {
    constructor(userModel, jwtService) {
        this.userModel = userModel;
        this.jwtService = jwtService;
        this.logger = new common_1.Logger(AuthService_1.name);
    }
    async signUp(signUpDto) {
        const { email, name, password } = signUpDto;
        if (!name || !email || !password) {
            throw new common_1.HttpException({ success: false, message: 'All fields are required' }, common_1.HttpStatus.BAD_REQUEST);
        }
        const existingUser = await this.userModel.findOne({ email });
        if (existingUser) {
            this.logger.warn(`Attempt to sign up with existing email: ${email}`);
            throw new common_1.HttpException({ success: false, message: 'Email already exists' }, common_1.HttpStatus.CONFLICT);
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new this.userModel({
            email,
            name,
            password: hashedPassword,
        });
        try {
            const savedUser = await newUser.save();
            this.logger.log(`New user signed up: ${email}`);
            const userCreated = savedUser.toObject();
            delete userCreated.password;
            const payload = { email: userCreated.email, sub: userCreated._id };
            const token = this.jwtService.sign(payload);
            return {
                success: true,
                message: 'User signed up successfully',
                data: { user: userCreated, token },
            };
        }
        catch (error) {
            this.logger.error('Sign-up failed', error.stack);
            throw new common_1.HttpException({ success: false, message: 'Server error' }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async logIn(email, password) {
        const user = await this.userModel.findOne({ email });
        if (!user) {
            this.logger.warn(`Login attempt with invalid email: ${email}`);
            throw new common_1.HttpException({ success: false, message: 'Invalid email or password' }, common_1.HttpStatus.UNAUTHORIZED);
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            this.logger.warn(`Invalid password attempt for email: ${email}`);
            throw new common_1.HttpException({ success: false, message: 'Invalid email or password' }, common_1.HttpStatus.UNAUTHORIZED);
        }
        const payload = { email: user.email, sub: user._id };
        const token = this.jwtService.sign(payload);
        const userData = user.toObject();
        delete userData.password;
        this.logger.log(`User logged in: ${email}`);
        return {
            success: true,
            message: 'Login successful',
            data: { user: userData, token },
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = AuthService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map