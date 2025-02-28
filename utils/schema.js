import { pgTable, serial, text, varchar} from "drizzle-orm/pg-core";

export const MockInterview = pgTable('mockInterview',{
    id : serial('id').primaryKey(),
    jsonMockRep : text('jsonMockRep').notNull(),
    jobPosition : varchar('jobPosition').notNull(),
    jobDes : varchar('jobDes').notNull(),
    jobExperience : varchar('jobExperience').notNull(),
    createdBy : varchar('createdAt').notNull(),
    createdAt : varchar('createdAt'),
    mockId : varchar('mockId').notNull()
} )