import { pgTable, serial, text, varchar} from "drizzle-orm/pg-core";

export const MockInterview = pgTable('mockInterview',{
    id : serial('id').primaryKey(),
    jsonMockRep : text('jsonMockRep').notNull(),
    jobPosition : varchar('jobPosition').notNull(),
    jobDes : varchar('jobDes').notNull(),
    jobExperience : varchar('jobExperience').notNull(),
    createdBy : varchar('createdBy').notNull(),
    createdAt : varchar('createdAt'),
    mockId : varchar('mockId').notNull()
} );

export const UserAnswer = pgTable('userAnswer',{
   id : serial('id').primaryKey(),
   mockIdRef : varchar('mockId').notNull(),
   question : varchar('question').notNull(),
   correctAns : varchar('correctAns'),
   userAns : text('userAns'),
   feedback : text('feedback'),
   rating : varchar('rating'),
   userEmail : varchar('userEmail'),
   createdAt : varchar('createdAt'),
});

export const schema = {
    MockInterview,
    UserAnswer
};