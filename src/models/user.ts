export class User
{
constructor(
      public fullName : string = 'Unknown User', 
      public roles : string[] = ['No Roles Found'], public email : string, public gender : string = 'Unspecified',
      public id? : string | undefined,private _token? : string | undefined,private expiresIn? : Date,
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