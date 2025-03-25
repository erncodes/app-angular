export class User
{
constructor(
      public fullName : string = 'Unknown User', 
      public roles : string[] = ['No Roles Found'], public email : string, public gender : string = 'Unspecified',
      public id? : string | undefined
      ){}
}