import { Person } from "./Person";
import { Sign } from "./Sign";
import { Type } from "./Type";

export interface Debt
{
    Id:string;
    name:string;
    type:Type;
    value:string|number;
    sign:Sign;
    person:Person;
}