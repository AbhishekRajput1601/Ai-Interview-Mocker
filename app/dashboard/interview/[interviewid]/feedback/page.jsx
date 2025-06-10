"use client";
import { db } from "@/utils/db";
import { UserAnswer } from "@/utils/schema";
import { eq } from "drizzle-orm";
import React, { useEffect, use, useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Loader from "@/components/ui/Loader";

function Feedback({ params }) {
  const unwrappedParams = use(params);
  const router = useRouter();
  const [feebackList, setFeedbackList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    GetFeedback();
  }, []);

  const GetFeedback = async () => {
    setLoading(true);
    const result = await db
      .select()
      .from(UserAnswer)
      .where(eq(UserAnswer.mockIdRef, unwrappedParams.interviewid))
      .orderBy(UserAnswer.id);

    setFeedbackList(result);
    setLoading(false);
  };

  if (loading) return <Loader />;

  return (
    <div className="p-10 ">
      {feebackList?.length == 0 ? (
        <h2 className="text-red-500 text-2xl font-bold">
          {" "}
          No feedback available{" "}
        </h2>
      ) : (
        <>
          <h2 className="font-bold text-3xl text-green-500">
            {" "}
            Congratulation!
          </h2>
          <h2 className="font-bold text-2xl my-1">
            {" "}
            Here is your interview feedback{" "}
          </h2>

          <h2 className="text-sm text-gray-500 font-bold">
            {" "}
            Find below your answer with question, and correct answer with
            feedback for improvement.{" "}
          </h2>

          {feebackList &&
            feebackList.map((item, index) => (
              <Collapsible key={index} className="mt-5">
                <CollapsibleTrigger className="p-3 bg-secondary rounded-lg flex justify-between my-2 text-left gap-7 w-full">
                  {item.question} <ChevronsUpDown className="h-5 w-5" />
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="flex flex-col gap-2">
                    <h2 className="text-red-500 p-2 border rounded-lg">
                      <strong> Rating :</strong> {item.rating}
                    </h2>
                    <h2 className="p-2 border rounded-lg bg-red-50 text-sm text-red-900">
                      <strong>Your Answer : </strong> {item.userAns}
                    </h2>
                    <h2 className="p-2 border rounded-lg bg-green-50 text-sm text-green-900">
                      <strong>Correct Answer : </strong> {item.correctAns}
                    </h2>
                    <h2 className="p-2 border rounded-lg bg-blue-50 text-sm text-blue-900">
                      <strong>Feedback : </strong> {item.feedback}
                    </h2>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            ))}
        </>
      )}

      <Button className="my-2" onClick={() => router.replace("/dashboard")}>
        {" "}
        Go Home{" "}
      </Button>
    </div>
  );
}

export default Feedback;
