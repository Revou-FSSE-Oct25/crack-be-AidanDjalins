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
Object.defineProperty(exports, "__esModule", { value: true });
exports.InquiriesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const inquiries_service_1 = require("./inquiries.service");
const create_inquiry_dto_1 = require("./dto/create-inquiry.dto");
const update_inquiry_dto_1 = require("./dto/update-inquiry.dto");
const jwt_auth_guard_1 = require("../common/guards/jwt-auth.guard");
const optional_jwt_auth_guard_1 = require("../common/guards/optional-jwt-auth.guard");
let InquiriesController = class InquiriesController {
    inquiriesService;
    constructor(inquiriesService) {
        this.inquiriesService = inquiriesService;
    }
    async create(createInquiryDto, req) {
        const userId = req.user?.id;
        return this.inquiriesService.create(createInquiryDto, userId);
    }
    async findMyInquiries(req) {
        return this.inquiriesService.findByUser(req.user.id);
    }
    async update(id, updateInquiryDto, req) {
        return this.inquiriesService.update(id, updateInquiryDto, req.user.id, req.user.role);
    }
    async remove(id, req) {
        return this.inquiriesService.remove(id, req.user.id, req.user.role);
    }
};
exports.InquiriesController = InquiriesController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(optional_jwt_auth_guard_1.OptionalJwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create an inquiry (public, optionally authenticated)' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Inquiry created successfully' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_inquiry_dto_1.CreateInquiryDto, Object]),
    __metadata("design:returntype", Promise)
], InquiriesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('me'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all inquiries for the logged-in user' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of user inquiries returned' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], InquiriesController.prototype, "findMyInquiries", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Update an inquiry (owner or admin)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Inquiry updated' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Inquiry not found' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_inquiry_dto_1.UpdateInquiryDto, Object]),
    __metadata("design:returntype", Promise)
], InquiriesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Delete an inquiry (owner or admin)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Inquiry deleted' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Inquiry not found' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], InquiriesController.prototype, "remove", null);
exports.InquiriesController = InquiriesController = __decorate([
    (0, swagger_1.ApiTags)('Inquiries'),
    (0, common_1.Controller)('inquiries'),
    __metadata("design:paramtypes", [inquiries_service_1.InquiriesService])
], InquiriesController);
//# sourceMappingURL=inquiries.controller.js.map