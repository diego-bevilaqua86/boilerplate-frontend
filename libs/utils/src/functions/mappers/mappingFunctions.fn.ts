import { DataSet } from '@boilerplate-frontend/types';

export const dataMapper = (data: Array<any>, key: string): Array<any> => {
  return data.map((item) => item[key]);
};

// * Uso
// const dataArray = [{ name: 'John', age: 30 }, { name: 'Jane', age: 25 }];
// const names = dataMapper(dataArray, 'name');
// const ages = dataMapper(dataArray, 'age');
// * console.log('names', names, 'ages', ages);
// -> 'names',  ["John", "Jane"],  'ages',  [30, 25]

export const dataMapperMulti = (data: Array<any>, keys: string[]): Array<any[]> => {
  return data.map((item) => keys.map((key) => item[key]));
};

// * Uso dataMapperMulti
// const multiResult = dataMapperMulti(data, ['name', 'age']);
// * console.log(multiResult);
// -> [["John", 30], ["Jane", 25]]

export const dataMapperMultiToObject = (data: Array<any>, keys: string[]): Array<Record<string, any>> => {
  return data.map((item) => {
    const result: Record<string, any> = {};
    keys.forEach((key) => {
      result[key] = item[key];
    });
    return result;
  });
};

// * Uso dataMapperMultiToObject
// const multiToObjResult = dataMapperMultiToObject(data, ['name', 'age']);
// * console.log(dataMapperMultiToObject(data, ['name', 'age']));
// -> [{ name: "John", age: 30 }, { name: "Jane", age: 25 }]

export const dataSetMapper = <T extends Record<string, string | number>, L extends keyof T, V extends keyof T>(
  data: Array<T>,
  labelKey: L,
  valueKey: V,
): Array<DataSet> => {
  return data.map((item) => ({
    label: String(item[labelKey]),
    value: Number(item[valueKey]),
  }));
};
