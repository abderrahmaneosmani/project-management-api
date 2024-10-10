import * as bcrypt from 'bcrypt';

export const cryptPassword = async (password: string) => {
  return await bcrypt.hash(password, 10);
};

export const verifyPassword = async (password: string, hash: string) =>
  await bcrypt.compare(password, hash);
