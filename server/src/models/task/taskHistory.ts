import mongoose from "mongoose";
import { TaskHistorySchema, UpdatedFieldsSchema } from "@shared/types";
import { NOTE_LIMIT, taskHistoryAllowedFields } from "@shared/constants";
import { formatDate } from "@shared/utils";

const updatedFields = new mongoose.Schema<UpdatedFieldsSchema>({ // [old, new] values. if !changes, [old, old]
  field: { type: String ,required: true, enum: taskHistoryAllowedFields}, 
  oldValue: { type: mongoose.Schema.Types.Mixed, required: false, default: null }, 
  newValue: {type: mongoose.Schema.Types.Mixed, required: true }
}, { _id: false });

const taskHistorySchema = new mongoose.Schema<TaskHistorySchema>({
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
    maxlength: [NOTE_LIMIT.LENGTH, NOTE_LIMIT.MESSAGE],
    default: 'Update'
   }
}, { timestamps: true, _id: true })

taskHistorySchema.pre('save', function () {
  if(!this.isModified('note') || !this.note || this.note.length === 0){
    this.note = formatDate(new Date());
  }
})


export const TaskHistory = mongoose.model('TaskHistory', taskHistorySchema);