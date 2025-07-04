"use server";
import * as Sentry from "@sentry/nextjs";

const createTicket = async (
  prevState: { success: boolean; message: string },
  formData: FormData
): Promise<{ success: boolean; message: string }> => {
  try {
    const subject = formData.get("subject") as string;
    const description = formData.get("description") as string;
    const priority = formData.get("priority") as string;

    if (!subject || !description || !priority) {
      Sentry.captureMessage(
        "Validation Failed: All fields are required",
        "warning"
      );
      return { success: false, message: "All fields are required" };
    }
    console.log(subject, description, priority);
    return { success: true, message: "Ticket created successfully" };
  } catch (error) {
    Sentry.captureException(error as Error, {
      extra: { formData: Object.fromEntries(formData) },
    });
    return {
      success: false,
      message: "An error occured while creating the ticket",
    };
  }
};

export default createTicket;
