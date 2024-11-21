import { z } from 'zod';

export const passwordSchema = z.string().min(8, '8자 이상 입력해 주세요.');
