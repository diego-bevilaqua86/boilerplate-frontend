export type APIMapping<U extends string> = {
  apiLabel: U;
  screenLabel: string;
};

export type APIMappingEnum<U extends string> = {
  [K in U]: APIMapping<U>
}

export type APIMappingArray<U extends string> = Array<APIMappingEnum<U>[keyof APIMappingEnum<U>]>;
