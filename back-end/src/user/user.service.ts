import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserRole } from './Entities/user.entity';
import { CreateUserDto } from './dto/Create-User.dto';
import { UpdateUserDto } from './dto/Update-User.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    // Injection du repository pour interagir avec la table users
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }

  // Création d'un nouvel utilisateur (Admin, Parent ou Chauffeur)
  async create(createUserDto: CreateUserDto): Promise<User> {
    // Vérification : l'email doit être unique
    const existingUser = await this.userRepository.findOne({
      where: { email: createUserDto.email },
    });

    if (existingUser) {
      throw new ConflictException('Email already in use');
    }

    // Sécurisation du mot de passe avec Bcrypt
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(createUserDto.password, salt);

    // Création de l'objet utilisateur
    const user = this.userRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });

    // Sauvegarde 
    return this.userRepository.save(user);
  }

  // Récupère l'ensemble des utilisateurs
  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  // Récupère uniquement les comptes Parents
  async findAllParents(): Promise<User[]> {
    return this.userRepository.find({ where: { role: UserRole.PARENT } });
  }

  // Trouve un utilisateur par son ID unique
  async findOne(id: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  // Trouve un utilisateur par son email 
  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { email } });
  }

  // Met à jour les infos d'un utilisateur 
  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);

    // Si on change le mot de passe, on doit le re-hasher
    if (updateUserDto.password) {
      const salt = await bcrypt.genSalt(10);
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, salt);
    }

    Object.assign(user, updateUserDto); // copie superficielle des propriétés
    return this.userRepository.save(user);
  }

  // Supprime un utilisateur de la base
  async remove(id: string): Promise<void> {
    const user = await this.findOne(id);
    await this.userRepository.remove(user);
  }

  // Enregistre le token de notification Expo du téléphone de l'utilisateur
  async updatePushToken(userId: string, token: string): Promise<User> {
    const user = await this.findOne(userId);
    user.pushToken = token;
    // stockage du token pour pouvoir lui envoyer des notifs plus tard
    return this.userRepository.save(user);
  }
}
