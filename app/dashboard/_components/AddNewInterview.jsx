"use client";
import React from "react";
import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { chatSession } from "@/utils/GeminiAiModel";
import { LoaderCircle } from "lucide-react";

import { v4 as uuidv4 } from "uuid";
import { useUser } from "@clerk/nextjs";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import moment from "moment";
import { useRouter } from "next/navigation";

function AddNewInterview() {
  const [openDialog, setOpenDialog] = useState(false);
  const [jobPosition, setJobPosition] = useState();
  const [jobDesc, setJobDesc] = useState();
  const [jobExperience, setJobExperience] = useState();
  const [loading, setLoading] = useState(false);
  const [jsonResponce, setJsonResponce] = useState([]);

  const router = useRouter();
  const { user } = useUser();

  const onSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    console.log(jobPosition, jobDesc, jobExperience);

    const InputPrompt =
      "Job Position : " +
      jobPosition +
      ", " +
      "Job Description : " +
      jobDesc +
      ", " +
      "Year of Exprerience: " +
      jobExperience +
      ", " +
      "Depend on this information please give me " +
      process.env.NEXT_PUBLIC_INTERVIEW_QUESTOINS_COUNT +
      " interview question with answer in json format, " +
      "give question and answer in field as JSON format";

    const result = await chatSession.sendMessage(InputPrompt);
    const MockJsonResponce = result.response
      .text()
      .replace("```json", "")
      .replace("```", "");
    console.log(JSON.parse(MockJsonResponce));
    setJsonResponce(MockJsonResponce);

    if (MockJsonResponce) {
      const response = await db
        .insert(MockInterview)
        .values({
          mockId: uuidv4(),
          jsonMockRep: MockJsonResponce,
          jobPosition: jobPosition,
          jobDes: jobDesc,
          jobExperience: jobExperience,
          createdBy: user?.primaryEmailAddress?.emailAddress,
          createdAt: moment().format(),
        })
        .returning({ mockId: MockInterview.mockId });

      console.log("response id", response);

      if (response) {
        console.log("Interview added successfully");
        setOpenDialog(false);
        router.push("/dashboard/interview/" + response[0]?.mockId);
      }
    } else {
      console.log("Error in AI response");
    }
    setLoading(false);
  };

  return (
    <div>
      <div
        className="p-10 border rounded-lg bg-secondary hover:scale-105 hover:shadow-md 
                    transform cursor-pointer transition-all w-96"
        onClick={() => setOpenDialog(true)}
      >
        <h2 className="font-bold text-lg text-center"> + Add Interview </h2>
      </div>
      <Dialog open={openDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">
              Tell us more about your job interviwing
            </DialogTitle>
            <DialogDescription>
              <form onSubmit={onSubmit}>
                <div>
                  <h2>
                    {" "}
                    Please, add details about your job position/role, job
                    description, year of experience{" "}
                  </h2>

                  <div className="mt-7 my-3">
                    <label className="ml-2"> Job Position/Job Role </label>
                    <Input
                      placeholder="Ex. Software Engineer"
                      required
                      onChange={(e) => setJobPosition(e.target.value)}
                    ></Input>
                  </div>

                  <div className="my-3">
                    <label className="ml-2">
                      {" "}
                      Job Description / Tech Stack (In short)
                    </label>
                    <Textarea
                      placeholder="Ex. Nextjs, JavaScript, Drizzle-ORM, Clerk"
                      required
                      onChange={(e) => setJobDesc(e.target.value)}
                    ></Textarea>
                  </div>

                  <div className="my-3">
                    <label className="ml-2"> Years of experience</label>
                    <Input
                      placeholder="Ex. 2"
                      type="number"
                      required
                      onChange={(e) => setJobExperience(e.target.value)}
                    ></Input>
                  </div>
                </div>
                <div className="flex justify-end gap-5">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => setOpenDialog(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={loading}>
                    {loading ? (
                      <>
                        <LoaderCircle className="animate-spin" /> Generating
                        From AI
                      </>
                    ) : (
                      "Start Interview"
                    )}
                  </Button>
                </div>
              </form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddNewInterview;
