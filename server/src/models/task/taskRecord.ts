import mongoose from "mongoose";
import { TaskHistorySchema, TaskRecordFields } from "@shared/types";
import { formatDate } from "@shared/utils";
import { taskRecordAllowedFields } from "@shared/constants";
import { TASK_RECORD_LIMITS } from "@shared/limits";

const { note } = TASK_RECORD_LIMITS;

const updatedFields = new mongoose.Schema<TaskRecordFields>({ 
  field: { type: String ,required: true, enum: taskRecordAllowedFields}, 
  oldValue: { type: mongoose.Schema.Types.Mixed, required: false, default: null }, 
  newValue: {type: mongoose.Schema.Types.Mixed, required: true }
}, { _id: false });

const taskRecordSchema = new mongoose.Schema<TaskHistorySchema>({
   updatedFields: {
    type: [updatedFields]
   },
   taskId: {
    type: mongoose.Types.ObjectId,
    ref: 'Task',
    required: true
   },
   note: {
    type: String,
    maxlength: [note.max, note.code],
    default: 'Update'
   }
}, { timestamps: true, _id: true })

taskRecordSchema.pre('save', function () {
  if(!this.isModified('note') || !this.note || this.note.length === 0){
    this.note = formatDate(new Date());
  }
})


export const TaskRecord = mongoose.model('TaskRecord', taskRecordSchema);