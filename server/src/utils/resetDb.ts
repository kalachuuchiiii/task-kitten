import mongoose from "mongoose";

export const resetDb = async () => {
  const modelsToDelete = ["Event", "Task", "TaskRecord"];
  const modelsDeleted = await Promise.all(
    modelsToDelete.map((modelName) => {
      const Model = mongoose.model(modelName);
      return Model.deleteMany();
    })
  );
  console.log(modelsDeleted);
};
