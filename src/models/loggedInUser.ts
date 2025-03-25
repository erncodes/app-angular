import { User } from "./user";

export class LoggedInUser
{
constructor(
      public user : User,
      private _token : string,public expiresIn : Date,
      ){}
      get token(){
            if(this.expiresIn){
                  if(this.expiresIn < new Date()){
                        return null;
                  }
                  return this._token;
            }
            return this._token;
      }
}