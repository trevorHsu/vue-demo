import Observer from './Observer'


type OBJECT_DATA_TYPE = {
  __ob__?: Observer,
  [propName:string]: any
}

type ARRAY_DATA_TYPE = unknown[] & OBJECT_DATA_TYPE

type DATA_TYPE = OBJECT_DATA_TYPE|ARRAY_DATA_TYPE

type PATH_VAL_GETTER_TYPE = (target: object) => unknown

export {
  OBJECT_DATA_TYPE, ARRAY_DATA_TYPE, DATA_TYPE, PATH_VAL_GETTER_TYPE
}
