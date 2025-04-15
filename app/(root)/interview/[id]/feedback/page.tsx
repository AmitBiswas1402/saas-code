import Link from "next/link";
import { redirect } from "next/navigation";
import { getInterviewById } from "@/lib/actions/general.action";
import { Button } from "@/components/ui/button";

const Feedback = async ({ params }: RouteParams) => {
  const { id } = await params;

  const interview = await getInterviewById(id);
  if (!interview) redirect("/");

  return (
    <section className="h-screen flex items-center justify-center overflow-hidden">
      <div className="max-w-3xl w-full text-center shadow-2xl rounded-2xl p-10 space-y-6">
        <h1 className="text-4xl font-extrabold text-primary-500">
          🎉 Thank You for Completing the Interview!
        </h1>

        <p className="text-lg text-gray-700">
          You did an amazing job tackling the{" "}
          <span className="font-semibold capitalize">{interview.role}</span> interview.
          We hope the experience helped you grow and prepare even better for real-world challenges.
        </p>

        <p className="text-md font-medium text-blue-700">
          We encourage you to take more mock interviews to sharpen your skills and boost your confidence.
        </p>

        <p className="text-md text-gray-500 italic">
          Wishing you the very best of luck for your next interview – You have got this! 🚀
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
          <Button className="btn-secondary w-full sm:w-auto">
            <Link href="/" className="flex w-full justify-center">
              <p className="text-sm font-semibold text-primary-200">Back to Dashboard</p>
            </Link>
          </Button>

          <Button className="btn-primary w-full sm:w-auto">
            <Link href={`/interview/${id}`} className="flex w-full justify-center">
              <p className="text-sm font-semibold text-black">Retake Interview</p>
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Feedback;
