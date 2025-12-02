import mongoose, { ClientSession } from "mongoose";

export const runWithSession = async <T>(
  fn: (session: ClientSession) => Promise<T>
) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const values = await fn(session);
    await session.commitTransaction();
    return values;
  } catch (e) {
    await session.abortTransaction();
    throw e;
  } finally {
    session.endSession();
  }
};
