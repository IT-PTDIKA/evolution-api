import { configService, Database } from '@config/env.config';

/**
 * Returns the correct JSON path filter argument for Prisma based on the database provider.
 * MySQL expects string path (e.g. '$.key') while PostgreSQL/others expect array path (e.g. ['key']).
 *
 * @param field The field name inside the JSON object (e.g. 'id', 'fromMe')
 * @returns A string for MySQL or a string array for other database providers (like PostgreSQL).
 */
export function jsonPath(field: string): any {
  const provider = configService.get<Database>('DATABASE').PROVIDER || 'postgresql';
  return provider === 'mysql' ? `$.${field}` : [field];
}
