import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UserEntity } from '../entities/user.entity';
import { CreateUserInput } from '../dto/create-user.input';
import { UpdateUserInput } from '../dto/update-user.input';
import { UsersService } from '../services/users.service';
import { UserResponse } from '../dto/get-user.response';

@Resolver('User')
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => UserEntity)
  async createUser(
    @Args('createUser') createUserInput: CreateUserInput,
  ): Promise<UserEntity> {
    return await this.usersService.createUser(createUserInput);
  }

  @Mutation(() => UserResponse)
  @UseGuards(JwtAuthGuard)
  async updateUser(
    @Args('updateUser') updateUserInput: UpdateUserInput,
  ): Promise<UserResponse> {
    return await this.usersService.updateUser(updateUserInput);
  }
  @Mutation(() => Number)
  @UseGuards(JwtAuthGuard)
  async removeUser(@Args('id') id: number): Promise<number> {
    return await this.usersService.removeUser(id);
  }

  @Query(() => UserResponse)
  @UseGuards(JwtAuthGuard)
  async getOneUser(@Args('id') id: number): Promise<UserResponse> {
    return await this.usersService.getOneUser(id);
  }
  @Query(() => [UserResponse])
  @UseGuards(JwtAuthGuard)
  async getAllUsers(): Promise<UserResponse[]> {
    return await this.usersService.getAllUsers();
  }
}
