import { DataSet } from '@boilerplate-frontend/types';

// TODO: Conversar sobre nomeamento dessas funções mapeadores,
// TODO: Conversar sobre adição de cores ao DataSet

/**
 * Mapeia um array de objetos para um array de valores de uma chave específica
 * @template T - Tipo do objeto de entrada
 * @template K - Chave a ser extraída (deve existir em T)
 * @param data - Array de objetos de entrada
 * @param key - Chave a ser extraída de cada objeto
 * @returns Array de valores extraídos com tipo preservado
 */
export const dataMapper = <T extends object, K extends keyof T>(data: T[], key: K): Array<T[K]> => {
  return data.map((item) => item[key]);
};

/**
 * Mapeia um array de objetos para um array de arrays com múltiplas chaves
 * @template T - Tipo do objeto de entrada
 * @template K - Tupla ou array de chaves a serem extraídas
 * @param data - Array de objetos de entrada
 * @param keys - Array de chaves a serem extraídas de cada objeto
 * @returns Array de tuplas contendo os valores extraídos na ordem das chaves
 */
export const dataMapperMulti = <T extends object, K extends (keyof T)[]>(
  data: T[],
  keys: K,
): Array<{ [I in keyof K]: T[Extract<K[I], keyof T>] }> => {
  return data.map((item) => {
    return keys.map((key) => item[key]) as any; // Type assertion necessário para tuplas dinâmicas
  });
};

/**
 * Mapeia um array de objetos para um array de objetos com apenas as chaves especificadas
 * @template T - Tipo do objeto de entrada
 * @template K - Chaves a serem mantidas
 * @param data - Array de objetos de entrada
 * @param keys - Array de chaves a serem mantidas em cada objeto
 * @returns Array de objetos contendo apenas as chaves especificadas
 */
export const dataMapperMultiToObject = <T extends object, K extends keyof T>(
  data: T[],
  keys: K[],
): Array<Pick<T, K>> => {
  return data.map((item) => {
    const result = {} as Pick<T, K>;
    keys.forEach((key) => {
      result[key] = item[key];
    });
    return result;
  });
};

/**
 * Mapeia um array de objetos para um array de DataSet
 * @template T - Tipo do objeto de entrada (valores devem ser string ou number)
 * @template L - Chave do label
 * @template V - Chave do value
 * @param data - Array de objetos de entrada
 * @param labelKey - Chave que contém o label
 * @param valueKey - Chave que contém o value
 * @returns Array de objetos DataSet
 */
export const dataSetMapper = <T extends object, L extends keyof T, V extends keyof T>(
  data: T[],
  labelKey: L,
  valueKey: V,
): Array<DataSet> => {
  return data.map((item) => ({
    label: String(item[labelKey]),
    value: Number(item[valueKey]),
  }));
};

// ============ Exemplos de uso =============================================================================================================== //

interface User {
  id: number;
  name: string;
  age: number;
  email: string;
}

const users: User[] = [
  { id: 1, name: 'John', age: 30, email: 'john@example.com' },
  { id: 2, name: 'Jane', age: 25, email: 'jane@example.com' },
];

const names = dataMapper(users, 'name'); // Array<string>
const ages = dataMapper(users, 'age'); // Array<number>
const ids = dataMapper(users, 'id'); // Array<number>
// * console.log(names) >> ["John", "Jane"]
// * console.log(ages) >> [30, 25]
// * console.log(ids) >> [1, 2]

const userData = dataMapperMulti(users, ['name', 'age']); // Array<[string, number]>
// * console.log(userData) >> [["John", 30], ["Jane", 25]]

const userContact = dataMapperMulti(users, ['name', 'email', 'id']); // Array<[string, string, number]>
// * console.log(userContact) >> [["John", "john@example.com", 1], ["Jane", "jane@example.com", 2]]

const basicInfo = dataMapperMultiToObject(users, ['id', 'name']); // Pick<User, 'id' | 'name'>[] = { id: number; name: string }[]
// * console.log(basicInfo) >> [{"id": 1,"name": "John"}, {"id": 2,"name": "Jane"}]

const contactInfo = dataMapperMultiToObject(users, ['name', 'email']); // Pick<User, 'name' | 'email'>[] = { name: string; email: string }[]
// * console.log(userContact) >> [{"name": "John", "email": "john@example.com"}, {"name": "Jane", "email": "jane@example.com"}]

interface ChartData {
  category: string;
  quantity: number;
  revenue: number;
}

const chartData: ChartData[] = [
  { category: 'A', quantity: 10, revenue: 1000 },
  { category: 'B', quantity: 20, revenue: 2500 },
];

const byQuantity = dataSetMapper(chartData, 'category', 'quantity'); // DataSet[] = [{ label: 'A', value: 10 }, ...]
// * console.log(userContact) >>  [{"label": "A", "value": 10}, {"label": "B", "value": 20}]

const byRevenue = dataSetMapper(chartData, 'category', 'revenue'); // DataSet[] = [{ label: 'A', value: 1000 }, ...]
// * console.log(userContact) >> [{"label": "A", "value": 1000}, {"label": "B", "value": 2500}]
