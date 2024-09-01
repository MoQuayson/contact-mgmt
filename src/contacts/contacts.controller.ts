import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  InternalServerErrorException,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ContactsService } from './contacts.service';
import {
  ContactDto,
  CreateContactRequest,
  UpdateContactRequest,
} from './contacts.dto';
import { ApiResponse } from '../dtos/api_response.dto';
import { AuthGuard } from '../auth/auth.guard';
import { FormatValidationErrors } from '../utils/formatters.utils';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { LoginRequest } from '../auth/auth.dto';

@Controller('api/contacts')
@UseGuards(AuthGuard)
export class ContactsController {
  constructor(private contactService: ContactsService) {}

  @Get()
  async getAllContacts(): Promise<ApiResponse> {
    const contacts = await this.contactService.findAll();

    return new ApiResponse({
      code: 200,
      message: 'contact(s) retrieved successfully',
      data: contacts,
    });
  }

  @Get(':id')
  async getContactById(@Param() id: string): Promise<ApiResponse> {
    const contact = await this.contactService.findById(id);
    return new ApiResponse({
      code: 200,
      message: 'contact(s) retrieved successfully',
      data: contact,
    });
  }

  @Post()
  async addNewContact(
    @Body() request: CreateContactRequest,
  ): Promise<ApiResponse> {
    const errs = FormatValidationErrors(
      await validate(plainToInstance(CreateContactRequest, request)),
    );

    if (errs.length != 0) {
      throw new BadRequestException('validation error(s)', {
        cause: JSON.stringify(errs),
      });
    }

    const contact = await this.contactService.addNewContact(request);
    return new ApiResponse({
      code: 201,
      message: 'contacts created successfully',
      data: contact,
    });
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async updateContact(
    @Param('id') id: string,
    @Body() request: UpdateContactRequest,
  ): Promise<ApiResponse> {
    const errs = FormatValidationErrors(
      await validate(plainToInstance(UpdateContactRequest, request)),
    );

    if (errs.length != 0) {
      throw new BadRequestException('validation error(s)', {
        cause: JSON.stringify(errs),
      });
    }

    const contact = await this.contactService.updateById(id, request);

    return new ApiResponse({
      code: 200,
      message: 'contacts updated successfully',
      data: contact,
    });
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async deleteContact(@Param('id') id: string): Promise<any> {
    const res = await this.contactService.deleteContact(id);
    return res
      ? new ApiResponse({ code: 200, message: 'contact deleted successfully' })
      : new InternalServerErrorException();
  }
}
