
interface ISchema {

  readonly type : string;

  readonly query : string;

  readonly mutation : string;

  readonly resolver : object;

}


export default ISchema;
