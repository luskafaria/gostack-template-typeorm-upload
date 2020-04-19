import { getRepository } from 'typeorm';
import Category from '../models/Category';

interface Request {
  category_title: string;
}

export default class CategoryService {
  public async execute({ category_title }: Request): Promise<Category> {
    const categoryRepository = getRepository(Category);

    const checkCategoryExists = await categoryRepository.findOne({
      where: {
        title: category_title,
      },
    });

    if (!checkCategoryExists) {
      const categoryCreate = categoryRepository.create({
        title: category_title,
      });

      await categoryRepository.save(categoryCreate);

      return categoryCreate;
    }

    return checkCategoryExists;
  }
}
