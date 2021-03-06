// import AppError from '../errors/AppError';
import { getCustomRepository } from 'typeorm';
import TransactionsRepository from '../repositories/TransactionsRepository';

class DeleteTransactionService {
  public async execute(id: string): Promise<void> {
    const transactionsRepository = getCustomRepository(TransactionsRepository);

    const findTransaction = await transactionsRepository.findOne({
      where: { id },
    });

    if (!findTransaction) {
      throw new Error('Transaction not found');
    }

    await transactionsRepository.delete(findTransaction.id);
  }
}

export default DeleteTransactionService;
