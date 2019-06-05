import { User } from "./user";
import { ReimbursementStatus } from "./reimbursementstatus";
import { ReimbursementType } from "./reimbursementtype";

export class Reimbursement{
    reimbursementId: number // primary key
    author: any // foreign key -> User, not null
    amount: number  // not null
    dateSubmitted: number // not null
    dateResolved: number // not null
    description: string // not null
    resolver: any // foreign key -> User
    status: ReimbursementStatus // foreign ey -> ReimbursementStatus, not null
    type: ReimbursementType // foreign key -> ReimbursementType
    constructor (reimbursementId:number, author:any, amount:number, dateSubmitted:number, dateResolved:number, description:string, resolver:any, status:ReimbursementStatus, type:ReimbursementType){
      this.reimbursementId = reimbursementId
      this.author = author
      this.amount = amount
      this.dateSubmitted = dateSubmitted
      this.dateResolved = dateResolved
      this.description = description
      this.resolver = resolver
      this.status = status
      this.type = type
    }
  }